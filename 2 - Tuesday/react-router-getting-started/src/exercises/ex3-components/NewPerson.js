import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

function NewPerson(props) {
  const [person, setPerson] = useState(props.nextPerson);

  const savePerson = (evt) => {
    if (person.name === "") {
      return;
    }
    props.addPerson(person);
    evt.preventDefault();
    if (person.hasOwnProperty("exists")) {
      person.id = "";
      person.name = "";
      delete person.exists;
    }
  };

  useEffect(() => setPerson({ ...props.nextPerson }), [props.nextPerson]);

  const onChange = (evt) => {
    const val = evt.target.value;
    person.name = val;
    setPerson({ ...person });
  };

  const title = person.id === "" ? "Add new person" : "Edit person";
  const btn = person.id === "" ? "Add" : "Edit";

  return (
    <div>
      <h4>{title}</h4>
      <form>
        <input value={person.name || ""} onChange={onChange} />
        <button onClick={savePerson} style={{ marginLeft: "2px" }}>
          {btn}
        </button>
      </form>
    </div>
  );
}

export default NewPerson;

NewPerson.propTypes = {
  nextPerson: PropTypes.object,
  addPerson: PropTypes.func,
};
