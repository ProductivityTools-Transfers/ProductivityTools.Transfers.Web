import React, { useEffect, useState } from "react";
import * as api from "../../Services/apiService";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

import { TransfersTable } from "../TransfersTable";
import { AccountList } from "../AccountList";
import TransferGroup from "../../Objects/TransferGroup";
import { AccountEdit } from "../AccountEdit";
import { logout } from "../../Session/firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Session/AuthContext";
import { log } from "console";

export function Home() {
  let navigate = useNavigate();
  const [hello, setHello] = useState("nothing received");

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.echo();
      setHello(data);
    };
    fetchData();
  }, []);

  const [transferList, setTransferList] = useState<TransferGroup[]>([]);
  const auth = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.echo();
      const data2 = await api.getTransfers(null);
      console.log(data2);
      const tg = {} as TransferGroup;
      tg.sourceId = data2[0].sourceId;
      tg.group = data2;
      console.log(tg);
      setTransferList([tg]);
    };
  
    let token = localStorage.getItem('token');
    console.log("Home.tsx")
    console.log(token);
    if (token) {
      fetchData();
    }
  }, []);

  const drillDown = async (targetId: number | null) => {
    console.log("drilldown");
    console.log(String(targetId));
    const data2 = await api.getTransfers(targetId);
    const tg = {} as TransferGroup;
    tg.group = data2;
    tg.sourceId = targetId;
    console.log(tg);
    setTransferList((current) => [...current, tg]);
  };

  const clearChilds = (x: number | null) => {
    console.log(transferList);
  };

  const buttonLogout = (e: any) => {
    logout();
    console.log("Logged out");
    navigate("/Login")
  };

  return (
    <div className="App">
      <span>hello:{hello}</span>
      <br></br>
      <Link to="/AccountList">AccountList</Link> <Link to="/TransferEdit">AddTransfer</Link>
      <button onClick={buttonLogout}>logout</button>
      {transferList?.map((x) => {
        return (
          <TransfersTable key={x.sourceId} transferList={x.group} drillDown={drillDown} clearChilds={clearChilds} />
        );
      })}
    </div>
  );
}
