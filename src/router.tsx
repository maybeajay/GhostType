import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App";
import Home from "./screens/Results"
import WelcomeScreen from "./screens/Welcome";
const Router = ()=>{
    return(
    <BrowserRouter>
    <Routes>
      <Route Component={WelcomeScreen} path="/"/>
      <Route Component={App} path="/typing-test"/>
      <Route Component={Home} path="/results"/>
    </Routes>
  </BrowserRouter>
    )
}

export default Router;