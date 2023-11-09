import { useState, createContext, useRef } from "react";
import { Modal } from "./Modal";
import { Swimlane } from "./Swimlane";
import { Task } from "./Task";

export const Context = createContext(null);
export default function App() {
  const arrItem = ["Open", "Progress", "Review", "Closed"];
  const [modal, openModal] = useState(false);
  const dragItem = useRef();
  const dragOverItem = useRef();
  const [tasks, setTasks] = useState([
    {
      desc: "task 1 description",
      title: "Task1",
      points: "3",
      state: "open",
    },
    {
      desc: "task 2 description",
      title: "Task2",
      points: "3",
      state: "closed",
    },
  ]);

  const dragStart = (e) => {
    dragItem.current = e.target.id;
    e.dataTransfer.setData("text", e.target.id);
    console.log("dragStart", e.target);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    dragOverItem.current = e.currentTarget.id;
    console.log(
      "DragAndDropDemo() :: handleOnDragOver() :: e.target.name=" +
        e.target.id +
        " e.target.value=" +
        e.target.value
    );
  };

  const handleSubmit = (obj) => {
    openModal(false);
    setTasks([...tasks, { ...obj }]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const taskName = e.dataTransfer.getData("text");
    console.log("DROPPED", e.target.id, taskName);
    let taskCopy = [...tasks];
    taskCopy.forEach((task) => {
      if (task.title === taskName && arrItem.includes(e.target.id)) {
        task.state = e.target.id.toLowerCase();
      }
    });
    setTasks(taskCopy);
  };

  console.log("***tasks", tasks);

  return (
    <Context.Provider value={{ tasks, setTasks }}>
      <div className="mainContainer">
        <h3>AGILE BOARD</h3>
        <button onClick={() => openModal(true)}>Create new task</button>
        <div className="headers">
          {arrItem.map((item) => (
            <h6>{item}</h6>
          ))}
        </div>
        <div className="swimlanes">
          {arrItem.map((lane) => (
            <Swimlane
              id={lane}
              onDrop={handleDrop}
              handleOnDragOver={handleDragOver}
            >
              {tasks.map(
                (item) =>
                  lane.toLowerCase() === item.state && (
                    <Task
                      {...item}
                      id={item.title}
                      // dragEnter={dragEnter}
                      dragStart={dragStart}
                      // drop={drop}
                    />
                  )
              )}
            </Swimlane>
          ))}
        </div>
        {modal && <Modal onSubmit={handleSubmit} />}
      </div>
    </Context.Provider>
  );
}
