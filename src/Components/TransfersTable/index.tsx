import React, { useState, useEffect, useContext } from "react";
import * as api from "../../Services/apiService";
import Transfer from "../../Objects/Transfer";
import { Link } from "react-router-dom";

export function TransfersTable({
  transferList,
  drillDown,
  clearChilds,
}: {
  transferList: Transfer[] | undefined;
  drillDown: (arg: number | null) => void;
  clearChilds: (arg: number | null) => void;
}) {
  return (
    <table className="pw">
      <thead>
        <tr>
          <th style={{ width: "100px" }}>TransferId</th>
          <th style={{ width: "200px" }}>Source</th>
          <th style={{ width: "200px" }}>Target</th>
          <th style={{ width: "100px" }}>Value</th>
          <th style={{ width: "100px" }}>TransferDay</th>
          <th style={{ width: "100px" }}>Action</th>
          <th style={{ width: "200px" }}>Child transfers</th>
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
          <td>
            {/* <button onClick={() => clearChilds(1)}>Clear childs</button> */}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
