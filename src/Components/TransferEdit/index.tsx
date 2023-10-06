import React, { useState, useEffect, useContext, Dispatch } from "react";
import * as api from "../../Services/apiService";
import Account from "../../Objects/Account";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Transfer from "../../Objects/Transfer";

export function TransferEdit() {
  let navigate = useNavigate();

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const data = await api.echo();
  //       const data2 = await api.getTransfers();
  //     };
  //     fetchData();
  //     api.getTransfers();
  //   }, []);

  const [transfer, setTransfer] = useState<Transfer | null>({
    transferId: null,
    pillow: 33,
    sourceId: null,
    source: null,
    target: null,
    targetId: null,
    value: null,
  });

  const changeState = (e: any) => {
    console.log(e);
    console.log(e.target.name);
    console.log(e.target.value);
    setTransfer({ ...transfer, [e.target.name]: e.target.value } as Transfer);
  };

  const add = async () => {
    console.log("add account");
    if (transfer != null) {
      var data = await api.addTransfer(transfer);
      console.log(data);
      navigate("/Home");
    }
  };
  return (
    <div>
      transferId: <input value={transfer?.transferId || "empty"} onChange={changeState}></input>
      <br />
      pillow: <input name="pillow" value={transfer?.pillow || "empty"} onChange={changeState}></input>
      <br />
      sourceId: <input name="sourceId" value={transfer?.sourceId || "empty"} onChange={changeState}></input>
      <br />
      Source: <input name="sourceId" value={transfer?.sourceId || "empty"} onChange={changeState}></input>
      <br />
      targetid: <input name="targetId" value={transfer?.targetId || "empty"} onChange={changeState}></input>
      <br />
      target: <input name="targetId" value={transfer?.targetId || "empty"} onChange={changeState}></input>
      <br />
      value: <input name="value" value={transfer?.value || "empty"} onChange={changeState}></input>
      <br />
      <br />
      <button onClick={add}>Add</button>
      <div>
        transferId: {transfer?.transferId} <br />
        pillow: {transfer?.pillow}
        <br />
        sourceId: {transfer?.sourceId}
        <br />
        Source: {transfer?.sourceId}
        <br />
        targetid: {transfer?.targetId}
        <br />
        target: {transfer?.targetId}
        <br />
        value: {transfer?.value}
        <br />
      </div>
    </div>
  );
}
