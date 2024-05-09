
import './App.css'
import Login from './components/Login'
import Register from './components/Register'
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom"
import Navigation from './components/Navigation'
import ProtectedRoute from './authRoute/ProtectedRoute'
import Home from './components/Home'
import AddCategory from './components/AddCategory'
import AddBlog from './components/AddBlog'
import SingleBlog from './components/SingleBlog'



function App() {


  return (
    <>
      <Router>
        <Navigation />
        <div>

          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />

            {/* Protected routes */}
            <Route path="/" element={<ProtectedRoute />}>
              <Route path='/' element={<Home />} />
              <Route path='/add-category' element={<AddCategory />} />
              <Route path='/add-blog' element={<AddBlog />} />
              <Route path='/blog/:id' element={<SingleBlog />} />
            </Route>

            {/* <Login /> */}
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
