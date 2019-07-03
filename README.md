# rnplusintellisense README

[RNPlus](https://github.com/rnxteam/rnplus)的路由使用方法主要有

```javascript
RNPlus.open(pageName: string, opt?: {});
RNPlus.goto(pageName: string, opt?: {});
RNPlus.resetTo(pageName: string, opt?: {});
RNPlus.backTo(pageName: string, opt?: {});
```

等, 本插件提供对第一个参数的智能提示
![VWpQN6.md.gif](https://ws3.sinaimg.cn/large/005BYqpggy1g3ymlhxpvrg30sl0kqqjs.jpg)

## Features

* 输入 RNPlus.xx('')方法时触发, 提示所有当前项目下 src 或 tssrc 下 view 目录中的 PView 组件名


- [ ] 添加配置项, 查找更灵活
- [ ] 根据第一个参数的输入, 智能提示第二个参数中的 param
- [ ] view输入内容的校验
- [ ] param的校验
- [ ] 去重


## Extension Settings



## Release Notes


### 1.0.0

初始化项目
完成对 pageName 的智能提示

### 1.0.1
更新ts项目检测方法

---

**Enjoy!**
