import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";
import "../services/httpsCall";
import { store, persistedStore } from "../store/store";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <BrowserRouter>
          <Toaster position="top-right" reverseOrder={false} />
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
