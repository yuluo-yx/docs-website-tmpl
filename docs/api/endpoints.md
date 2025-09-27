# API 端点

所有可用 API 端点的完整参考。

## 基础 URL
```
https://api.example.com/v1
```

## 用户

### 获取用户资料
```http
GET /users/{id}
```

**参数:**
- `id` (string): 用户 ID

**响应:**
```json
{
  "id": "123",
  "name": "张三",
  "email": "zhangsan@example.com",
  "created_at": "2023-01-01T00:00:00Z"
}
```

### 更新用户资料
```http
PUT /users/{id}
```

**请求体:**
```json
{
  "name": "李四",
  "email": "lisi@example.com"
}
```

## 数据

### 列出项目
```http
GET /data
```

**查询参数:**
- `page` (integer): 页码 (默认: 1)
- `limit` (integer): 每页项目数 (默认: 20)
- `sort` (string): 排序字段
- `order` (string): 排序顺序 (asc/desc)

**响应:**
```json
{
  "data": [
    {
      "id": "1",
      "title": "示例项目",
      "created_at": "2023-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "total": 100,
    "pages": 5
  }
}
```

### 创建项目
```http
POST /data
```

**请求体:**
```json
{
  "title": "新项目",
  "content": "项目内容"
}
```

### 获取项目
```http
GET /data/{id}
```

### 更新项目
```http
PUT /data/{id}
```

### 删除项目
```http
DELETE /data/{id}
```

## 错误响应

所有错误响应遵循此格式：

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "错误描述",
    "details": {}
  }
}
```

### HTTP 状态码
- `200` - 成功
- `201` - 已创建
- `400` - 错误请求
- `401` - 未授权
- `403` - 禁止访问
- `404` - 未找到
- `429` - 请求过多
- `500` - 内部服务器错误
