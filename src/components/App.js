import React from 'react'
import LandingPage from './LandingPage'

const App = ({children, ...props}) => (
  <div>
    {children || <LandingPage {...props} />}
  </div>
)
export default App
