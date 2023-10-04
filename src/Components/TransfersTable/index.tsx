import React, { useState, useEffect, useContext } from "react";
import * as api from '../../Services/apiService' 

export function TransfersTable() {
  useEffect(() => {
    const fetchData = async () => {
      const data = await api.echo();
      const data2 = await api.getTransfers();
    };
    fetchData();
    api.getTransfers();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Source</th>
          <th>TransferDay</th>
          <th>Value</th>
          <th>Target</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
        </tr>
      </tbody>
    </table>
  );
}
