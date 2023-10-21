import React, { useState, useEffect, useContext } from "react";
import * as api from "../../Services/apiService";
import Transfer from "../../Objects/Transfer";
import { Link } from "react-router-dom";

export function TransfersTable({
  sourceId,
  transferList,
  drillDown,
  clearChilds,
}: {
  sourceId: number | null;
  transferList: Transfer[] | undefined;
  drillDown: (arg: number | null) => void;
  clearChilds: (arg: number | null) => void;
}) {
  console.log("key");
  console.log(sourceId);

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
              <td>{x.source?.name} {x.sourceId}</td>
              <td>{x.target?.name}</td>
              <td className="right">
                {x.valueComment ? (
                  <label title={x.valueComment}>
                    <img height="15px" src="icons/i.png"></img>
                  </label>
                ) : (
                  <span></span>
                )}{" "}
                {x.value.toFixed(2)}
              </td>
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
          <td className="right">
            {transferList
              ?.reduce((accumualtor: number, object: Transfer) => {
                return accumualtor + object.value;
              }, 0)
              .toFixed(2)}
          </td>
          <td></td>
          <td></td>
          <td>
            <button onClick={() => clearChilds(sourceId)}>Clear childs</button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
