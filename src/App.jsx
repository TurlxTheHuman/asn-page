import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './assets/css/global.css'


// Main Pages
import Main from './pages/index'

function App() {

return (
<Router>
  <div>

    <head>
      <title>My Website Template</title>
      <link rel="icon" href="/assets/img/favicon.ico" /> { /* Favicon */ }
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" /> { /* Font Awesome */ }
    </head>

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