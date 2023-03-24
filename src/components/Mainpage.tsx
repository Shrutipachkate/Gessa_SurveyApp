/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import SingleChoiceOption from "./SingleChoice/SingleChoiceOption";
import SingleChoiceContainer from "./SingleChoice/SingleChoiceContainer";
import MultiChoiceOption from "./MultiChoice/MultiChoiceOption";
import MultiChoiceContainer from "./MultiChoice/MultiChoiceContainer";
import TextFieldContainer from "./Text/TextFieldContainer";
import TextFieldOption from "./Text/TextFieldOption";
import { DateOption } from "./Date/DateOption";
import { FileOption } from "./FileUpload/FileOption";
import { RatingOption } from "./Rating/RatingOption";
import "./Mainpage.css";
import { NetOption } from "./NetPromotor/NetOption";
import Button from "@mui/material/Button";
import TextField from "@mui/icons-material"


interface Data {
  question: string;
  type: string;
  options: string[];
}

let singleCorrectCount = 0;
let multipleChoiceCount = 0;
let TextCount = 0;

const MainContainer: React.FC = () => {
  const [cards, setCards] = useState<JSX.Element[]>([]);
  const [surveyName, setSurveyName] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [allData, setAllData] = useState<Data[]>([]);
  const [allFormData, setAllFormData] = useState({});

  const OrganiseData = (Data: Data) => {
    setAllData((allData) => [...allData, Data]);
  };

  const DragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const Drop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("id");

    if (id === "singleCorrect") {
      setCards([
        ...cards,
        <SingleChoiceContainer
          id={singleCorrectCount}
          OrganiseData={OrganiseData}
        />,
      ]);
      singleCorrectCount = singleCorrectCount + 1;
    } else if (id === "multipleChoice") {
      setCards([
        ...cards,
        <MultiChoiceContainer
          id={multipleChoiceCount}
          OrganiseData={OrganiseData}
        />,
      ]);
      multipleChoiceCount = multipleChoiceCount + 1;
    } else if (id === "text") {
      setCards([
        ...cards,
        <TextFieldContainer id={TextCount} OrganiseData={OrganiseData} />,
      ]);
      TextCount = TextCount + 1;
    }
  };

  // for changing form sequence
  function DragStartNew(e: React.DragEvent<HTMLLIElement>, index: number) {
    e.dataTransfer.setData("text/plain", index.toString());
  }

  function DropNew(e: React.DragEvent<HTMLLIElement>, newIndex: number) {
    e.preventDefault();
    const oldIndex = parseInt(e.dataTransfer.getData("text/plain"));
    const newCards = [...cards];
    const [removedCard] = newCards.splice(oldIndex, 1); //remove

    newCards.splice(newIndex, 0, removedCard);
    setCards(newCards);
  }

  function DragOverNew(e: React.DragEvent<HTMLLIElement>) {
    e.preventDefault();
  }

  const surveyTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSurveyName(e.target.value);
  };

  const expiry = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpiryDate(e.target.value);
  };

  let all: { title: string; expiry: string; form: Data[] };

  const arrangeAll = () => {
    all = {
      title: surveyName,
      expiry: expiryDate,
      form: allData,
    };
  };

  const postData = () => {
    //e.preventDefault()
    // eslint-disable-next-line no-lone-blocks
    {
      arrangeAll();
    }
    console.log(all, "");
  };

  return (
    <>
      {" "}
      <div className="top-navigation">
        <img className="text" src="./Images/square_logo.png" alt="" />
      </div>
      <div style={{ position: "relative" }}>
        <div className="mainContainer">
        {/* <div className="head"> Add New Survey </div> */}
          <div className="containerOne"></div>
          <div className="containerSecond">
            <div className="optionTitle">
              <b>List of available question types</b>
            </div>
            <hr></hr>
            <div className="btnContainer">
              <SingleChoiceOption />
              <MultiChoiceOption />
              <TextFieldOption />
              <DateOption />
              <FileOption />
              <RatingOption />
              <NetOption />
              {/* <button className='btn'>Text</button> */}
            </div>
          </div>
          <div className="containerThird">
            <div className="surveyTitleDate">

            {/* <TextField
  id="outlined-uncontrolled"
  label="Uncontrolled"
  defaultValue="survey title"
/> */}
              <input
                onChange={surveyTitle}
                value={surveyName}
                className="inputField"
                type="text"
                placeholder="Survey Title"
              />

              <input
                onChange={expiry}
                value={expiryDate}
                className="inputField"
                type="date"
                placeholder="Second input field"
              />
            </div>
            <hr></hr>
            <div
              className="dropableContainer"
              onDrop={(e) => {
                Drop(e);
              }}
              onDragOver={DragOver}
            >
              <div className="dropableArea">  </div>
            </div>

            <div>
              <ol style={{ textAlign: "center", display: "block" }}>
                {cards.map((Card, index) => {
                  return (
                    <li
                      key={index}
                      draggable
                      onDragStart={(e) => DragStartNew(e, index)}
                      onDrop={(e) => DropNew(e, index)}
                      onDragOver={(e) => DragOverNew(e)}
                    >
                      {Card}
                    </li>
                  )
                })}
              </ol>
            </div>
          </div>
        </div>
        
        
            {/* <button className="button3">
              <div className="helper">Share</div>
            </button> */}

        <button
          style={{
            position: "absolute",
            
            bottom: 0,
            right: 0,
            marginRight: "27px",
            marginBottom: "350px",
            border: "none",
            outline: "none",
          }}
          onClick={postData}
        >
          {/* Save Form */}
          <div className="button4">
              <div className="helper">Publish</div>
            </div>
        </button>
      </div>
    </>
  );
};

export default MainContainer;
