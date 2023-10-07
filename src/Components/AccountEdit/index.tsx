import React, { useState, useEffect, useContext, Dispatch } from "react";
import * as api from "../../Services/apiService";
import Account from "../../Objects/Account";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function AccountEdit() {
  let navigate = useNavigate();

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const data = await api.echo();
  //       const data2 = await api.getTransfers();
  //     };
  //     fetchData();
  //     api.getTransfers();
  //   }, []);

  const [account, setAccount] = useState<Account>({
    accountId: null,
    name: "emepty",
    pillow: 0,
    type: null,
    number: null,
    transfers: null,
  });

  const changeState = (e: any) => {
    console.log(e);
    setAccount({ ...account, [e.target.name]: e.target.value } as Account);
  };

  const add = async () => {
    console.log("add account");
    if (account != null) {
      var data = await api.addAccount(account);
      console.log(data);
      navigate("/AccountList");
    }
  };
  return (
    <div>
      Name: <input name="name" value={account?.name || "empty"} onChange={changeState}></input>
      <br />
      Pillow: <input name="pillow" value={account?.pillow || "empty"} onChange={changeState}></input>
      <br />
      Type: <input name="type" value={account?.type || "empty"} onChange={changeState}></input>
      <br />
      Number: <input name="number" value={account?.number || "empty"} onChange={changeState}></input>
      <br />
      <br />
      <button onClick={add}>Add</button>
    </div>
  );
}
