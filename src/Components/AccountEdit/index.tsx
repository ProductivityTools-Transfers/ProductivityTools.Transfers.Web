import React, { useState, useEffect, useContext, Dispatch } from "react";
import * as api from "../../Services/apiService";
import Account from "../Objects/Account";

export function AccountEdit() {
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const data = await api.echo();
  //       const data2 = await api.getTransfers();
  //     };
  //     fetchData();
  //     api.getTransfers();
  //   }, []);

  const [account, setAccount] = useState<Account | null>(null);

  const changeState = (e: any) => {
    console.log(e);
    setAccount({ ...account, Name: e.target.value } as Account);
  };

  return (
    <div>
      Name: <input value={account?.Name || "empty"} onChange={changeState}></input>
      <br />
    </div>
  );
}
