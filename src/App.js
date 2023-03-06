
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import 'antd/dist/reset.css';
import 'antd/dist/antd.js';
import 'antd/dist/antd.min.js';
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import Account from "./pages/Account";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route exact path="/" element={<Main><Home /></Main>} />       
        <Route exact path="/profile" element={<Main><Profile /></Main>} />
        <Route exact path="/account" element={<Main><Account /></Main>} />
      </Routes>
    </div>
  );
}

export default App;
