import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Login from './Components/Login/Login';
import AuthContext from './Components/Store/auth-context';
import { useContext } from 'react';
import Home from './Components/Pages/Home';
import { Routes, Route, Navigate } from 'react-router-dom';
import UserProfile from './Components/UserProfiles/UserProfile';

function App() {

  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <div>
      <Navbar />
      {/* {authCtx.isLoggedIn && <Home />}
      {!authCtx.isLoggedIn && <Login />} */}
      <Routes>
        <Route path='/' exact element={<Navigate replace to='/home' />} />
        <Route path='/home' element={<Home />} />

        {/* <Route
          path='/expenses'
          element={isLoggedIn ? <Expenses /> : <Navigate to='/login' replace />}
        /> */}

        {/* <Route path='/about' element={<About />} /> */}

        <Route
          path='/profile'
          element={
            isLoggedIn ? <UserProfile /> : <Navigate to='/login' replace />
          }
        />

        <Route path='/login' element={<Login />} />
        {/* <Route path='/resetpassword' element={<ForgotPassword />} /> */}
      </Routes>
    </div>
  );
}
export default App;