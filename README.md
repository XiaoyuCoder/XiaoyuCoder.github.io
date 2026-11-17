# 王宇 · 个人主页

中国人民大学信息学院博士研究生王宇（Yu Wang）的学术主页。采用蓝白配色，不展示或保留个人照片。静态 HTML、CSS 和 JavaScript，可直接由 GitHub Pages 托管，无需安装依赖或执行构建。

## 内容

- 个人简介、研究兴趣与联系方式（仅 `wangyu_2026@ruc.edu.cn`）
- 中国人民大学博士在读及中南大学本科教育背景
- TCAGRN（BIBM 2026）论文及 BibTeX 引用
- 奖学金与竞赛荣誉
- 小工具导航及财富自由计算器：目标测算、资产反推、参数与公式、示例场景
- 城市租金与收入观察：搜索、互动散点图、住宅面积切换和逐城市来源

以用户提供的简历为基础；当前身份与论文信息以本次要求为准。网站不展示项目经历，也不公开包含旧身份、电话及项目详情的原始简历。

## 本地预览

在仓库根目录启动任意静态 HTTP 服务器，例如：

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

浏览器访问 `http://127.0.0.1:4173/`。资源使用站点根路径，适用于 `XiaoyuCoder.github.io` 用户主页域名。

## 更新

- `index.html`：主页内容、网页元数据和 BibTeX。
- `assets/css/main.css`：桌面与移动端样式。
- `assets/js/navigation.js`：各页面共用的手机导航和主页章节定位。
- `assets/js/main.js`：主页复制邮箱和引用弹窗。
- `tools/index.html`：小工具目录。
- `tools/financial-freedom/index.html`：财富自由计算器。
- `assets/css/tools.css`：小工具页面的蓝白配色和响应式布局。
- `assets/js/financial-freedom.js`：计算器交互；`financial-freedom-model.mjs` 独立实现计算公式。
- `tools/city-living/index.html`、`assets/css/city-living.css`、`assets/js/city-living.js` 和 `assets/js/city-living-data.mjs`：城市比较工具及带来源的数据。
- `sitemap.xml`：更新页面后同步修改日期。

旧博客入口保留为跳转页，内容统一导向新主页。`404.html` 为独立的找不到页面提示。

计算器功能参考用户提供的[示例页面](https://4kuvf8x1s7txd.doubao.link/app/app_17gq67c94tr)，使用独立实现和本站蓝白配色。默认采用名义年回报率 4.5%、通胀率 2%，近似实际回报率为 2.5%，对应乘数 480；默认值及示例均为演示假设。实际回报率不大于零时提示模型不适用，资产不足以覆盖预留时明确显示缺口。计算在浏览器内完成，不存储或上传输入。

城市工具使用各地 2024 年城镇居民人均可支配收入（年值除以 12）与中指研究院 2024 年 12 月样本平均套租金。租金与收入样本并非同一群体，比例仅用于比较，不是实际个人负担；数据是历史快照，不代表当前行情。租赁报告部分面积档因样本少未公布，保留缺失。重庆租金为主城区，收入为全市城镇居民。各城市详情中提供原始资料链接。

## 发布

沿用仓库现有 GitHub Pages 设置。将变更推送至配置的发布分支后由 GitHub Pages 发布；本地预览本身不会更新线上网站。
