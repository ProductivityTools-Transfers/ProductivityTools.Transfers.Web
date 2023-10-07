import React, { useEffect, useState } from "react";
import * as api from "./Services/apiService";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

import logo from "./logo.svg";
import "./App.css";
import { TransfersTable } from "./Components/TransfersTable";
import { AccountList } from "./Components/AccountList";
import { AccountEdit } from "./Components/AccountEdit";
import { Home } from "./Components/Home";
import { TransferEdit } from "./Components/TransferEdit";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/AccountList" element={<AccountList />} />
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/AccountEdit" element={<AccountEdit />} />
          <Route path="/TransferEdit" element={<TransferEdit />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
