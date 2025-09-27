import React from 'react'
import Layout from '@theme/Layout'
import styles from './contributing.module.css'

export default function Contributing(): React.JSX.Element {
  return (
    <Layout
      title="贡献指南"
      description="了解如何为项目做贡献">
      <div className={styles.contributingPage}>
        <div className="container">
          <div className={styles.contributingHeader}>
            <h1 className={styles.contributingTitle}>🤝 贡献指南</h1>
            <p className={styles.contributingDescription}>
              感谢考虑为我们的项目做贡献！每一个贡献都是有价值的，
              无论大小，我们都深表感谢。
            </p>
          </div>

          <div className={styles.contributingContent}>
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>🚀 快速开始</h2>
              <div className={styles.sectionContent}>
                <ol className={styles.stepsList}>
                  <li>Fork 项目仓库</li>
                  <li>创建功能分支 (<code>git checkout -b feature/AmazingFeature</code>)</li>
                  <li>提交更改 (<code>git commit -m 'Add some AmazingFeature'</code>)</li>
                  <li>推送到分支 (<code>git push origin feature/AmazingFeature</code>)</li>
                  <li>开启一个 Pull Request</li>
                </ol>
              </div>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>💡 贡献类型</h2>
              <div className={styles.contributionTypes}>
                <div className={styles.typeCard}>
                  <div className={styles.typeIcon}>🐛</div>
                  <h3>错误修复</h3>
                  <p>帮助修复项目中的错误和问题</p>
                </div>
                <div className={styles.typeCard}>
                  <div className={styles.typeIcon}>✨</div>
                  <h3>新功能</h3>
                  <p>添加新功能或改进现有功能</p>
                </div>
                <div className={styles.typeCard}>
                  <div className={styles.typeIcon}>📚</div>
                  <h3>文档</h3>
                  <p>改进文档、教程和示例</p>
                </div>
                <div className={styles.typeCard}>
                  <div className={styles.typeIcon}>🎨</div>
                  <h3>设计</h3>
                  <p>改进用户界面和用户体验</p>
                </div>
              </div>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>📋 开发设置</h2>
              <div className={styles.codeBlock}>
                <pre>
                  <code>
{`# 克隆仓库
git clone https://github.com/your-username/your-project-name.git

# 进入项目目录
cd your-project-name

# 安装依赖
npm install

# 启动开发服务器
npm start`}
                  </code>
                </pre>
              </div>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>📜 行为准则</h2>
              <div className={styles.sectionContent}>
                <p>
                  参与此项目即表示同意遵守我们的{' '}
                  <a href="/community/code-of-conduct">行为准则</a>。
                  请确保互动保持友善、尊重和包容。
                </p>
              </div>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>❓ 需要帮助？</h2>
              <div className={styles.helpLinks}>
                <a href="https://github.com/your-username/your-project-name/discussions" className={styles.helpLink}>
                  💬 GitHub 讨论
                </a>
                <a href="https://github.com/your-username/your-project-name/issues" className={styles.helpLink}>
                  🐛 报告问题
                </a>
                <a href="/community/team" className={styles.helpLink}>
                  👥 联系团队
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
