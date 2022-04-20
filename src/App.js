
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Airlines from './components/Airlines';
import Home from './components/Home';
import Navbar from './components/Navbar';
import UserList from './components/UserList';
import PassengerList from './components/PassengerList';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/userlist" element={<UserList />}></Route>
          <Route path="/airlines_list" element={<Airlines />}></Route>
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
