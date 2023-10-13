
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import React, { useState, useEffect } from "react";
// import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import DataTable from "./components/DataTable";
import Auth from "./auth/Auth"
// import DataTable from "./components/DataTable"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const isLoggedInFromStorage = localStorage.getItem("isLoggedIn");

    if (isLoggedInFromStorage === "true") {
      setIsLoggedIn(true);
    }
  }, []);
  if (isLoggedIn) {
    return <DataTable />;
  } else {
    return <Auth />;
  }
  // return (
  //   <BrowserRouter>
  //     <Routes>
  //       <Route path="/" element={<Auth />} />
  //       {/* <Route path="/contacts" element={<DataTable />} /> */}
  //     </Routes>
  //   </BrowserRouter>
  // )
}

export default App