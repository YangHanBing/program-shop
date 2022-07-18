import {
  createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 引入公共样式表
import './styles/index.scss'
// 页面鉴权
import './persission'
// 引入svg图标
import installIcons from './svg-icons/index.js'
const app = createApp(App)
installIcons(app)
app.use(store).use(router).use(ElementPlus).mount('#app')
