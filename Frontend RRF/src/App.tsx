import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  return (
    <>
   
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Login />} />
          <Route path="/home" element={ <Home />} />
          <Route path="/Register" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;