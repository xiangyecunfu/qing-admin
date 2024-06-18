import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './router'

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
    <Router />
  </StyleProvider>,
)
