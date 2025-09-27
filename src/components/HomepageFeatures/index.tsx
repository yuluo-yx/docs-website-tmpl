import React from 'react'
import clsx from 'clsx'
import styles from './styles.module.css'

interface FeatureItem {
  title: string
  icon: string
  description: React.JSX.Element
}

const FeatureList: FeatureItem[] = [
  {
    title: '📚 丰富文档',
    icon: '📖',
    description: (
      <>
        包含示例、教程和 API 参考的全面文档。
        您需要的一切，从入门到精通您的项目。
      </>
    ),
  },
  {
    title: '🎨 精美主题',
    icon: '🌓',
    description: (
      <>
        支持双主题，优雅的纸张米白色亮色主题和绚丽的
        星空黑色暗色主题。在主题间无缝切换。
      </>
    ),
  },
  {
    title: '⚡ 快速现代',
    icon: '🚀',
    description: (
      <>
        使用现代技术构建，实现闪电般的快速性能。
        响应式设计，在所有设备上都能完美工作。
      </>
    ),
  },
  {
    title: '🔧 易于定制',
    icon: '⚙️',
    description: (
      <>
        高度可定制的组件和主题。易于修改颜色、
        字体、布局，并添加您自己的品牌元素。
      </>
    ),
  },
  {
    title: '📱 移动优先',
    icon: '📱',
    description: (
      <>
        响应式设计，在手机、平板和桌面设备上都很美观。
        触摸友好的导航和交互体验。
      </>
    ),
  },
  {
    title: '🔍 搜索功能',
    icon: '🔎',
    description: (
      <>
        内置搜索功能，帮助用户快速找到内容。
        智能搜索，具有自动完成和建议功能。
      </>
    ),
  },
]

interface FeatureProps {
  icon: string
  title: string
  description: React.JSX.Element
}

function Feature({ icon, title, description }: FeatureProps): React.JSX.Element {
  return (
    <div className={clsx('col col--4', styles.feature)}>
      <div className={styles.featureCard}>
        <div className={styles.featureIcon}>
          <span className={styles.iconEmoji}>{icon}</span>
        </div>
        <div className={styles.featureContent}>
          <h3 className={styles.featureTitle}>{title}</h3>
          <p className={styles.featureDescription}>{description}</p>
        </div>
      </div>
    </div>
  )
}

export default function HomepageFeatures(): React.JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.featuresHeader}>
          <h2 className={styles.featuresTitle}>✨ 强大功能</h2>
          <p className={styles.featuresSubtitle}>
            创建精美文档网站所需的一切功能
          </p>
        </div>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  )
}
