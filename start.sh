#!/bin/bash

# 文档网站模版快速启动脚本
# Quick start script for documentation website template

echo "🎨 文档网站模版 - 快速启动"
echo "Documentation Website Template - Quick Start"
echo "=========================================="

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装。请先安装 Node.js 18 或更高版本。"
    echo "❌ Node.js not found. Please install Node.js 18 or higher."
    exit 1
fi

# 检查版本
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js 版本过低，需要 18 或更高版本"
    echo "❌ Node.js version too old, requires version 18 or higher"
    exit 1
fi

echo "✅ Node.js 版本: $(node -v)"
echo "✅ Node.js version: $(node -v)"

# 安装依赖
echo ""
echo "📦 安装依赖..."
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ 依赖安装失败"
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "✅ 依赖安装完成！"
echo "✅ Dependencies installed successfully!"

# 启动开发服务器
echo ""
echo "🚀 启动开发服务器..."
echo "🚀 Starting development server..."
echo ""
echo "📖 文档将在 http://localhost:3000 打开"
echo "📖 Documentation will open at http://localhost:3000"
echo ""
echo "💡 使用 Ctrl+C 停止服务器"
echo "💡 Use Ctrl+C to stop the server"
echo ""

npm start
