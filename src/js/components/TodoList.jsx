import React, { useState, useEffect } from "react";

const TodoList = () => {
  const urlAPI = "https://playground.4geeks.com/todo/";
  const [task, setTask] = useState("");
  const [tasksArray, setTasksArray] = useState([]);
  const [userData, setUserData] = useState({
    name: "alexacano",
    id: "",
    todos: {
      label: "",
      isDone: false,
    },
  });

  async function createUser() {
    try {
      const response = await fetch(`${urlAPI}users/${userData.name}`, {
        method: "POST",
        // body: JSON.stringify({ name: userData.name }),
        headers: {
          "Content-type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("No se pudo crear el usaurio");
      }
      const data = await response.json();
      getUserInfo();
    } catch (e) {
      console.log(e);
    }
  }

  async function deleteUser(name) {
    try {
      const response = await fetch(`${urlAPI}users/${name}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("No se pudo borrar el usario ");
      }
      // setUserData.name("");
      getUserInfo();
    } catch (e) {
      console.log(e);
    }
  }

  async function getUserInfo() {
    try {
      const response = await fetch(`${urlAPI}users/${userData.name}`);
      if (response.status === 404) {
        createUser();
        return;
      }
      const data = await response.json();
      setUserData(data);
      console.log(data);
      setTasksArray(data.todos);
    } catch (e) {
      console.log(e);
    }
  }

  async function createTask(event) {
    if (event.key != "Enter") return;
    event.target.value = "";
    try {
      const response = await fetch(`${urlAPI}todos/${userData.name}`, {
        method: "POST",
        body: JSON.stringify({
          label: task,
          is_done: false,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("No se pudo crear la tarea");
      }
      const data = await response.json();
      getUserInfo();
      setTask("");
    } catch (e) {
      console.log(e);
    }
  }

  async function eraseTask(id) {
    try {
      const response = await fetch(
        `https://playground.4geeks.com/todo/todos/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("No se pudo borrar la tarea");
      }
      const eraseTask = tasksArray.filter((task, index) => index !== id);
      setTasksArray(eraseTask);
      getUserInfo();
    } catch (e) {
      console.log(e);
    }
  }

  function handleChange(event) {
    setUserData({ ...userData, name: event.target.value });
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className="container-flex align-items-center">
      <div className="pt-2 fs-1 text-secondary">todos</div>
      <div className="card mt-3 mx-auto p-1" style={{ width: "30rem" }}>
        <input
          className="form-control"
          type="text"
          placeholder="Username"
          name="name"
          value={userData.name}
          onChange={(event) => handleChange(event)}
        ></input>
        <div className="d-flex justify-content-between px-3 my-2 bg-white">
          <button
            type="button"
            className="btn btn-outline-primary btn-sm border-0"
            onClick={() => createUser()}
          >
            Create user
          </button>
          <button
            type="button"
            className="btn btn-outline-danger btn-sm border-0 "
            onClick={() => deleteUser(userData.name)}
          >
            Delete user
          </button>
        </div>

        <input
          className="form-control"
          type="text"
          placeholder="What's next?"
          onKeyDown={(event) => createTask(event)}
          onChange={(event) => setTask(event.target.value)}
          value={task}
        />
        <ul className="list-group d-flex justify-content-around my-1">
          {tasksArray.map((task, id) => {
            return (
              <li
                className="list-group-item d-flex justify-content-between px-3 tarea"
                key={`task-${id}`}
              >
                {task.label}
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm border-0 hide"
                  onClick={() => eraseTask(task.id)}
                >
                  x
                </button>
              </li>
            );
          })}
          <div className="my-1" key={"items-left"}>
            {tasksArray.length > 0
              ? `${tasksArray.length} items left`
              : "No tasks left"}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
