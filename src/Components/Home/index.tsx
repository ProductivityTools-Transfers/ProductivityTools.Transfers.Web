import React, { useEffect, useState } from "react";
import * as api from "../../Services/apiService";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

import { TransfersTable } from "../TransfersTable";
import { AccountList } from "../AccountList";
import { AccountEdit } from "../AccountEdit";

export function Home() {
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
      {/* <AccountList /> */}
      <Link to="/AccountList">AccountList</Link>
      <Link to="/TransferEdit">AddTransfer</Link>
    </div>
  );
}

