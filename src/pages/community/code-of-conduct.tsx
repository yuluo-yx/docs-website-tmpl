import React from 'react'
import Layout from '@theme/Layout'
import styles from './code-of-conduct.module.css'

export default function CodeOfConduct(): React.JSX.Element {
  return (
    <Layout
      title="行为准则"
      description="我们社区的行为准则和价值观">
      <div className={styles.codePage}>
        <div className="container">
          <div className={styles.codeHeader}>
            <h1 className={styles.codeTitle}>📜 贡献者行为准则</h1>
            <p className={styles.codeDescription}>
              我们致力于为每个人提供友善、安全和欢迎的环境，
              无论性别、性取向、残疾、民族、宗教或其他个人特征。
            </p>
          </div>

          <div className={styles.codeContent}>
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>🎯 我们的承诺</h2>
              <div className={styles.sectionContent}>
                <p>
                  为了营造开放、欢迎的环境，我们作为贡献者和维护者承诺：
                  让参与我们项目和社区的每个人都不受骚扰，无论年龄、体型、
                  残疾、民族、性别特征、性别认同、经验水平、教育程度、
                  社会经济地位、国籍、个人形象、种族、宗教或性取向如何。
                </p>
              </div>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>✅ 我们的标准</h2>
              <div className={styles.standards}>
                <div className={styles.standardsColumn}>
                  <h3 className={styles.standardsTitle}>积极行为包括：</h3>
                  <ul className={styles.standardsList}>
                    <li>使用欢迎和包容性语言</li>
                    <li>尊重不同的观点和经历</li>
                    <li>优雅地接受建设性批评</li>
                    <li>专注于对社区最有利的事情</li>
                    <li>对其他社区成员表示同理心</li>
                  </ul>
                </div>
                <div className={styles.standardsColumn}>
                  <h3 className={styles.standardsTitle}>不可接受的行为包括：</h3>
                  <ul className={styles.standardsList}>
                    <li>使用色情化语言或图像</li>
                    <li>恶意评论、侮辱或人身攻击</li>
                    <li>公开或私下骚扰</li>
                    <li>发布他人隐私信息</li>
                    <li>其他不合适的专业行为</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>🛡️ 执行责任</h2>
              <div className={styles.sectionContent}>
                <p>
                  项目维护者有责任澄清可接受行为的标准，并采取适当和公平的
                  纠正措施来回应任何不可接受的行为。项目维护者有权删除、编辑
                  或拒绝与此行为准则不符的评论、提交、代码、wiki编辑、问题
                  和其他贡献。
                </p>
              </div>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>📞 报告</h2>
              <div className={styles.reportingCard}>
                <div className={styles.reportingContent}>
                  <h3>如何报告不当行为</h3>
                  <p>
                    如果遇到或目睹了不当行为，请联系项目团队：
                  </p>
                  <div className={styles.contactMethods}>
                    <a href="mailto:conduct@your-project.com" className={styles.contactMethod}>
                      📧 conduct@your-project.com
                    </a>
                    <a href="https://github.com/your-username/your-project-name/issues" className={styles.contactMethod}>
                      🐛 GitHub Issues
                    </a>
                  </div>
                  <p className={styles.reportingNote}>
                    所有投诉都将被审查和调查，并将产生被认为必要和
                    适合情况的回应。项目团队有义务为事件报告者保密。
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>⚖️ 执行</h2>
              <div className={styles.sectionContent}>
                <p>
                  不遵循或执行行为准则的项目维护者可能面临项目领导层
                  其他成员确定的临时或永久后果。
                </p>
              </div>
            </div>

            <div className={styles.attribution}>
              <p>
                此行为准则改编自{' '}
                <a href="https://www.contributor-covenant.org">贡献者公约</a>，
                版本 2.0，可在{' '}
                <a href="https://www.contributor-covenant.org/version/2/0/code_of_conduct.html">
                  https://www.contributor-covenant.org/version/2/0/code_of_conduct.html
                </a>{' '}
                获取。
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
