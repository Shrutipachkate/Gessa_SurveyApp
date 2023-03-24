/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import "./SingleChoiceOption.css";

const SingleChoiceOption = (): JSX.Element => {
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
            DragStart(e, "singleCorrect");
          }}
        >
          <img className="que_image" src="./images/buttonVector.svg" alt="" />
          Single Choice
          <img className="drag_image" src="./images/dragbtn.svg" alt="" />
        </button>
      </div>
    </>
  );
};

export default SingleChoiceOption;
