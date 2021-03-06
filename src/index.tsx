import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import GlobalCSS from './styles/global'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from './apollo-client/client'
import { BrowserRouter } from 'react-router-dom'
import CurrencyProvider from './context/currency/provider'

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={apolloClient}>
        <CurrencyProvider>
          <GlobalCSS />
          <App />
        </CurrencyProvider>
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
