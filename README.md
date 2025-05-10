# Hilton Reservation System

# 项目介绍

该项目重点在于通过工程化的方式，构建一个完整的前后端应用, 可满足中大型项目的发展要求。而针对具体的 UI 和业务逻辑，采用较简单的逻辑实现。

后端主要使用 node.js + Koa + GraphQL + MongoDB + codegen + jest

前端则使用 React + TypeScript + Tailwind CSS  + Vitest

## Docker Compose 快速启动

```bash
# init env
cp .env.example .env

# 开发环境
docker-compose up --build

# Or
# 生产环境
docker-compose -f docker-compose.yml up --build
```

默认提供了 2 个种子用户，用于登录，具体可见 backend/scripts/seeds
```text
john@example.com
111111

employee@example.com
111111
```

## 本地启动

### 后端
```bash
cd backend
npm install
cp .env.example .env  # 配置环境变量, 注意：依赖 mongodb，需要先启动mongodb

npm run migrate:up && npm run migrate:seed # init db and seeds
npm run dev
```

### 前端
``` bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

### 📝 API文档
GraphQL API文档访问地址： 

```text
http://localhost:4000/graphql
```

## 📂 项目结构
```text
hilton-reservation-system/
├── backend/                # 后端服务
│   ├── scripts/            #   脚本文件，init db，seeds
│   ├── src/                #   源代码目录
│   │   ├── __tests__/      #     单元测试
│   │   ├── config/         #     配置文件
│   │   ├── controllers/    #     控制器
│   │   ├── graphql/        #     GraphQL相关
│   │   ├── middlewares/    #     中间件
│   │   ├── models/         #     数据模型
│   │   ├── routes/         #     路由定义
│   │   ├── types/          #     TypeScript类型
│   │   └── utils/          #     工具函数
│   └── test/               #   测试配置
├── frontend/               # 前端应用
│   ├── public/             #   静态资源
│   ├── src/                #   源代码目录
│   │   ├── __tests__/      #     单元测试
│   │   ├── apps/           #     应用配置
│   │   ├── assets/         #     资源文件
│   │   ├── constants/      #     常量定义
│   │   ├── features/       #     业务功能
│   │   │   ├── reservation/ #       预约功能
│   │   │   │   ├── components/ #       组件
│   │   │   │   └── pages/      #       页面
│   │   ├── hooks/          #     自定义Hooks
│   │   ├── layouts/        #     布局组件
│   │   ├── routes/         #     路由配置
│   │   ├── services/       #     API服务
│   │   ├── styles/         #     样式文件
│   │   ├── test/           #     测试文件
│   │   └── types/          #     TypeScript类型
```

## 待优化项

### 后端
- **统一错误处理**: 设置统一的错误处理机制，并根据业务需求制定详细的错误码，以便于调试和维护。
- **项目结构优化**: 进一步优化项目结构，确保代码模块化和可维护性，考虑引入更多设计模式以提高代码质量。
- **性能优化**: 通过分析和优化数据库查询、缓存策略等方式提升系统性能。
- **日志管理**: 实现更完善的日志记录和管理，便于问题追踪和系统监控。

### 前端
- **组件优化**: 当前的组件内容有待商榷，建议对组件进行重构，提升复用性和可读性。
- **状态管理**: 引入更高效的状态管理方案，如SWR,Redux 等，以便于管理复杂的应用状态。
- **UI/UX改进**: 改善用户界面和用户体验，确保应用在不同设备上的一致性和响应性。
- **测试覆盖率**: 提高单元测试和集成测试的覆盖率，确保应用的稳定性和可靠性。
