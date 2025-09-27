import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import Fuse from 'fuse.js';
import styles from './styles.module.css';

interface SearchResult {
  id: string;
  title: string;
  content: string;
  url: string;
  type: 'doc' | 'blog' | 'page';
  score: number;
  highlights?: string[];
}

interface BuiltinDocument {
  id: string;
  title: string;
  content: string;
  url: string;
  type: 'doc' | 'blog' | 'page';
}

const SimpleSearch: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fuseRef = useRef<Fuse<BuiltinDocument> | null>(null);

  // 从 Docusaurus 搜索索引获取文档
  const getSearchableDocuments = (): BuiltinDocument[] => {
    // 在实际应用中，这些数据应该来自 Docusaurus 的搜索索引
    return [
      {
        id: 'intro',
        title: '快速开始',
        content: '了解如何快速开始使用项目',
        url: '/docs/intro',
        type: 'doc'
      },
      {
        id: 'installation',
        title: '安装指南',
        content: '详细的安装步骤和配置说明',
        url: '/docs/getting-started/installation',
        type: 'doc'
      },
      {
        id: 'configuration',
        title: '配置指南',
        content: '如何配置项目以满足您的需求',
        url: '/docs/getting-started/configuration',
        type: 'doc'
      },
      {
        id: 'welcome-blog',
        title: '欢迎使用项目',
        content: '项目介绍和功能特性',
        url: '/blog/2025-01-01-welcome',
        type: 'blog'
      }
    ];
  };

  // 初始化 Fuse 搜索引擎
  useEffect(() => {
    const documents = getSearchableDocuments();
    fuseRef.current = new Fuse(documents, {
      keys: ['title', 'content'],
      includeScore: true,
      includeMatches: true,
      threshold: 0.3,
    });
  }, []);

  // 执行本地搜索
  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim() || !fuseRef.current) {
      setResults([]);
      return;
    }

    const searchResults = fuseRef.current.search(searchQuery);
    const formattedResults = searchResults.slice(0, 8).map((result) => ({
      id: result.item.id,
      title: result.item.title,
      content: result.item.content,
      url: result.item.url,
      type: result.item.type,
      score: 1 - (result.score || 0),
      highlights: result.matches?.map(match => match.value || '') || []
    }));

    setResults(formattedResults);
    setSelectedIndex(-1);
  };

  // 防抖搜索
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch(query);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  // 键盘事件处理
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === '/') {
        event.preventDefault();
        setIsOpen(true);
        inputRef.current?.focus();
      } else if (event.key === 'Escape') {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleInputKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (event.key === 'Enter' && selectedIndex >= 0) {
      event.preventDefault();
      handleResultSelect(results[selectedIndex]);
    }
  };

  const handleResultSelect = (result: SearchResult) => {
    if (typeof window !== 'undefined') {
      window.location.href = result.url;
    }
    setIsOpen(false);
    setQuery('');
  };

  const getTypeIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'doc':
        return '📄';
      case 'blog':
        return '📝';
      case 'page':
        return '🏠';
      default:
        return '📄';
    }
  };

  const getTypeLabel = (type: SearchResult['type']) => {
    switch (type) {
      case 'doc':
        return '文档';
      case 'blog':
        return '博客';
      case 'page':
        return '页面';
      default:
        return '文档';
    }
  };

  return (
    <div className={styles.searchContainer} ref={searchRef}>
      <button
        className={clsx(styles.searchButton, { [styles.searchButtonActive]: isOpen })}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="本地搜索"
        type="button"
      >
        🔍 <span className={styles.searchButtonText}>搜索</span>
        <kbd className={styles.searchShortcut}>/</kbd>
      </button>

      {isOpen && (
        <div className={styles.searchModal}>
          <div className={styles.searchHeader}>
            <div className={styles.searchInputContainer}>
              <input
                ref={inputRef}
                type="text"
                placeholder="搜索文档和博客..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleInputKeyDown}
                className={styles.searchInput}
                autoFocus
              />
            </div>
          </div>

          <div className={styles.searchResults}>
            {results.length > 0 ? (
              <>
                <div className={styles.resultsHeader}>
                  找到 {results.length} 个结果
                </div>
                {results.map((result, index) => (
                  <div
                    key={result.id}
                    className={clsx(styles.searchResult, {
                      [styles.searchResultSelected]: index === selectedIndex,
                    })}
                    onClick={() => handleResultSelect(result)}
                  >
                    <div className={styles.resultHeader}>
                      <span className={styles.resultIcon}>{getTypeIcon(result.type)}</span>
                      <h4 className={styles.resultTitle}>{result.title}</h4>
                      <span className={styles.resultType}>{getTypeLabel(result.type)}</span>
                      <span className={styles.resultScore}>
                        {Math.round(result.score * 100)}% 匹配
                      </span>
                    </div>
                    <p className={styles.resultContent}>{result.content}</p>
                  </div>
                ))}
              </>
            ) : query.trim() ? (
              <div className={styles.noResults}>
                <div className={styles.noResultsIcon}>🔍</div>
                <p>没有找到相关结果</p>
                <p className={styles.noResultsHint}>
                  尝试使用不同的关键词
                </p>
              </div>
            ) : (
              <div className={styles.searchTips}>
                <h4>搜索提示</h4>
                <ul>
                  <li>输入关键词搜索文档和博客</li>
                  <li>使用 <kbd>/</kbd> 快捷键快速打开搜索</li>
                  <li>使用方向键选择结果</li>
                  <li>按 <kbd>Enter</kbd> 打开选中的结果</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SimpleSearch;