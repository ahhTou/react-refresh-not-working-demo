# React Refresh Reload 失效

```bash
# cd ./app-2
npm run build
# cd ./app-1
npm run start
```

修改 `Component.tsx` 将没用效果，只有手动刷新才行

# React Refresh Reload 正常

```bash
# cd ./app-2
npm run start
# cd ./app-1
npm run start
```

然后修改 `webpack.config.js`，注释 64 行，打开 67 行
