import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/Navbar';
import MainContainer from './components/MainContainer';
import Login from './components/Login';
import Group from './components/Group';
import { useState } from 'react';

function App() {
    
  const [user, setUser] = useState(null)
  const [group, setGroup] = useState(null)

  return (
    <div className="App">
      {user ? (
            group ? (
              <div className="App">
                <NavBar group={group} setGroup={setGroup}></NavBar>
                <MainContainer user={user} group={group}></MainContainer>
              </div>
            ) : <Group user={user} setUser={setUser} setGroup={setGroup}></Group>
      ) : <Login setUser={setUser}></Login>}
    </div>
  );

}

export default App;
