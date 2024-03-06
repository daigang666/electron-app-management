import { createApp } from 'vue'
import App from './App.vue'
import { setupDirectives } from './directives'
import { setupI18n } from './locales/index'
import { setupAssets } from './plugins'
import { setupNaive } from './plugins/naive'
import { setupStore } from './store'
import { setupRouter, router } from './router'

async function bootstrap() {
  const app = createApp(App)
  setupAssets()

  setupStore(app)

  setupDirectives(app)

  // 注册全局常用的 naive-ui 组件
  setupNaive(app)

  setupI18n(app)

  await setupRouter(app)

  app.mount('#app').$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
}

bootstrap()
