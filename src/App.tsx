import React, { useEffect, useState } from "react";
import * as api from "./Services/apiService";

import logo from "./logo.svg";
import "./App.css";
import { TransfersTable } from "./Components/TransfersTable";
import { AccountList } from "./Components/AccountList";

function App() {
  const [hello, setHello] = useState("nothing received");

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.echo();
      setHello(data);
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <span>hello:{hello}</span>
      <TransfersTable />
      <AccountList />
    </div>
  );
}

export default App;
