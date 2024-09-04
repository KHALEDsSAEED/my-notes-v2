import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/organisms/Header'
import Home from './pages/Home'
import About from './pages/About'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import PrivateRoutes from './private/PrivateRoutes'
import Dashboard from './pages/Dashboard'
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    // The BrowserRouter component wraps the entire application and provides the routing functionality
    <BrowserRouter>
      {/* The Header component is rendered at the top of the application   */}
      <Header />
      <Routes> {/*The Routes component is used to define the routes for the application */}
        {/* The Route component is used to define a route and the component to render when the route is matched */}
        <Route path="/" element={<Home />} />
        {/* The element prop is used to specify the component to render when the route is matched */}
        {/* The path prop is used to specify the path for the route */}
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
        {/* The PrivateRoutes component is used to define the private routes that require authentication */}
        <Route element={<PrivateRoutes />} >
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
