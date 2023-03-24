/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";

const MultiChoiceOption = (): JSX.Element => {
  const [components, setComponents] = useState<JSX.Element[]>([]);

  const DragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
  };

  const DragStart = (
    ev: React.DragEvent<HTMLButtonElement>,
    id: string
  ): void => {
    ev.dataTransfer.setData("id", id);
  };

  return (
    <>
      <div className="btnMultipleChoice" onDragOver={DragOver}>
        <button
          className="btn"
          draggable
          onDragStart={(e) => DragStart(e, "multipleChoice")}
        >
          <img className="que_image" src="./images/buttonVector.svg" alt="" />
          Multiple Choice
          <img className="drag_image" src="./images/dragbtn.svg" alt="" />
        </button>
      </div>
    </>
  );
};

export default MultiChoiceOption;
