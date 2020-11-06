import React from "react";

const names = [
  { fname: "Anders", lname: "Henriksen" },
  { fname: "Britta", lname: "Albertsen" },
  { fname: "Kalle", lname: "Fredborg" },
];

function AddRows(props) {
  const { person } = props;
  return (
    <tr>
      <td>{person.fname}</td>
      <td>{person.lname}</td>
    </tr>
  );
}

function CreateNamesTable() {
  return (
    <table style={{ width: "20%" }}>
      <thead>
        <tr>
          <th>First name</th>
          <th>Last name</th>
        </tr>
      </thead>
      <tbody>
        {names.map((person) => (
          <AddRows person={person} />
        ))}
      </tbody>
    </table>
  );
}

export default CreateNamesTable;
