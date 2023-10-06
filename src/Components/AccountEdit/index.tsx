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

  const [account, setAccount] = useState<Account>({ AccountId: null, Name: "emepty" });

  const changeState = (e: any) => {
    console.log(e);
    setAccount({ ...account, Name: e.target.value } as Account);
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
      Name: <input value={account?.Name || "empty"} onChange={changeState}></input>
      <br />
      <button onClick={add}>Add</button>
    </div>
  );
}
