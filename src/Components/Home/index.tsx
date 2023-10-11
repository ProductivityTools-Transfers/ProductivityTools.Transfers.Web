import React, { useEffect, useState } from "react";
import * as api from "../../Services/apiService";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

import { TransfersTable } from "../TransfersTable";
import { AccountList } from "../AccountList";
import TransferGroup from "../../Objects/TransferGroup";
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

  const [transferList, setTransferList] = useState<TransferGroup[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.echo();
      const data2 = await api.getTransfers(null);
      console.log(data2);
      const tg = {} as TransferGroup;
      tg.group=data2
      console.log(tg)
      setTransferList((current) => [...current, tg]);
    };
    fetchData();
  }, []);

  const drillDown = async (targetId: number | null) => {
    console.log("drilldown");
    console.log(String(targetId));
    const data2 = await api.getTransfers(targetId);
    const tg = {} as TransferGroup;
    tg.group=data2
    console.log(tg)
    setTransferList((current) => [...current, tg]);
  };

  return (
    <div className="App">
      <span>hello:{hello}</span>
      {transferList?.map((x) => {
        return <TransfersTable transferList={x.group} drillDown={drillDown} />;
      })}

      {/* <AccountList /> */}
      <Link to="/AccountList">AccountList</Link>
      <Link to="/TransferEdit">AddTransfer</Link>
    </div>
  );
}
