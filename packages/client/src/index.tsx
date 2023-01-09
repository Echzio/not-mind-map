import { createRoot } from 'react-dom/client'

import { Root } from './root'

const node = document.getElementById('app')

if (node) {
  createRoot(node).render(<Root />)
}
