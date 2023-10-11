import React, { useState, useEffect, useContext } from "react";
import * as api from "../../Services/apiService";
import Transfer from "../../Objects/Transfer";
import { Link } from "react-router-dom";

export function TransfersTable({
  transferList,
  drillDown,
}: {
  transferList: Transfer[] | undefined;
  drillDown: (arg: number | null) => void;
}) {
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
          <th>Child transfers</th>
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
              <td>
                <button onClick={() => drillDown(x.targetId)}>{x.childTransfers}</button>
              </td>
            </tr>
          );
        })}
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td>
            {transferList?.reduce((accumualtor: number, object: Transfer) => {
              return accumualtor + object.value;
            }, 0)}
          </td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  );
}
