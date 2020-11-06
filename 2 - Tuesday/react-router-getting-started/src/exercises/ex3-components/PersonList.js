import React from "react";
import PropTypes from "prop-types";

function PersonList(props) {
  const { persons } = props;

  function doDelete(event) {
    event.preventDefault();
    let deleteId = event.target.id;
    let actualId = deleteId.substring(1);
    props.deletePerson(actualId);
  }

  function doEdit(event) {
    event.preventDefault();
    let editId = event.target.id;
    let actualId = editId.substring(1);
    let person = persons.find((p) => p.id == actualId);
    props.addPerson(person);
  }

  return (
    <React.Fragment>
      <h2>All persons</h2>
      <br />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th></th>
            <th></th>
          </tr>
          {persons.map((person) => (
            <tr key={person.id}>
              <td>{person.id}</td>
              <td>{person.name}</td>
              <td></td>
              <td>
                <a href="/#" id={"d" + person.id} onClick={doDelete}>
                  delete
                </a>{" "}
                /{" "}
                <a href="/#" id={"e" + person.id} onClick={doEdit}>
                  edit
                </a>
              </td>
            </tr>
          ))}
        </thead>
      </table>
    </React.Fragment>
  );
}
export default PersonList;

PersonList.propTypes = {
  persons: PropTypes.array,
};