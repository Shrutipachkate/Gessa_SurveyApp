/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import "./SingleChoiceContainer.css";

type Option = {
  id: number;
  text: string;
  isCorrect: boolean;
};

type Props = {
  id: any;
  OrganiseData: (allData: any) => void;
};

const SingleChoiceContainer: React.FC<Props> = ({ id, OrganiseData }) => {
  const [question, setQuestion] = useState<string>(""); // State for the question text
  const [options, setOptions] = useState<Option[]>([
    { id: 1, text: "", isCorrect: false },
  ]); // State for the options array

  // Event handler for changing the question text
  const QuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value);
    console.log(event.target.value, "");
  };

  // for changing an option text
  const OptionTextChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newOptions = [...options];
    newOptions[index] = { ...newOptions[index], text: event.target.value };
    setOptions(newOptions);
    console.log(options, "");
  };

  //  for changing an option correctness
  const OptionCorrectnessChange = (index: number) => {
    const newOptions = [...options];
    newOptions[index] = { ...newOptions[index], isCorrect: true };
    newOptions.forEach((option, optionIndex) => {
      if (optionIndex !== index) {
        option.isCorrect = false;
      }
    });
    setOptions(newOptions);
  };

  // for adding a new option
  const AddOption = () => {
    setOptions([
      ...options,
      { id: options.length + 1, text: "", isCorrect: false },
    ]);
  };

  const DeleteOption = (index: number) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  const AllData = () => {
    const allData = {
      id: `radio_${id}`,
      question: question,
      questionType: "radio",
      options: options,
    };
    console.log(allData, "singleCorret");
    OrganiseData(allData);
  };

  return (
    <>
      <div style={{ position: "relative" }}>
        <div className="question-editor">
          <input
            className="textQuestion"
            type="text"
            placeholder="Enter question here"
            value={question}
            onChange={QuestionChange}
          />

          {options.map((option, index) => (
            <div key={index} className="option-container">
              <input type="radio" name="correct-option" />
              <input
                className="optionText"
                type="text"
                // placeholder={`Option ${index + 1}`}
                value={option.text}
                onChange={(event) => OptionTextChange(event, index)}
              />

              <IconButton aria-label="delete">
                <DeleteIcon onClick={() => DeleteOption(index)} />
              </IconButton>
            </div>
          ))}

          <button
            type="button"
            className="singleCorrectAddButton"
            onClick={AddOption}
          >
            <img className="text" src="./images/plusVector.svg" alt="" />
            Add option
          </button>
        </div>
        <button
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            marginRight: "27px",
            marginBottom: "7px",
            border: "none",
            outline: "none",
          }}
          onClick={AllData}
        >
          <img className="text" src="./images/Vector.svg" alt="" />
        </button>
      </div>
    </>
  );
};

export default SingleChoiceContainer;
