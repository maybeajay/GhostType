import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App";
import Home from "./screens/Home"
const Router = ()=>{
    return(
    <BrowserRouter>
    <Routes>
      <Route Component={App} path="/"/>
      <Route Component={Home} path="/home"/>
    </Routes>
  </BrowserRouter>
    )
}

export default Router;