import React, { useState, useEffect } from "react";

function Todo() {
  const [widgets, setWidgets] = useState < string > [] > [];
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      try {
        return JSON.parse(savedTasks);
      } catch (error) {
        console.error("Error parsing tasks from localStorage:", error);
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    if (Array.isArray(tasks)) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = { title, description };
    setTasks((prevTasks) =>
      Array.isArray(prevTasks) ? [...prevTasks, newTask] : [newTask]
    );
    setTitle("");
    setDescription("");
  };

  // function handleOnDrag(e: React.DragEvent, widgetType:string){
  //   e.dataTransfer.setData("widgetType", widgetType)
  // }

  // function handleOnDrop(e: React.DragEvent){
  //   const widgetType = e.dataTransfer.getData("widgetType") as string;
  //   setWidgets([...widgets, widgetType]);
  // }

  // function handleDragOver(e: React.DragEvent){
  //   e.preventDefault();
  // }

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row", gap: "2px" }}>
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
      <hr></hr>
      <div
        id="sect"
        style={{ display: "flex", justifyContent: "space-between", gap: "5px" }}
      >
        <ul>
          <h2>Backlog:</h2>
          <hr></hr>
          {Array.isArray(tasks) &&
            tasks.map((task, index) => (
              <li
                key={index}
                draggable
                className="widget"
                onDragStart={(e) => handleOnDrag(e, "tasks")}
              >
                <h3 id="tle">{task.title}</h3>
                <p id="des">{task.description}</p>
              </li>
            ))}
          {/* ))} */}
        </ul>

        {/* <ul className="Page" onDrop={handleOnDrop()} onDragOver={handleDragOver}>
          {widgets.map(widget,index) => (
            <div className="dropped-widget" key={index}>
                <h2>{widgets}</h2>
                <hr></hr>
            </div>
          )}
          </ul> */}

        <ul>
          <h2>Done:</h2>
          <hr></hr>
        </ul>
        <ul>
          <h2>Won't Do:</h2>
          <hr></hr>
        </ul>
      </div>
    </div>
  );
}

export default Todo;
