import React from 'react'
import { Provider } from 'react-redux'

//Store
import store from './store/createStore'

//Navigator
import Navigation from './navigator'

const App = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  )
}

export default App
