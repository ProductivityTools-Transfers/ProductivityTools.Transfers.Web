import React, { useState, useEffect, useContext } from "react";
import * as api from "../../Services/apiService";
import Transfer from "../../Objects/Transfer";
import { Link } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


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

  const [checkedMap, setCheckedMap] = useState<{ [key: number]: boolean }>({});

  const toggleCheckbox = (transferId: number | null) => {
    if (transferId == null) return;
    setCheckedMap((prev) => ({
      ...prev,
      [transferId]: !(prev[transferId] ?? true),
    }));
  };

  const isChecked = (transfer: Transfer) => {
    if (transfer.transferId == null) return true;
    return checkedMap[transfer.transferId] ?? true;
  };

  const allChecked =
    transferList != null &&
    transferList.length > 0 &&
    transferList.every((x) => isChecked(x));

  const toggleAll = () => {
    const nextState = !allChecked;
    const newCheckedMap: { [key: number]: boolean } = {};
    transferList?.forEach((x) => {
      if (x.transferId != null) {
        newCheckedMap[x.transferId] = nextState;
      }
    });
    setCheckedMap(newCheckedMap);
  };

  const transferDelete = (transferId: number) => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            alert('Click Yes')
            api.transferDelete(transferId)
          }
        },
        {
          label: 'No',
          onClick: () => alert('Click No')
        }
      ]
    });
  }

  const getPillow = (transfer: Transfer) => {
    if (transfer.target !=undefined && transfer.target.pillow !=undefined) {
      return (
        <label title="Pillow">
           <span>({transfer.target?.pillow}</span>)
      </label>
      )
      return ;
    }
    else {
      return "";
    }
  }

  return (
    <table className="pw">
      <thead>
        <tr>
          <th style={{ width: "40px" }}>
            <input
              type="checkbox"
              checked={allChecked}
              onChange={toggleAll}
            />
          </th>
          <th style={{ width: "100px" }}>TransferId</th>
          <th style={{ width: "200px" }}>Source</th>
          <th style={{ width: "250px" }}>Target</th>
          <th style={{ width: "200px" }}>TargetTag</th>
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
              <td>
                <input
                  type="checkbox"
                  checked={isChecked(x)}
                  onChange={() => toggleCheckbox(x.transferId)}
                />
              </td>
              <td>{x.transferId}</td>
              <td>{x.source?.name} {x.sourceId}</td>
              <td>{x.target?.name} {getPillow(x)}</td>
              <td>{x.targetTag}</td>
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
                <button onClick={() => transferDelete(x?.transferId ?? 0)}>Delete</button>
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
          <td></td>
          <td></td>
          <td className="right">
            {transferList
              ?.filter((x) => isChecked(x))
              .reduce((accumualtor: number, object: Transfer) => {
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
    </table >
  );
}
