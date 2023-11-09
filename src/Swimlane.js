export const Swimlane = ({ id, children, handleOnDragOver, onDrop }) => {
  return (
    <div
      className="swimlaneContainer"
      key={id}
      id={id}
      onDragOver={(e) => handleOnDragOver(e)}
      onDrop={(e) => onDrop(e)}
    >
      {children}
    </div>
  );
};
