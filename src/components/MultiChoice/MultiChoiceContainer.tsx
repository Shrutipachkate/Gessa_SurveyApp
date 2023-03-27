/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import "./MultiChoiceContainer.css";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { TextField } from "@mui/material";
interface Option {
  id: number;
  text: string;
  isCorrect: boolean;
}

interface MultipleChoiceData {
  id: string;
  question: string;
  options: Option[];
  questionType: string;
}

interface MultiChoiceContainerProps {
  id: any;

  OrganiseData: (MultipleChoiceData: any) => void;
}

const MultiChoiceContainer: React.FC<MultiChoiceContainerProps> = ({
  id,
  OrganiseData,
}) => {
  const [question, setQuestion] = useState<string>("");
  // State for the question text
  const [options, setOptions] = useState<Option[]>([
    { id: 1, text: "", isCorrect: false },
  ]); // State for the options array

  //for changing the question text
  const QuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value);
    console.log(event.target.value);
  };

  // for changing an option text
  const OptionTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const newOptions = [...options];
    newOptions[index] = { ...newOptions[index], text: event.target.value };
    setOptions(newOptions);
    console.log(options);
  };

  //for changing an option correctness
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

  // for deleting an option
  const DeleteOption = (index: number) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  const AllData = () => {
    const allData: MultipleChoiceData = {
      id: `multiple_${id}`,
      question: question,
      questionType: "multipleChoice",
      options: options,
    };
    console.log(allData, "multipleChoice");
    OrganiseData(allData);
  };
  return (
    <>
      <div style={{ position: "relative" }}>
        <div className="question-editor">
            
          <TextField
            className="textQuestion"
            type="text"
            label="Question"
            //   id="outlined-size-small"
            defaultValue="Small"
            size="small"
            value={question}
            onChange={QuestionChange}
          />

          {options.map((option, index) => (
            <div key={index} className="option-container">
              <input type="checkbox" name="correct-option" />
              <TextField
                label={`Option ${index + 1}`}
                className="optionText"
                id="outlined-size-small"
                value={option.text}
                size="small"
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

export default MultiChoiceContainer;
