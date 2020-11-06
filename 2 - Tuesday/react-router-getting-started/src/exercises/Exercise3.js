import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import PersonList from "./ex3-components/PersonList";
import NewPerson from "./ex3-components/NewPerson";
import uuid from "uuid/dist/v1";

function Persons() {
  const initialData = [
    { id: uuid(), name: "Peter" },
    { id: uuid(), name: "Ole" },
    { id: uuid(), name: "Jan" },
  ];
  const [persons, setPersons] = useState(initialData);
  const [newPerson, setNewPerson] = useState({ id: "", name: "" });

  const addPerson = (person) => {
    if (person.id === "") {
      person.id = uuid();
      persons.push(person);
      setNewPerson({ id: "", name: "" });
    } else {
      let personToEdit = persons.find((p) => p.id == person.id);
      personToEdit.name = person.name;
      personToEdit["exists"] = true;
      setNewPerson(personToEdit);
    }
    setPersons([...persons]);
  };

  const deletePerson = (id) => {
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].id === id) {
        persons.splice(i, 1);
        setPersons([...persons]);
      }
    }
  };
  
  return (
    <div className="container outer">
      <h2 style={{ textAlign: "center", marginBottom: 25 }}>State Lift Demo</h2>
      <h2>Total persons: {persons.length}</h2>
      <div className="row">
        <div className="col-6 allPersons">
          <PersonList
            persons={persons}
            deletePerson={deletePerson}
            addPerson={addPerson}
          />
        </div>
        <div className="col-5 new-person">
          <NewPerson addPerson={addPerson} nextPerson={newPerson} />
        </div>
      </div>
    </div>
  );
}

export default Persons;