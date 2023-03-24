/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";

const TextFieldOption = () => {
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
      <div
        className="btnSingleCorrect"
        onDragOver={(e) => {
          DragOver(e);
        }}
      >
        <button
          className="btn"
          draggable
          onDragStart={(e) => {
            DragStart(e, "text");
          }}
        >
          <img className="request-icon" alt="" src="images/request3.svg" />
          Text
        </button>
      </div>
    </>
  );
};

export default TextFieldOption;
