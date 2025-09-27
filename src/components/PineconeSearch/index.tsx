import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import projectConfig, { getSearchConfig } from '../../../project.config';
import styles from './styles.module.css';

interface SearchResult {
  id: string;
  title: string;
  content: string;
  url: string;
  score: number;
  type: 'pinecone' | 'local';
}

interface PineconeMatch {
  id: string;
  score: number;
  metadata?: {
    title?: string;
    content?: string;
    url?: string;
  };
}

const PineconeSearch: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const searchConfig = getSearchConfig(projectConfig);
  const isPineconeConfigured = searchConfig.isVectorSearchConfigured;

  // 搜索 Pinecone
  const searchPinecone = async (searchQuery: string): Promise<SearchResult[]> => {
    if (!isPineconeConfigured || !searchConfig.pinecone) {
      console.warn('Pinecone not configured');
      return [];
    }

    const { apiKey, environment, indexName } = searchConfig.pinecone;

    try {
      // 注意：实际使用时需要将查询文本转换为向量
      // 这里只是 API 调用的结构示例
      const response = await fetch(`https://${indexName}-${environment}.svc.pinecone.io/query`, {
        method: 'POST',
        headers: {
          'Api-Key': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          vector: [], // 实际需要查询向量
          topK: 10,
          includeMetadata: true,
        }),
      });

      if (!response.ok) {
        throw new Error(`Pinecone API error: ${response.status}`);
      }

      const data = await response.json();
      const matches: PineconeMatch[] = data.matches || [];

      return matches.map((match, index) => ({
        id: match.id || `pinecone-${index}`,
        title: match.metadata?.title || 'Pinecone 搜索结果',
        content: match.metadata?.content || '基于语义相似性的搜索结果',
        url: match.metadata?.url || '#',
        score: match.score || 0,
        type: 'pinecone' as const,
      }));
    } catch (error) {
      console.error('Pinecone search error:', error);
      return [];
    }
  };

  // 执行搜索
  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const pineconeResults = await searchPinecone(searchQuery);
      setResults(pineconeResults);
      setSelectedIndex(-1);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
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

  if (!isPineconeConfigured) {
    return (
      <div className={styles.searchContainer}>
        <button
          className={styles.searchButtonDisabled}
          disabled
          title="Pinecone 搜索未配置"
        >
          🔍 <span>搜索未配置</span>
        </button>
      </div>
    );
  }

  return (
    <div className={styles.searchContainer} ref={searchRef}>
      <button
        className={clsx(styles.searchButton, { [styles.searchButtonActive]: isOpen })}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Pinecone 语义搜索"
        type="button"
      >
        🤖 <span className={styles.searchButtonText}>智能搜索</span>
        <kbd className={styles.searchShortcut}>/</kbd>
      </button>

      {isOpen && (
        <div className={styles.searchModal}>
          <div className={styles.searchHeader}>
            <div className={styles.searchInputContainer}>
              <input
                ref={inputRef}
                type="text"
                placeholder="使用 AI 语义搜索文档..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleInputKeyDown}
                className={styles.searchInput}
                autoFocus
              />
              {loading && <div className={styles.searchSpinner}>🔄</div>}
            </div>
            <div className={styles.searchInfo}>
              <span>基于 Pinecone 的智能语义搜索</span>
            </div>
          </div>

          <div className={styles.searchResults}>
            {results.length > 0 ? (
              <>
                <div className={styles.resultsHeader}>
                  找到 {results.length} 个相关结果
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
                      <span className={styles.resultIcon}>🤖</span>
                      <h4 className={styles.resultTitle}>{result.title}</h4>
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
                  尝试使用不同的关键词或调整搜索内容
                </p>
              </div>
            ) : (
              <div className={styles.searchTips}>
                <h4>智能搜索提示</h4>
                <ul>
                  <li>输入关键词开始语义搜索</li>
                  <li>支持自然语言查询</li>
                  <li>AI 会理解您的意图并找到相关内容</li>
                  <li>使用 <kbd>/</kbd> 快捷键打开搜索</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PineconeSearch;