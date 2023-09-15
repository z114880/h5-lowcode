# 基于React的H5低代码平台

[![license](https://img.shields.io/github/license/z114880/h5-lowcode.svg)](LICENSE)

**中文** | [English](./README.EN.md)


# React 低代码平台简介

该低代码平台是基于 React 技术栈开发的，旨在帮助用户快速生成 H5 页面，减少繁琐的手动编码工作。它提供了一种简单而强大的方式来创建、配置和部署具有快速响应、精准适配和易于操作的页面。

## [预览地址](https://funet.top)

## 主要特性

- **快速响应**：通过优化页面渲染和交互逻辑，确保生成的 H5 页面具有快速响应的特性。它采用了现代化的前端技术和最佳实践，以最小化加载时间、提高用户体验。
- **精准适配**：平台提供了丰富的布局和样式配置选项，使用户能够精确控制页面的外观和布局。无论是在不同设备上还是在不同屏幕尺寸上，生成的 H5 页面都能够自动适应，并呈现出一致的外观和用户体验。
- **易于操作**：该低代码平台注重用户友好性，提供直观的可视化界面和简单易用的拖拽功能，使用户能够快速构建页面。无需深入了解复杂的编程知识，用户可以通过简单的操作完成页面的设计、布局和组件配置。
- **组件库和模板**：平台内置了丰富的组件库和预定义模板，涵盖了常见的页面元素和功能。用户可以直接使用这些组件和模板，或者根据需要进行定制和扩展，以满足特定的业务需求。
- **可视化编辑和实时预览**：平台提供可视化编辑器，用户可以在编辑器中直接进行页面设计和配置。同时，它还提供实时预览功能，让用户能够即时查看页面的效果，并进行实时调整和优化。
- **代码生成和导出**：该低代码平台支持将设计好的页面代码生成为可部署的 HTML、CSS 和 JavaScript 文件，方便用户将生成的 H5 页面部署到各种托管环境或集成到现有项目中。

##

基于 React 的这个低代码平台提供了一种快速、灵活和易用的方式来生成 H5 页面。它具有快速响应、精准适配和易于操作的特性，使用户能够更高效地创建出令人印象深刻的交互式页面，无论是用于个人项目、企业网站还是移动应用。


## 启动项目

```shell
git clone https://github.com/z114880/h5-lowcode.git
```

```bash
cd h5-lowcode

pnpm install -r
```

- run

```bash
cd packages/website

npm run dev
```

- build

```bash
npm run build:code 用于开发时编译code-generator和material包

npm run build:website 用于生产环境
```

## 技术栈

- 编程语言：TypeScript 4.x
- 构建工具：Vite 3.x
- 前端框架：React18
- 路由工具：react-router-dom
- 状态管理：context + useReducer
- PC 端 UI 框架：ant-design
- H5 端 UI 框架：web-component
- CSS 框架：tailwind + Sass

### 功能清单

- 拖拽式生成组件，拖拽修改组件位置大小
- 组件嵌套
- 弹窗
- 撤销，恢复功能
- 导入导出JSON模版
- 实时预览
- 导出项目代码
- 设置组件css属性，自定义属性等
- 设置组件动画
- 辅助线功能

### 联系作者

- 微信：Andrew__zhuang
- 邮箱：1148803335@qq.com

## 浏览器支持

本地开发推荐使用`Chrome` 浏览器

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| :-: | :-: | :-: | :-: | :-: |
| not support | last 2 versions | last 2 versions | last 2 versions | last 2 versions |

