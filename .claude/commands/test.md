# ClassicRide — Full Project Test Suite

你是 ClassicRide MERN 项目的自动化测试执行器。按顺序运行以下四个阶段的完整测试套件，并输出结构化测试报告。

## 执行规则

- ✅ **PASS** — 检查通过
- ❌ **FAIL** — 检查失败，必须显示实际错误值
- ⚠️ **WARN** — 文件/功能尚未实现（对应阶段未完成时属预期，不计入失败）
- API 测试假设服务端运行在 `http://localhost:5000`，前端运行在 `http://localhost:5173`
- 未启动服务时，API 类测试标记为 ⚠️ WARN 并说明原因
- 最终输出汇总表

---

## Phase 1 — 设计系统迁移 & React 脚手架

### P1-1: Monorepo 根目录结构
检查以下文件存在：
`package.json`, `.gitignore`, `.gitattributes`, `.env.example`, `CLAUDE.md`

验证根 `package.json` 的 scripts 包含：`dev`（concurrently）、`build`、`start`、`seed`

### P1-2: 客户端项目结构
检查以下文件存在：
`client/package.json`, `client/vite.config.js`, `client/index.html`, `client/postcss.config.js`, `client/tailwind.config.js`

验证 `client/vite.config.js` 配置了 `/api` 代理指向 `localhost:5000`

### P1-3: Tailwind 颜色 Token 完整性
读取 `client/tailwind.config.js`，验证 `theme.extend.colors` 中包含以下关键 token：
`primary`, `primary-container`, `on-primary`, `surface`, `surface-container-lowest`, `surface-container-low`, `surface-container-high`, `surface-container-highest`, `surface-bright`, `surface-variant`, `on-surface`, `on-surface-variant`, `outline`, `outline-variant`, `background`

### P1-4: Tailwind 语义字号
验证 `theme.extend.fontSize` 包含：`display-lg`, `display`, `headline`, `title`, `label-sm`
验证 `display-lg` 的 lineHeight ≤ 1.1（monumental 字号需紧凑行高）

### P1-5: Tailwind 字体族 & 圆角
验证 `fontFamily` 包含：`headline`（Noto Serif）、`body`（Inter）、`label`（Inter）
验证 `borderRadius` 包含：`DEFAULT`（1rem）、`lg`、`xl`、`full`（9999px）

### P1-6: index.css 自定义工具类
读取 `client/src/styles/index.css`，验证包含：
- `@tailwind base/components/utilities` 三行指令
- `.vignette-overlay`（radial-gradient）
- `.sidebar-transition`（cubic-bezier 奢侈过渡）
- `.shadow-ambient`（高模糊低扩散阴影）
- `.bg-gradient-cta`（45° 金色渐变）

### P1-7: main.jsx Provider 装配顺序
读取 `client/src/main.jsx`，验证：
- `QueryClientProvider` 包裹 `BrowserRouter`，或 `BrowserRouter` 包裹 `QueryClientProvider`，两者都包裹 `<App />`
- `QueryClient` 配置了 `staleTime`（不使用默认 0）

### P1-8: App.jsx 路由表完整性
读取 `client/src/App.jsx`，验证包含以下 6 条路由：
`/`, `/marque/:slug`, `/car/:slug`, `/archive`, `/admin/login`, `/admin`（`/admin` 受 ProtectedRoute 保护）

### P1-9: ProtectedRoute 安全逻辑
读取 `client/src/components/auth/ProtectedRoute.jsx`，验证：
- 读取 localStorage `token`
- 无 token 时使用 `<Navigate>` 重定向至 `/admin/login`，不渲染子组件

### P1-10: UI 原子组件导出
读取 `client/src/components/ui/index.js`，验证导出了：`Chip`, `PillButton`, `GhostButton`, `VignetteImage`, `SectionLabel`

### P1-11: Chip 组件设计合规
读取 `client/src/components/ui/Chip.jsx`，验证：
- active 时 class 包含 `bg-primary` 和 `text-on-primary`
- inactive 时 class 包含 `bg-surface-container-high`
- transition duration 在 300ms–600ms 范围内（不得小于 300ms 或大于 600ms）

### P1-12: VignetteImage 动画合规
读取 `client/src/components/ui/VignetteImage.jsx`，验证：
- 使用 `duration-500`（不得使用 `duration-700`，超出 600ms 奢侈上限）
- 包含 `ease-in-out`
- 包含 `vignette-overlay` class
- 有 `loading="lazy"` 图片懒加载

### P1-13: PillButton 三态变体
读取 `client/src/components/ui/PillButton.jsx`，验证：
- 支持 `variant="primary"` / `"ghost"` / `"gradient"` 三种变体
- gradient 变体使用 `bg-gradient-cta`

### P1-14: Header Glassmorphism 合规
读取 `client/src/components/layout/Header.jsx`，验证：
- `fixed` + `z-50` 定位
- 包含 `backdrop-blur-xl`
- 导航链接使用 `NavLink`（React Router），不使用原生 `<a>`

> 注：Header 无移动端菜单按钮，这是设计决策，不作为检查项。

### P1-15: Footer 设计合规
读取 `client/src/components/layout/Footer.jsx`，验证：
- 使用 `border-outline-variant/20` 顶部边框（遵循 No-Line Rule）
- 版权年份动态生成（`new Date().getFullYear()`）
- 链接使用 `Link`（React Router）

---

## Phase 2 — MongoDB Schema & Express API

### P2-1: 服务端文件结构
检查以下文件全部存在：
`server/index.js`, `server/models/Car.js`, `server/models/Marque.js`, `server/models/Inquiry.js`, `server/models/User.js`, `server/controllers/carController.js`, `server/controllers/marqueController.js`, `server/controllers/inquiryController.js`, `server/controllers/authController.js`, `server/routes/cars.js`, `server/routes/marques.js`, `server/routes/inquiries.js`, `server/routes/auth.js`, `server/middleware/auth.js`, `server/middleware/errorHandler.js`, `server/seed/seed.js`

### P2-2: Car Schema 完整性
读取 `server/models/Car.js`，验证：
- `slug` 有 `unique: true` 和 `index: true`
- `marque` 是 ObjectId ref `'Marque'`
- `era` 有 enum 约束
- `category` 有 enum 约束
- `specs` 是嵌套 Schema（含 engine/power/topSpeed/weight）
- `images` 是数组 Schema（含 url/alt/primary）
- 有 `primaryImage` virtual 字段
- 有 `timestamps: true`

### P2-3: User Schema 安全性
读取 `server/models/User.js`，验证：
- 字段名为 `passwordHash`（不是 `password`）
- `toJSON` transform 中删除了 `passwordHash`
- 有 `comparePassword` 实例方法（使用 bcrypt.compare）

### P2-4: auth 中间件完整性
读取 `server/middleware/auth.js`，验证：
- 检查 `Bearer ` 前缀
- 无 token 返回 401
- 使用 `jwt.verify` 并传入 `process.env.JWT_SECRET`
- 验证失败返回 401

### P2-5: errorHandler 覆盖范围
读取 `server/middleware/errorHandler.js`，验证处理：
- `ValidationError` → 400
- code `11000`（重复键）→ 409
- `CastError` → 400
- 默认 → err.status 或 500

### P2-6: server/index.js 装配正确性
读取 `server/index.js`，验证：
- `dotenv` 使用绝对路径加载（`resolve(__dirname, '../.env')`），不使用 `import 'dotenv/config'`
- 4 条路由均已通过 `app.use()` 注册
- `errorHandler` 在所有路由之后注册
- CORS origin 使用正则 `/^http:\/\/localhost:\d+$/`（不硬编码单一端口）

### P2-7: carController filter/sort 逻辑
读取 `server/controllers/carController.js`，验证：
- 支持 `marque` 查询参数（先查 Marque slug → ObjectId）
- 支持 `era`, `category`, `featured` 过滤
- 有 SORT_MAP 定义 `year_asc`, `year_desc`, `name_az`, `name_za`
- getCar 使用 `.populate('marque')`
- 所有方法有 try/catch 并调用 `next(err)`

### P2-8: seed 脚本结构
读取 `server/seed/seed.js`，验证：
- 先 `deleteMany()` 清空后再 `insertMany()`（幂等）
- marque slug → ObjectId 映射（不硬编码 ObjectId 字符串）
- `mongoose.disconnect()` 在 finally 中执行
- 包含 >= 3 个品牌，>= 4 辆车

### P2-9: API 健康检查
```
GET http://localhost:5000/api/health
```
验证：HTTP 200，`status: "ok"`，`db: "connected"`

### P2-10: GET /api/cars 基础列表
```
GET http://localhost:5000/api/cars
```
验证：响应含 `data`（数组）和 `total`（数字），`total >= 2`，每条记录含 `slug`, `name`, `year`, `marque.name`

### P2-11: GET /api/cars 品牌过滤
```
GET http://localhost:5000/api/cars?marque=porsche
```
验证：所有返回记录的 `marque.name` 均为 `Porsche`

### P2-12: GET /api/cars 年份排序
```
GET http://localhost:5000/api/cars?sort=year_asc
GET http://localhost:5000/api/cars?sort=year_desc
```
验证：year_asc 第一条 year ≤ 最后一条；year_desc 反之

### P2-13: GET /api/cars/:slug 单车详情
```
GET http://localhost:5000/api/cars/911-carrera-rs-27
```
验证：`name: "911 Carrera RS 2.7"`，`specs` 四个字段均非空，`provenance` 非空，`marque` 已完整 populate

### P2-14: GET /api/cars/:slug 404
```
GET http://localhost:5000/api/cars/does-not-exist
```
验证：HTTP 404，响应含 `error` 字段

### P2-15: GET /api/marques 列表
```
GET http://localhost:5000/api/marques
```
验证：数组长度 >= 2，每条含 `slug`, `name`, `biography`

### P2-16: GET /api/marques/:slug 含旗下车辆
```
GET http://localhost:5000/api/marques/porsche
```
验证：含 `biography`（非空），含 `cars` 数组（length >= 1），cars 按 year 升序

### P2-17: POST /api/inquiries 公开提交
先从 GET /api/cars 获取真实 `_id`，然后：
```
POST http://localhost:5000/api/inquiries
Body: { car: "<real_id>", visitorName: "Test User", email: "test@classicride.test", message: "Interested in provenance." }
```
验证：HTTP 201，响应含 `message` 和 `id`

### P2-18: POST /api/inquiries 字段校验
```
POST http://localhost:5000/api/inquiries
Body: { visitorName: "No Email" }
```
验证：HTTP 400，响应含 `error`

### P2-19: GET /api/inquiries 未授权拦截
```
GET http://localhost:5000/api/inquiries
```
验证：HTTP 401，`error: "No token provided"`

### P2-20: POST /api/auth/login 凭据错误
```
POST http://localhost:5000/api/auth/login
Body: { email: "nobody@test.com", password: "wrong" }
```
验证：HTTP 401，`error: "Invalid credentials"`

### P2-21: POST /api/auth/login 缺少字段
```
POST http://localhost:5000/api/auth/login
Body: { email: "test@test.com" }
```
验证：HTTP 400，响应含 `error`

### P2-22: POST /api/auth/register 未授权拦截
```
POST http://localhost:5000/api/auth/register
Body: { email: "new@test.com", password: "test123" }
```
验证：HTTP 401（register 受 auth 中间件保护）

---

## Phase 3 — React 前端实现

> 如果 Phase 3 尚未开始，以下测试均标记为 ⚠️ WARN（预期）

### P3-1: 服务层文件
检查 `client/src/services/api.js` 存在，验证：
- 创建了 axios 实例（`axios.create`）
- `baseURL` 为 `/api`（相对路径，走 Vite 代理）
- 有 request interceptor 附加 JWT Bearer token
- 导出了 `getCars`, `getCar`, `getMarques`, `postInquiry` 等函数

### P3-2: Zustand Filter Store
检查 `client/src/store/filterStore.js` 存在，验证：
- 使用 `create`（Zustand）
- 状态包含：`activeMarque`, `activeEra`, `sort`
- 包含 setter 方法：`setMarque`, `setEra`, `setSort`

### P3-3: TanStack Query Hooks
检查 `client/src/hooks/useCars.js` 存在，验证：
- 使用 `useQuery(['cars', filters], ...)`
- `enabled` 或 `staleTime` 已配置

### P3-4: FilterBar 组件
检查 `client/src/components/filter/FilterBar.jsx` 存在，验证：
- 使用 `Chip` 组件渲染品牌和年代筛选
- 连接了 Zustand `filterStore`
- 显示动态 results count

### P3-5: TimelineSection & TimelineNode
检查 `client/src/components/timeline/TimelineSection.jsx` 存在
检查 `client/src/components/timeline/TimelineNode.jsx` 存在，验证：
- `TimelineNode` 接受 `car`, `index`, `isSelected`, `onClick` props
- 偶数 index 使用 `flex-row`，奇数使用 `flex-row-reverse`（交替布局）
- 使用 `VignetteImage` 组件渲染图片

### P3-6: TechnicalSidebar
检查 `client/src/components/sidebar/TechnicalSidebar.jsx` 存在，验证：
- 接受 `slug` prop
- 内部调用 `useCar(slug)`（按需加载，不在父组件预取）
- 有 Tab 切换状态（Overview/Specifications/History/Media）
- 使用 `GhostButton` 或 `PillButton` 渲染 "Request Provenance"

### P3-7: Home 页面完整实现
读取 `client/src/pages/Home.jsx`，验证：
- 不再是占位符（不含 "Coming soon" 或 "Phase 3" 文字）
- 渲染了 HeroSection（或等效英雄区）
- 渲染了 FilterBar
- 渲染了 TimelineSection
- 渲染了 TechnicalSidebar
- 有 `selectedCarSlug` 状态，点击 TimelineNode 更新 Sidebar

### P3-8: CarDetail 页面
读取 `client/src/pages/CarDetail.jsx`，验证：
- 使用 `useParams()` 获取 slug
- 调用 `useCar(slug)` 获取数据
- 展示 specs 网格
- 展示完整 provenance 文本
- 有询盘表单（调用 `postInquiry`）

### P3-9: Archive 页面
读取 `client/src/pages/Archive.jsx`，验证：
- 不再是占位符
- 使用网格布局（非 timeline 布局）
- 复用 FilterBar 进行筛选

### P3-10: MarquePage 页面
读取 `client/src/pages/MarquePage.jsx`，验证：
- 使用 `useParams()` 获取 slug
- 调用 `getMarques/:slug` 获取品牌+旗下车辆
- 展示品牌 biography

---

## Phase 4 — 代码质量 & 版本控制

> 生产部署、构建产物、Express 生产模式均不在检查范围内。

### P4-1: 环境变量安全性
检查 `.env` 未被提交到 Git：
```bash
git ls-files .env
```
验证：输出为空（.env 在 .gitignore 中）

检查 `.env.example` 已提交且包含所有必要键：
`MONGO_URI`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `PORT`, `NODE_ENV`

### P4-2: 敏感信息未硬编码
在以下目录中搜索硬编码凭据：
- `server/` 和 `client/src/` 中不得出现真实的 `mongodb+srv://` 连接字符串（注释中的占位符除外）
- 不得出现硬编码 JWT secret 字符串
- `client/src/` 中不得出现 `localhost:5000`（API 调用必须通过 `/api` 相对路径）

### P4-3: 依赖安全审计
运行：
```bash
npm audit --prefix client 2>&1
npm audit --prefix server 2>&1
```
验证：无 **critical** 或 **high** 漏洞（moderate 以下标记 ⚠️ WARN）

### P4-4: Git 提交历史
运行：
```bash
git log --oneline
```
验证：有至少 1 条 commit，commit message 语义化（含 feat/fix/chore 等前缀）

### P4-5: GitHub 远程仓库
运行：
```bash
git remote -v
```
验证：有 `origin` 远程地址（github.com）

---

## 测试报告格式

所有测试执行完毕后，输出：

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ClassicRide — Full Project Test Report
  运行时间：[当前日期时间]
  服务状态：Backend [运行中/未运行] | Frontend [运行中/未运行]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PHASE 1: Design System & React Scaffold  (15 项)
  P1-1   Monorepo 根目录结构              ✅/❌
  P1-2   客户端项目结构                   ✅/❌
  ...（每项一行）

PHASE 2: Express API & MongoDB           (22 项)
  P2-1   服务端文件结构                   ✅/❌
  ...

PHASE 3: React 前端实现                 (10 项)
  P3-1   服务层文件                       ✅/❌/⚠️
  ...

PHASE 4: 代码质量 & 版本控制            (5 项)
  P4-1   环境变量安全性                   ✅/❌/⚠️
  ...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  总计：52 项
  ✅ 通过：XX    ❌ 失败：XX    ⚠️ 警告/待实现：XX
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

【需修复问题】
  ❌ Pxx  原因：...  修复建议：...

【待验证项（服务未运行）】
  ⚠️ P2-x  需启动 npm run dev 后验证
```
