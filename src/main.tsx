import ReactDOM from 'react-dom/client'
import Router from './router'
import { Provider } from 'react-redux'
import { store } from './store'

// 样式兼容
import {
  StyleProvider,
  legacyLogicalPropertiesTransformer,
} from '@ant-design/cssinjs'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StyleProvider
    hashPriority="high"
    transformers={[legacyLogicalPropertiesTransformer]}
  >
    <Provider store={store}>
      <Router />
    </Provider>
  </StyleProvider>,
)
