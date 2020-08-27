import React from "react";
import "./Table.css";

export default function Table({ countriess }) {
  console.log("abhisheky", countriess);
  return (
    <div className="table">
      <tr>
        <th>Country</th>
        <th>Total Cases</th>
      </tr>
      {countriess.map(({ country, cases }) => (
        <tr>
          <td>
            <strong>{country}</strong>
          </td>
          <td>
            <strong>{cases}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}
