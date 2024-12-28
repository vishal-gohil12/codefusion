import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import CodeEditor from "./pages/CodeEditor";

export default function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/project/:name" element={<CodeEditor />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}
