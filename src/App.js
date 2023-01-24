import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Login from './Components/Login/Login';
import AuthContext from './Components/Store/auth-context';
import { useContext } from 'react';

function App() {

  const authCtx = useContext(AuthContext);

  return (
    <div>
      <Navbar></Navbar>
      {authCtx.isLoggedIn && <h1>Welcome to Expense tracker</h1>}
      {!authCtx.isLoggedIn && <Login />}
    </div>
  );
}
export default App;