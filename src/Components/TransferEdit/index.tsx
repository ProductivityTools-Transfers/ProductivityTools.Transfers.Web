import React, { useState, useEffect, useContext, Dispatch } from "react";
import * as api from "../../Services/apiService";
import Account from "../../Objects/Account";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Transfer from "../../Objects/Transfer";

export function TransferEdit() {
  let navigate = useNavigate();

  const [accountList, setAccountList] = useState<Account[]>();
  useEffect(() => {
    const fetchData = async () => {
      const data2 = await api.getAccounts();
      console.log(data2);
      setAccountList(data2);
    };
    fetchData();
  }, []);

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
      transferId:<span>{transfer?.transferId || ""}</span>
      <br />
      Source:
      <select name="sourceId" id="sourceId" value={String(transfer?.sourceId)} onChange={changeState}>
        {accountList?.map((x) => {
          return (
            <option key={x.accountId} value={String(x.accountId)}>
              {x.name}
            </option>
          );
        })}
      </select>
      <br />
      Target:
      <select name="targetId" id="targetId" value={String(transfer?.targetId)} onChange={changeState}>
        {accountList?.map((x) => {
          return (
            <option key={x.accountId} value={String(x.accountId)}>
              {x.name}
            </option>
          );
        })}
      </select>
      targetid: <input name="targetId" value={transfer?.targetId || ""} onChange={changeState}></input>
      <br />
      target: <input name="targetId" value={transfer?.targetId || ""} onChange={changeState}></input>
      <br />
      value: <input name="value" value={transfer?.value || ""} onChange={changeState}></input>
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
