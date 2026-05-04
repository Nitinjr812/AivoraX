import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import "./App.css";
import Auth from "./pages/Auth";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Auth" element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
