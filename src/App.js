import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/Navbar';
import MainContainer from './components/MainContainer';
import Login from './components/Login';
import { useState } from 'react';

function App() {
    
  const [user, setUser] = useState(null)

  return (
    <div className="App">
      {user ? (
            <div className="App">
              <NavBar></NavBar>
              <MainContainer></MainContainer>
            </div>
      ) : <Login setUser={setUser}></Login>}
    </div>
  );

}

export default App;
