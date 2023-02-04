import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Login from './Components/Login/Login';
import Home from './Components/Pages/Home';
import { Routes, Route, Navigate } from 'react-router-dom';
import UserProfile from './Components/UserProfiles/UserProfile';
import ForgotPassword from './Components/Login/ForgotPassword';
import Expenses from './Components/Expenses/Expenses';
import About from './Components/Expenses/About';
import { useSelector } from 'react-redux';

function App() {

  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const toggle = useSelector((state) => state.theme.toggle);

  return (
    <div className={toggle === 'dark' ? 'dark' : ''}>
      <Navbar />
      <Routes>
        <Route path='/' exact element={<Navigate replace to='/home' />} />
        <Route path='/home' element={<Home />} />

        <Route
          path='/expenses'
          element={isLoggedIn ? <Expenses /> : <Navigate to='/login' replace />}
        />

        <Route path='/about' element={<About />} />

        <Route
          path='/profile'
          element={
            isLoggedIn ? <UserProfile /> : <Navigate to='/login' replace />
          }
        />

        <Route path='/login' element={<Login />} />
        <Route path='/resetpassword' element={<ForgotPassword />} />
      </Routes>
    </div>
  );
}
export default App;