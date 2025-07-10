import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { ToastContainer } from 'react-toastify'
import ToastProvider from './components/ToastProvider'
import { HelmetProvider } from 'react-helmet-async'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <HelmetProvider>
      <Provider store={store}>
        <ToastProvider>
          <App />
          <ToastContainer />
        </ToastProvider>
      </Provider>
    </HelmetProvider>
  </BrowserRouter>
)
