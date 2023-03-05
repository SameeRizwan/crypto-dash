
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Tables from "./pages/Tables";
import Billing from "./pages/Billing";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import 'antd/dist/reset.css';
import 'antd/dist/antd.js';
import 'antd/dist/antd.min.js';
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route exact path="/" element={<Main><Home /></Main>} />
        <Route exact path="/tables" element={<Main><Tables /></Main>} />
        <Route exact path="/billing" element={<Main><Billing /></Main>} />
        <Route exact path="/profile" element={<Main><Profile /></Main>} />
      </Routes>
    </div>
  );
}

export default App;
