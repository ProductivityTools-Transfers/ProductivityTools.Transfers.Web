import React, { useState, useEffect, useContext } from "react";
import * as api from "../../Services/apiService";

interface Account {
  AccountId: number;
  Name: string;
}

export function AccountList() {
  const [accountList, setAccountList] = useState<Account[]>();
  useEffect(() => {
    const fetchData = async () => {
      const data2 = await api.getAccounts();
      setAccountList(data2);
    };
    fetchData();
    api.getTransfers();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>AccountId</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {accountList?.map((x) => (
          <tr>
            <td>{x.AccountId}</td>
            <td>{x.Name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
