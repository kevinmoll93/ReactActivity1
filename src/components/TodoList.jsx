import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import List from "./List";
import Form from "./ToDoForm";
import Alert from 'react-bootstrap/Alert';

export const ToDoList = () => {
  const [todo, setTodo] = useState({
    puesto: "",
    empresa: "",
    ciudad: "",
    pais: "",
  });
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(false);

  const { puesto, empresa, ciudad, pais } = todo;

  const updateState = (e) => {
    setTodo({
      ...todo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      puesto.trim() === "" ||
      empresa.trim() === "" ||
      ciudad.trim() === "" ||
      pais.trim() === ""
    ) {
      setError(true);
      return;
    }
    setError(false);
    setTodos([
      ...todos,
      {
        id: uuidv4(),
        puesto,
        empresa,
        ciudad,
        pais,
      },
    ]);
    setTodo({
      puesto: "",
      empresa: "",
      ciudad: "",
      pais: "",
    });
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="row">
      <div className="col-6">
        {error && (
          <Alert variant="danger">
          <Alert.Heading>Error</Alert.Heading>
          <p>
            Necesitas completar todos los campos
          </p>
        </Alert>
        )}
        <Form
          handleSubmit={handleSubmit}
          updateState={updateState}
          puesto={puesto}
          empresa={empresa}
          ciudad={ciudad}
          pais={pais}
        />
      </div>
      <div className="col-6">
        { todos.map((td) => ( 
          <List td={td} handleDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};
