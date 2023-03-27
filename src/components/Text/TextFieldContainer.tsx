import React, { useState } from "react";
import { TextField } from "@mui/material";
interface Props {
  id: number;
  OrganiseData: (allData: any) => void;
}

interface AllData {
  id: string;
  question: string;
  questionType: string;
}

const TextFieldContainer: React.FC<Props> = ({ id, OrganiseData }) => {
  const [question, setQuestion] = useState<string>(""); // State for the question text

  const QuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value);
    console.log(event.target.value, "");
  };

  const onSave = () => {
    const allData: AllData = {
      id: `text_${id}`,
      question: question,
      questionType: "text",
    };
    console.log(allData, "");
    OrganiseData(allData);
  };

  return (
    <>
      <div style={{ position: "relative" }}>
        <div className="question-editor">
          {/* <input
            className="textQuestion"
            type="text"
            placeholder="Enter question here"
            value={question}
            onChange={QuestionChange}
          /> */}
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
        </div>
        

        <button className="check"
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            marginRight: "27px",
            marginBottom: "7px",
            border: "none",
            outline: "none",
          }}
          onClick={onSave}
        >
          <img className="text" src="./images/Vector.svg" alt="" />
        </button>
      </div>
    </>
  );
};

export default TextFieldContainer;
