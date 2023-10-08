import React, { useState, useEffect, useContext } from "react";
import * as api from "../../Services/apiService";
import Transfer from "../../Objects/Transfer";
import { Link } from "react-router-dom";

export function TransfersTable() {
  const [transferList, setTransferList] = useState<Transfer[]>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.echo();
      const data2 = await api.getTransfers();
      console.log(data2);
      setTransferList(data2);
    };
    fetchData();
    api.getTransfers();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>TransferId</th>
          <th>Source</th>
          <th>Target</th>
          <th>Value</th>
          <th>TransferDay</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {transferList?.map((x) => {
          return (
            <tr key={x.transferId}>
              <td>{x.transferId}</td>
              <td>{x.source?.name}</td>
              <td>{x.target?.name}</td>
              <td>{x.value}</td>
              <td>{x.transferDay}</td>
              <td>
                <Link
                  to={{
                    pathname: "/TransferEdit",
                    search: "?transferId=" + x.transferId,
                  }}
                >
                  Edit
                </Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
