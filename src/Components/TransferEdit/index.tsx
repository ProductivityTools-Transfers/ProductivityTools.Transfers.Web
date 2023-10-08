import React, { useState, useEffect, useContext, Dispatch } from "react";
import * as api from "../../Services/apiService";
import Account from "../../Objects/Account";
import { Navigate } from "react-router-dom";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import Transfer from "../../Objects/Transfer";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export function TransferEdit() {
  let navigate = useNavigate();
  let query = useQuery();


  const [accountList, setAccountList] = useState<Account[]>();
  useEffect(() => {
    const fetchData = async () => {
      const data2 = await api.getAccounts();
      console.log(data2);
      setAccountList(data2);
      setTransfer({ ...transfer, sourceId: data2[0].accountId } as Transfer);
      setTransfer({ ...transfer, targetId: data2[0].accountId } as Transfer);
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("useeffect in query")
    console.log(query.get("transferId"));

  }, [query]);

  const [transfer, setTransfer] = useState<Transfer | null>({
    transferId: null,
    pillow: 0,
    sourceId: null,
    source: null,
    target: null,
    targetId: null,
    value: null,
    transferDay: null,
  });

  const changeState = (e: any) => {
    console.log(e);
    console.log(e.target.name);
    console.log(e.target.value);
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
      value: <input name="value" value={transfer?.value || ""} onChange={changeState}></input>
      <br />
      value: <input name="transferDay" value={transfer?.transferDay || ""} onChange={changeNumberState}></input>
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
        transferDay: {transfer?.transferDay}
        <br />
      </div>
    </div>
  );
}
