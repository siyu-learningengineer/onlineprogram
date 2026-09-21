# Online Program

中文国际教育与海外服务网站。科技感视觉：深蓝地球主视觉、蓝紫渐变标题、彩色服务卡片、半透明固定导航与移动端布局。

## 页面

- 首页：五大服务入口与目的地列表
- 雅思 / 托福、外教口语：独立服务页面
- 留学规划：美国、香港地区、英国、加拿大、澳大利亚、新西兰、新加坡、马来西亚、欧洲、日韩、外籍同学申请中国内地大学
- 落地服务：补课、租房买房、保险购买
- 各类签证服务：旅游签证、访问学者、留学签证、陪读签证

共 21 个 HTML 页面。纯静态网站，无需安装依赖。所有链接使用相对路径，兼容 GitHub Pages 子目录部署。

## 本地查看

在仓库目录运行 `python3 -m http.server 8000`，浏览器打开 `http://localhost:8000`。

## GitHub Pages

在仓库 Settings → Pages 中选择从分支部署，并选定网站所在分支的根目录。启用后以 GitHub 提供的地址为准。

## 内容更新

当前使用 Online Program 作为暂定名称。尚未提供 PDF、正式品牌、联系方式、师资资料或报价，因此页面未虚构相关信息，也没有未连接后台的咨询表单。收到资料后可替换文案与图片，添加真实咨询渠道。

字体使用 Google Fonts Noto Sans SC，加载失败时自动使用系统字体。导航支持键盘、Escape 关闭、移动端菜单和减弱动画偏好。

## Current cover release

Seven services: IELTS/TOEFL/Duolingo/PTE, world languages, foreign teacher speaking, research/writing, study abroad, visas, and arrival support. Colored service cards and matching line icons follow the supplied palette. Seven mascot states, including a curious research expression, respond to interaction. The visible instruction below the character is removed. Fourteen greetings cycle automatically every 1.5 seconds with rotating colors and fades; reduced-motion settings retain timed words without fades.

Expression prompts: `assets/mascot/prompts.json`. Optional greeting video remains unset.

Homepage now contains only the interactive cover. Bilingual card titles link to detail or category pages; all prior lower sections remain available on services.html. Skyline SVG is decorative, translucent, and arranged along a curved horizon.
