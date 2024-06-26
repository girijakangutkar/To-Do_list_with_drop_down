import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
const SECTIONS = ["Backlog", "Doing", "Done", "Won't Do"];

function TodoApp() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    const parsedTasks = savedTasks ? JSON.parse(savedTasks) : {};
    return {
      Backlog: [],
      Doing: [],
      Done: [],
      "Won't Do": [],
      ...parsedTasks,
    };
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const newTask = { id: Date.now().toString(), title, description };
    setTasks((prev) => ({
      ...prev,
      Backlog: [...prev.Backlog, newTask],
    }));
    setTitle("");
    setDescription("");
  };

  const moveTask = (taskId, fromSection, toSection) => {
    setTasks((prev) => {
      const newTasks = { ...prev };
      const taskIndex = newTasks[fromSection].findIndex(
        (task) => task.id === taskId
      );
      if (taskIndex !== -1) {
        const [movedTask] = newTasks[fromSection].splice(taskIndex, 1);
        newTasks[toSection].push(movedTask);
      }
      return newTasks;
    });
  };

  const deleteTask = (taskId, section) => {
    setTasks((prev) => {
      const newTasks = { ...prev };
      newTasks[section] = newTasks[section].filter(
        (task) => task.id !== taskId
      );
      return newTasks;
    });
  };

  return (
    // <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
    <div>
      <div
        style={{
          display: "flex",
          marginBottom: "20px",
          flexDirection: "row",
          gap: "2px",
        }}
      >
        <li id="text">
          <h1>Kanban Board</h1>
          <p>A place to organise tasks to completion.</p>
        </li>
        <li id="det">
          <form id="fom" onSubmit={handleSubmit}>
            <div style={{ display: "flex" }}>
              <div>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title..."
                  required
                />
                <br></br>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description..."
                />
              </div>
              <div>
                <button type="submit">Submit</button>
              </div>
            </div>
          </form>
        </li>
      </div>
      {/* <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <button type="submit">Add Todo</button>
      </form> */}

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {SECTIONS.map((section) => (
          <div id="sec" key={section} style={{ flex: 1, margin: "0 10px" }}>
            <h2>{section}</h2>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {(tasks[section] || []).map((task) => (
                <li id="tsk" key={task.id}>
                  <h3 id="tle">
                    {task.title}
                    <select
                      value={section}
                      onChange={(e) =>
                        moveTask(task.id, section, e.target.value)
                      }
                    >
                      {SECTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </h3>
                  <p id="des">
                    {task.description}
                    <button
                      id="del"
                      onClick={() => deleteTask(task.id, section)}
                    >
                      <MdDelete style={{ color: "#f95f5f" }} />
                    </button>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* {SECTIONS.map((section) => (
          <div id="sec" key={section} style={{ flex: 1, margin: "0 10px" }}>
            <h2>{section}</h2>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {(tasks[section] || []).map((task) => (
                <li
                  key={task.id}
                  // style={{
                  //   border: "1px solid #ccc",
                  //   padding: "10px",
                  //   marginBottom: "10px",
                  // }}
                >
                  <h3 id="tle">{task.title}</h3>
                  <p id="des">{task.description}</p>
                  <select
                    value={section}
                    onChange={(e) => moveTask(task.id, section, e.target.value)}
                  >
                    {SECTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </li>
              ))}
            </ul>
          </div>
        ))} */}
      </div>
    </div>
  );
}

export default TodoApp;
