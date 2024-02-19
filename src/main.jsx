import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { Box, ChakraProvider } from "@chakra-ui/react";
import HotjarTracking from './HotjarTracking';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
    <HotjarTracking />
      <App />
    </ChakraProvider>
  </React.StrictMode>
)




