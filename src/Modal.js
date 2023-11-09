import { useState } from "react";

export const Modal = ({ onSubmit, onClose }) => {
  const [data, setData] = useState({
    title: "",
    desc: "",
    points: "",
    state: "open",
  });
  return (
    <div className="modalOuter">
      <div className="modalInner">
        <h4>Add new task</h4>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <input
            placeholder="Enter Title"
            onChange={(e) => setData({ ...data, title: e.target.value })}
          />
          <textarea
            placeholder="Enter Description"
            onChange={(e) => setData({ ...data, desc: e.target.value })}
          />
          <input
            placeholder="Enter story point"
            onChange={(e) => setData({ ...data, points: e.target.value })}
          />
        </div>
        <button onClick={() => onSubmit(data)}>Submit</button>
      </div>
    </div>
  );
};
