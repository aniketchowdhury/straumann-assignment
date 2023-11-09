import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "./App";

const Popper = ({ top, left, right, state, callback, title }) => {
  const arrItem = ["Open", "Progress", "Review", "Closed"];
  return (
    <div className="popper" style={{ top: top, left: left, right: right }}>
      <ul>
        {arrItem.map(
          (item, index) =>
            item.toLowerCase() !== state && (
              <li key={index.toString()} onClick={() => callback(item, title)}>
                {item}
              </li>
            )
        )}
      </ul>
    </div>
  );
};
export const Task = ({ id, desc, title, points, state, ...props }) => {
  const { tasks, setTasks } = useContext(Context);
  const { dragEnter, dragStart, drop } = props;
  const taskRef = useRef();
  const [openPopper, setPopper] = useState(false);
  const [styles, setStyles] = useState({ top: 0, left: 0, right: 0 });
  const handleCallback = (stateVal, titleVal) => {
    console.log(stateVal, titleVal, tasks);
    let taskCopy = [...tasks];
    taskCopy.forEach((task) => {
      if (task.title === titleVal) {
        task.state = stateVal.toLowerCase();
      }
    });
    setTasks(taskCopy);
  };
  useEffect(() => {
    if (taskRef.current === undefined) return;
    const { top, left, right } = taskRef.current.getBoundingClientRect();
    const obj = { top: top + 20, left: left + 20, right: right + 20 };
    setStyles(obj);
  }, []);

  return (
    <>
      <div
        ref={taskRef}
        draggable
        onDragStart={(e) => dragStart(e)}
        // onDragEnter={(e) => dragEnter(e)}
        // onDragEnd={(e) => drop(e)}
        className="taskCont"
        onMouseEnter={() => setPopper(true)}
        onMouseLeave={() => setPopper(false)}
        key={id}
        id={id}
      >
        <h3>{title}</h3>
        <p>{desc}</p>
        <p>{points}</p>
        {/* {openPopper && (
          <Popper
            state={state}
            title={title}
            callback={handleCallback}
            {...styles}
          />
        )} */}
      </div>
    </>
  );
};
