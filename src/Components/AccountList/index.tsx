import React, { useState, useEffect, useContext } from "react";
import * as api from "../../Services/apiService";
import { Link } from "react-router-dom";
import Account from "../../Objects/Account";

export function AccountList() {
  const [accountList, setAccountList] = useState<Account[]>();
  useEffect(() => {
    const fetchData = async () => {
      const data2 = await api.getAccounts();
      console.log(data2);
      setAccountList(data2);
    };
    fetchData();
  }, []);

  return (
    <>
      <span>Account list:</span>
      <Link to="/AccountEdit">Add New Account</Link>
      <Link to="/Home">Home</Link>

      <table>
        <thead>
          <tr>
            <th>AccountId</th>
            <th>Name</th>
            <th>Pillow</th>
            <th>Type</th>
            <th>Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {accountList?.map((x) => (
            <tr key={x.accountId}>
              <td>{x.accountId}</td>
              <td>{x.name}</td>
              <td>{x.pillow}</td>
              <td>{x.type}</td>
              <td>{x.number}</td>
              <td>
                {" "}
                <Link
                  to={{
                    pathname: "/AccountEdit",
                    search: "?accountId=" + x.accountId,
                  }}
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
