import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import MeteorShower from '@site/src/components/MeteorShower';
import FloatingClouds from '../components/FloatingClouds';

import styles from './index.module.css';
import projectConfig, { getGitHubUrls } from '../../project.config';

// Generate GitHub links from project configuration  
const githubUrls = getGitHubUrls(projectConfig);

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <FloatingClouds />
      <div className={clsx('container', styles.heroContainer)}>
        <div className={styles.heroContent}>
          <div className={styles.heroLeft}>
            <div className={styles.titleRow}>
              <img 
                src="/img/logo.svg" 
                alt={siteConfig.title}
                className={styles.heroLogo}
              />
              <h1 className={clsx('hero__title', styles.heroTitle)}>
                {siteConfig.title}
              </h1>
            </div>
            <p className={clsx('hero__subtitle', styles.heroSubtitle)}>
              {siteConfig.tagline}
            </p>
            
            <div className={styles.heroLabels}>
              <span className={styles.label}>React</span>
              <span className={styles.label}>Docs</span>
              <span className={styles.label}>AI</span>
              <span className={styles.label}>Docusaurus</span>
            </div>
            
            <div className={styles.heroButtons}>
              <Link
                className={clsx('button button--primary button--lg', styles.heroButton)}
                to="/docs/intro">
                📚 快速开始
              </Link>
              <Link
                className={clsx('button button--primary button--lg', styles.heroButton)}
                to={githubUrls.repo}>
                ⭐ 在 GitHub 查看
              </Link>
            </div>
          </div>
          <div className={styles.heroRight}>
            <div className={clsx(styles.codePreview, 'prism-code')}>
              <div className={styles.codeHeader}>
                <div className={styles.codeDots}>
                  <span className={styles.dot}></span>
                  <span className={styles.dot}></span>
                  <span className={styles.dot}></span>
                </div>
                <span className={styles.codeTitle}>快速开始.ts</span>
              </div>
              <div className={styles.codeContent}>
                <pre><code>
                  <span className={styles.codeKeyword}>git</span> <span className={styles.codeMethod}>clone</span> <span className={styles.codeString}>{githubUrls.repo}.git</span>
                  {'\n\n'}
                  <span className={styles.codeKeyword}>npm</span> <span className={styles.codeMethod}>install</span>
                  {'\n\n'}
                  <span className={styles.codeKeyword}>npm</span> <span className={styles.codeMethod}>start</span>
                  {'\n\n'}
                  <span className={styles.codeKeyword}>npm</span> <span className={styles.codeMethod}>run</span> <span className={styles.codeClass}>build</span>
                  {'\n\n'}
                  <span className={styles.codeKeyword}>npm</span> <span className={styles.codeMethod}>run</span> <span className={styles.codeClass}>serve</span>
                </code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`欢迎使用 ${siteConfig.title}`}
      description="基于 Docusaurus 3 构建的双主题文档网站模板">
      <MeteorShower />
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}