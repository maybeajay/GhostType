import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./screens/Results"
import WelcomeScreen from "./screens/Welcome";
import TypingTest from "./screens/TypingTest";
const Router = ()=>{
    return(
    <BrowserRouter>
    <Routes>
      <Route Component={WelcomeScreen} path="/"/>
      <Route Component={TypingTest} path="/typing-test"/>
      <Route Component={Home} path="/results"/>
    </Routes>
  </BrowserRouter>
    )
}

export default Router;