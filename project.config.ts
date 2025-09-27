export interface ProjectConfig {
  // Basic information
  title: string
  tagline: string
  description: string
  
  // Author information
  author: {
    name: string
    email: string
    website?: string
  }
  
  // GitHub repository information
  github: {
    username: string
    repoName: string
  }
  
  // Website deployment information
  deployment: {
    url: string
    baseUrl: string
  }
  
  // Social links
  social?: {
    twitter?: string
    discord?: string
    linkedin?: string
  }
  
  // Search configuration
  search: {
    // Enable vector search functionality
    enableVectorSearch: boolean
    // Pinecone configuration
    pinecone?: {
      apiKey: string
      environment: string
      indexName: string
    }
  }
}

const projectConfig: ProjectConfig = {
  // 🏷️ Basic information - modify here to update project information
  title: '项目名称',
  tagline: '这是一段描述项目的文本',
  description: '基于 Docusaurus 的双主题文档网站模板',
  
  // 👤 Author information - modify to your information
  author: {
    name: 'Your Name',
    email: 'your.email@example.com',
    website: 'https://your-website.com', // optional
  },
  
  // 📁 GitHub repository information - modify to your GitHub information
  github: {
    username: 'your-username',
    repoName: 'your-repo-name',
  },
  
  // 🌐 Website deployment information - modify to your deployment information
  deployment: {
    url: 'https://your-username.github.io',
    baseUrl: '/', // For GitHub Pages, usually '/your-repo-name/'
  },
  
  // 🔗 Social links - optional, add your social media links
  social: {
    twitter: 'https://twitter.com/your-username',
    // discord: 'https://discord.gg/your-server',
    // linkedin: 'https://linkedin.com/in/your-profile',
  },
  
  // 🔍 Search configuration
  search: {
    // Enable vector search functionality (requires Pinecone configuration)
    enableVectorSearch: false, // Set to true to enable vector search
    // Pinecone vector database configuration
    // pinecone: {
    //   apiKey: 'your-pinecone-api-key',
    //   environment: 'your-pinecone-environment',
    //   indexName: 'your-index-name',
    // },
  },
}

// Export configuration and helper functions
export default projectConfig

// Helper function: generate GitHub related links
export const getGitHubUrls = (config: ProjectConfig) => {
  const { username, repoName } = config.github
  const baseUrl = `https://github.com/${username}/${repoName}`
  
  return {
    repo: baseUrl,
    discussions: `${baseUrl}/discussions`,
    issues: `${baseUrl}/issues`,
    license: `${baseUrl}/blob/main/LICENSE`,
    contributing: `${baseUrl}/blob/main/CONTRIBUTING.md`,
    editDocs: `${baseUrl}/tree/main/docs/`,
    editBlog: `${baseUrl}/tree/main/blog/`,
  }
}

// Helper function: generate complete author information
export const getAuthorInfo = (config: ProjectConfig) => {
  const { name, email, website } = config.author
  return {
    name,
    email,
    full: website ? `${name} <${email}> (${website})` : `${name} <${email}>`,
  }
}

// Helper function: get search configuration
export const getSearchConfig = (config: ProjectConfig) => {
  const { search } = config
  const isVectorSearchEnabled = search.enableVectorSearch && 
    search.pinecone?.apiKey && 
    search.pinecone?.environment && 
    search.pinecone?.indexName
  
  return {
    enableVectorSearch: search.enableVectorSearch,
    isVectorSearchConfigured: isVectorSearchEnabled,
    pinecone: search.pinecone,
  }
}