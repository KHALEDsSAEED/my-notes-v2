import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store, persistor } from './redux/store.js'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById('root')).render(
  // Wrap the App component with the Provider and PersistGate components
  // The Provider component provides the store to the App component
  // The PersistGate component ensures that the persisted state is loaded before rendering the App component
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <App />
    </Provider>
  </PersistGate>,
)
