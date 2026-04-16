# ClassicRide

[English](README.md) | 中文

## 简介

ClassicRide 是一个全栈 MERN Web 应用，作为**奥克兰大学 CS732（2026 年第一学期）技术教程作业**的配套演示代码库。本项目展示了如何结合两款 AI 驱动的开发工具——**Google Stitch**（用于 UI 设计生成）与 **Claude Code**（用于 AI 辅助全栈开发）——共同驱动一个现代 Web 应用从视觉设计到可运行代码的完整开发流程。

应用本身是一个豪华汽车展览平台，以策展式叙事方式呈现经典车型。核心功能包括全屏时间轴浏览体验、动态技术规格侧边栏，以及车辆总览功能。

> 本仓库建议配合视频演示一起查看。视频详细介绍了 AI 工具的使用工作流，代码库作为实践参考。

---

## 目录

- [ClassicRide](#classicride)
  - [简介](#简介)
  - [目录](#目录)
  - [技术栈](#技术栈)
  - [项目结构](#项目结构)
  - [环境要求](#环境要求)
  - [安装与运行步骤](#安装与运行步骤)
    - [第一步：安装依赖](#第一步安装依赖)
    - [第二步：配置环境变量](#第二步配置环境变量)
    - [第三步（可选）：初始化数据库](#第三步可选初始化数据库)
    - [第四步：启动项目](#第四步启动项目)
  - [API 接口概览](#api-接口概览)
  - [可用脚本](#可用脚本)
  - [注意事项](#注意事项)
  - [附加文件夹说明](#附加文件夹说明)

---

## 技术栈

| 层级       | 技术                                     |
|------------|------------------------------------------|
| 前端       | React 18 + Vite                          |
| 样式       | Tailwind CSS v3（自定义设计 Token 系统） |
| 路由       | React Router v6                          |
| 服务端状态 | TanStack Query（React Query v5）         |
| UI 状态    | Zustand                                  |
| 动画       | Framer Motion                            |
| 后端       | Node.js + Express                        |
| ODM        | Mongoose                                 |
| 数据库     | MongoDB（Atlas）                         |
| 鉴权       | JWT + bcryptjs（仅管理员使用）           |

---

## 项目结构

```text
ClassicRide/
├── client/                        # React + Vite 前端
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/            # Header, Footer
│   │   │   ├── ui/                # Chip, PillButton, GhostButton, VignetteImage
│   │   │   ├── timeline/          # TimelineSection, TimelineNode
│   │   │   ├── sidebar/           # TechnicalSidebar
│   │   │   └── filter/            # FilterBar
│   │   ├── pages/                 # Home, MarquePage, CarDetail, Archive, admin/
│   │   ├── hooks/                 # useCars, useMarques
│   │   ├── services/              # api.js — Axios 实例及所有 API 调用
│   │   └── store/                 # filterStore.js（Zustand）
│   ├── tailwind.config.js         # 所有设计 Token
│   └── vite.config.js             # 开发服务器 + /api 代理配置
├── server/
│   ├── models/                    # Car, Marque, Inquiry, User
│   ├── routes/                    # cars, marques, inquiries, auth
│   ├── controllers/               # 各资源的业务逻辑
│   ├── middleware/                # auth.js（JWT）, errorHandler.js
│   └── seed/
│       └── seed.js                # 数据库初始化脚本（43 辆车，9 个品牌）
├── .env.example                   # 环境变量模板
├── package.json                   # 根目录脚本（dev, build, seed）
└── README.md
```

> **关于 Claude Code 文件的说明：** 上方结构图仅展示了核心应用结构。实际仓库中还包含 AI 辅助开发过程中生成的 Claude Code 配置文件（`.claude/` 目录与 `CLAUDE.md`），这些文件被有意保留在仓库中，以便观看者结合视频演示了解完整的开发环境。具体用法请参考视频讲解。

---

## 环境要求

开始前请确认以下工具已安装：

- **Node.js** v18 或更高版本 — [nodejs.org](https://nodejs.org)
- **npm** v9 或更高版本（随 Node.js 一起安装）
- **MongoDB Atlas 账号** *(仅在使用自己的数据库时需要)* — [mongodb.com/atlas](https://www.mongodb.com/atlas)

---

## 安装与运行步骤

### 第一步：安装依赖

打开你的VSCode，或你喜欢的IDE，然后遵循以下步骤和命令。
克隆仓库并为三个工作区（根目录、client、server）分别安装依赖：

```bash
git clone https://github.com/UOA-CS732-S1-2026/cs732-tech-tutorial-Zachary-ZSZ.git
cd cs732-tech-tutorial-Zachary-ZSZ

# 安装根目录开发工具（concurrently）
npm install

# 安装前端依赖
npm install --prefix client

# 安装后端依赖
npm install --prefix server
```

---

### 第二步：配置环境变量

在根目录的终端环境下，复制evn变量模板：

```bash
# Windows PowerShell / macOS / Linux / Git Bash
cp .env.example .env

# 注意：除非你的终端环境为 Windows CMD， 则使用以下命令
copy .env.example .env
```

打开 `.env` 文件，只需替换 `MONGO_URI` 的值——其余变量已预填好，可直接使用：

```env
# ── MongoDB ──────────────────────────────────────────────────────────────────
# 通过 Canvas 作业页面提供。如有问题请联系 zacharyzhang2088@gmail.com。
MONGO_URI=<请查看 Canvas 作业页面或联系 zacharyzhang2088@gmail.com>

# ── JSON Web Token ────────────────────────────────────────────────────────────
JWT_SECRET=76c90f6b6ea8cf04282fe7527c97d1124d6d90eb4a280312c5bd303458ce05bb80eec6fad51e592412de5eadb743950c6a9f96e2e851c7202600a906570beaef
JWT_EXPIRES_IN=7d

# ── 服务器 ───────────────────────────────────────────────────────────────────
PORT=5000
NODE_ENV=development
```

> **MongoDB 凭据说明：** 本项目的 `MONGO_URI` 通过 Canvas 作业提交页面分发。如果你是课程评审员，请前往 Canvas 获取连接字符串。其他问题请联系 **zacharyzhang2088@gmail.com**。

---

### 第三步（可选）：初始化数据库

> **如果你使用的是 Canvas 提供的共享 `MONGO_URI`，数据库已经预置了完整数据，无需执行此步骤。** 请直接跳到[第四步：启动项目](#第四步启动项目)。
>
> **！！！仅在连接自己的 MongoDB 实例时才需要执行以下操作！！！**

项目内置了一个初始化脚本，可向数据库写入 **9 个品牌** 和 **43 辆经典车型**，每条记录包含描述、技术规格、来源说明及 Wikimedia Commons 图片。

在后端**未运行**的状态下，从项目根目录执行：

```bash
npm run seed
```

预期输出：

```text
MongoDB connected
Cleared existing data
Inserted 9 marques
Inserted 43 cars

Seed complete!
  Marques: Bugatti, Ferrari, Lamborghini, Porsche, Mercedes-Benz, BMW, Volkswagen, Ford, Toyota
  ...
```

> 该脚本具有**幂等性**——多次运行会先清空再重新写入，不会产生重复数据。

---

### 第四步：启动项目

在***项目根目录***执行以下命令，同时启动前端（端口 5173）和后端（端口 5000）：

```bash
npm run dev
```

`concurrently` 将同时启动以下两个服务：

| 服务 | 地址                    | 说明                    |
|------|-------------------------|-------------------------|
| 前端 | <http://localhost:5173> | React + Vite 开发服务器 |
| 后端 | <http://localhost:5000> | Express API 服务器      |

Vite 开发服务器会自动将所有 `/api` 请求代理到 `http://localhost:5000`，开发时无需处理跨域问题。

两个服务启动后，在浏览器中打开 <http://localhost:5173> 即可访问应用。

---

## API 接口概览

后端提供以下 REST 接口。受保护的接口需在请求头中携带 `Authorization: Bearer <token>`。

| 方法   | 路由                    | 鉴权 | 说明                                             |
|--------|-------------------------|------|--------------------------------------------------|
| GET    | `/api/health`           | —    | 健康检查（返回 `{ status, db }`）                |
| GET    | `/api/cars`             | —    | 获取车辆列表，支持 `?marque=`、`?era=`、`?sort=` |
| GET    | `/api/cars/:slug`       | —    | 获取单辆车的详细信息（含品牌数据）               |
| POST   | `/api/cars`             | ✓    | 新增车辆                                         |
| PUT    | `/api/cars/:slug`       | ✓    | 更新车辆信息                                     |
| DELETE | `/api/cars/:slug`       | ✓    | 删除车辆                                         |
| GET    | `/api/marques`          | —    | 获取所有品牌                                     |
| GET    | `/api/marques/:slug`    | —    | 获取品牌详情及旗下车辆                           |
| POST   | `/api/inquiries`        | —    | 提交访客询问                                     |
| GET    | `/api/inquiries`        | ✓    | 获取所有询问（管理员）                           |
| POST   | `/api/auth/login`       | —    | 管理员登录，返回 JWT                             |
| POST   | `/api/auth/register`    | ✓    | 创建管理员账号（需要有效 Token）                 |

**`/api/cars` 排序参数：**

| 参数值      | 说明         |
|-------------|--------------|
| `year_asc`  | 年份从旧到新 |
| `year_desc` | 年份从新到旧 |
| `name_az`   | 名称 A → Z   |
| `name_za`   | 名称 Z → A   |

---

## 可用脚本

所有命令均在**项目根目录**下执行。

| 命令            | 说明                                      |
|-----------------|-------------------------------------------|
| `npm run dev`   | 同时启动前端和后端（开发模式）            |
| `npm run seed`  | 向数据库写入 9 个品牌和 43 辆车的初始数据 |
| `npm run build` | 构建前端生产版本（输出到 `client/dist/`） |
| `npm start`     | 以生产模式启动 Express 服务器             |

---

## 注意事项

- **未配置生产部署。** 本项目仅用于本地运行，不包含 CI/CD 流水线或托管配置。
- **管理面板**入口为 `/admin/login`。首次使用需通过 `POST /api/auth/register`（携带有效 JWT）创建管理员账号。
- 所有车辆图片均来自 **Wikimedia Commons**（公共领域或自由授权）。运行项目无需任何第三方图片 CDN 密钥。

---

## 附加文件夹说明

仓库中包含两个不属于核心应用的文件夹，可按需忽略：

| 文件夹     | 说明                                                                                                   |
|------------|--------------------------------------------------------------------------------------------------------|
| `design/`  | 使用 Google Stitch 生成的 UI 设计原型及视觉参考文件，开发阶段作为唯一视觉标准。运行应用时不需要此文件夹。 |
| `dataset/` | 编写数据库初始化脚本时使用的原始数据文件（CSV / JSON）。数据库完成初始化后不再需要此文件夹。           |
