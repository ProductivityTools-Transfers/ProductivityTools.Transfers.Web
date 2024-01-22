import React, { useState, useEffect, useContext, Dispatch } from "react";
import * as api from "../../Services/apiService";
import Account from "../../Objects/Account";
import { Navigate } from "react-router-dom";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import useQuery from "../../Tools/NavigationExtensions";

import Transfer from "../../Objects/Transfer";

export function TransferEdit() {
  let navigate = useNavigate();
  let query = useQuery();

  const [accountList, setAccountList] = useState<Account[]>();
  useEffect(() => {
    const fetchAccounts = async () => {
      const data2 = await api.getAccounts();
      setAccountList(data2);
    };

    const fetchTransfer = async () => {
      const data2 = await api.getTransfer(Number(query.get("transferId")));
      console.log(data2);
      setTransfer(data2 as Transfer);
    };

    fetchAccounts();
    if (query.get("transferId") != "") {
      fetchTransfer();
    } else {
      if (accountList != undefined) {
        setTransfer({ ...transfer, sourceId: accountList[0].accountId } as Transfer);
      }
    }
  }, []);

  const [transfer, setTransfer] = useState<Transfer | null>({
    transferId: null,
    sourceId: null,
    source: null,
    target: null,
    targetId: null,
    targetTag: null,
    value: 0,
    transferDay: null,
    childTransfers: 0,
    valueComment: null
  });

  const changeState = (e: any) => {
    // console.log(e);
    // console.log(e.target.name);
    // console.log(e.target.value);
    setTransfer({ ...transfer, [e.target.name]: e.target.value } as Transfer);
  };

  const changeNumberState = (e: any) => {
    console.log(e);
    console.log(e.target.name);
    console.log(e.target.value);
    setTransfer({ ...transfer, [e.target.name]: Number(e.target.value) } as Transfer);
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
      <Link to="/Home">Home</Link>
      <br></br>
      transferId:<span>{transfer?.transferId || ""}</span>
      <br />
      Source:
      <select name="sourceId" id="sourceId" value={String(transfer?.sourceId)} onChange={changeNumberState}>
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
      <select name="targetId" id="targetId" value={String(transfer?.targetId)} onChange={changeNumberState}>
        {accountList?.map((x) => {
          return (
            <option key={x.accountId} value={String(x.accountId)}>
              {x.name}
            </option>
          );
        })}
      </select>{" "}
      <br />
      Target tag: <input name="targetTag" value={transfer?.targetTag || ""} onChange={changeState}></input>

      <br />
      Value: <input name="value" value={transfer?.value || ""} onChange={changeState}></input>
      <br />
      Transfer day: <input name="transferDay" value={transfer?.transferDay || ""} onChange={changeNumberState}></input>
      <br />
      Value comment: <input name="valueComment" value={transfer?.valueComment || ""} onChange={changeState}></input>
      <br />
      <br />
      <button onClick={add}>Add or update</button>
      <div>
        transferId: {transfer?.transferId} <br />
        <br />
        sourceId: {transfer?.sourceId}
        <br />
        Source: {transfer?.sourceId}
        <br />
        targetid: {transfer?.targetId}
        <br />
        target: {transfer?.targetId}
        <br />
        target: {transfer?.targetTag}
        <br />
        value: {transfer?.value}
        <br />
        transferDay: {transfer?.transferDay}
        <br />
      </div>
    </div>
  );
}
