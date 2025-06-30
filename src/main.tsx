import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './router.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
    <Router />
    </Provider>
)
