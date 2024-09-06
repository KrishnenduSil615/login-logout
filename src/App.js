
import './App.css';
import ForgotPassword from './Pages/forgotPassword';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Root from './Pages/Root';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
function App() {
const router = createBrowserRouter([
  {
    path:'/',
    element: <Root/>,
    children:[
      {path: '/', element: <Login/>},
      {path: '/register', element: <Register/>},
      {path: '/forgotPassword', element: <ForgotPassword/>},
      {path: '/home', element: <Home/>}
    ]
  }
])
  return (
   <div className='bg-secondary'>
   <RouterProvider router={router} />
   </div>
  );
}
      

export default App;
