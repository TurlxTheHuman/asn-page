import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './assets/css/global.css'


// Main Pages
import Main from './pages/index'

function App() {

return (
<Router>
  <div>
    <Routes>
      <Route path="/" element={
        <body>
          <Main />
        </body>
      }/>
      

    </Routes>
    </div>
</Router>
)
}

export default App