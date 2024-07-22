import React, { useState } from 'react'
import { Provider } from 'react-redux';
import { store } from './app/store.js';
const LiveTable = React.lazy(() => import('./components/LiveTable'));

function App() {
  return (
    <>
    <Provider store={store}>
      <React.Suspense fallback={<>Loading</>}>
          <LiveTable />
      </React.Suspense>
     </Provider>
    </>
  )
}

export default App
