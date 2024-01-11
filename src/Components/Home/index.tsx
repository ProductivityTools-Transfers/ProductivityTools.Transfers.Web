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
import { debug, log } from "console";

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
      console.log("Home useEffect", data2);
      if (data2) {
        console.log("entered ifs", data2)
        const tg = {} as TransferGroup;
        tg.sourceId = data2[0].sourceId;
        tg.group = data2;
        console.log(tg);
        setTransferList([tg]);
      }
    };

    let token = localStorage.getItem("token");
    console.log("Home.tsx");
    console.log(token);
    if (token) {
      fetchData();
    } else {
      navigate("/Login");
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
    console.log("transfer list");
    console.log(transferList);
  };

  const removeFromTransferList = (sourceId: number | null, elementsToRemove: number[]) => {
    transferList.forEach((x) => {
      if (x.sourceId == sourceId) {
        console.log("removing", sourceId);
        console.log(transferList);
        elementsToRemove.push(x.sourceId as number);
      }
    });
  };

  const clearChildsRecurse = (sourceId: number | null, elementsToRemove: number[]) => {
    console.log(transferList);
    console.log(sourceId);
    transferList.forEach((table) => {
      if (table.sourceId == sourceId) {
        table.group.forEach((transfer) => {
          console.log("toremove");
          console.log(transfer.targetId);
          clearChildsRecurse(transfer.targetId, elementsToRemove);
          removeFromTransferList(transfer.targetId, elementsToRemove);
        });
      }
    });
  };

  const clearChilds = (sourceId: number | null) => {
    let elementsToRemove = [] as number[];
    clearChildsRecurse(sourceId, elementsToRemove);
    console.log("elementsToRemove", elementsToRemove);
    setTransferList(transferList.filter((item) => !elementsToRemove.includes(item.sourceId as number)));
  };

  const buttonLogout = (e: any) => {
    logout();
    console.log("Logged out");
    navigate("/Login");
  };

  return (
    <div className="App">
      <span>hello:{hello}</span>
      <br></br>
      <Link to="/AccountList">AccountList</Link>
      <Link to="/TransferEdit">AddTransfer</Link>
      <Link to="/TransfersHistoryTable">TransfersHistoryTable</Link>
      <button onClick={buttonLogout}>logout</button>
      {transferList?.map((x) => {
        console.log("map transfer list");
        console.log(x.sourceId);
        return (
          <TransfersTable
            key={x.sourceId}
            sourceId={x.sourceId}
            transferList={x.group}
            drillDown={drillDown}
            clearChilds={clearChilds}
          />
        );
      })}
    </div>
  );
}
