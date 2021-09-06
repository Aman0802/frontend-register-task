import React, { useState, useEffect } from "react";
import { CustomInput } from "./CustomInput/CustomInput";
import "./App.css";
import axios from "axios";

function App() {
  const [formValues, setFormValues] = useState({
    name: "",
    boardId: null,
    mediumId: null,
    standardId: null,
  });
  const [boardOptions, setBoardOptions] = useState([]);
  const [mediumOptions, setMediumOptions] = useState([]);
  const [standardOptions, setStandardOptions] = useState([]);

  useEffect(() => {
    axios
      .get("https://www.qlsacademy.com/api/board/")
      .then((response) => {
        setBoardOptions(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (formValues.boardId) {
      getMediumOptions(formValues.boardId);
    }
  }, [formValues.boardId]);

  useEffect(() => {
    if (formValues.mediumId) getStandardOptions(formValues.mediumId);
  }, [formValues.mediumId]);

  const getMediumOptions = (boardId) => {
    axios
      .get(`https://www.qlsacademy.com/api/medium/?board_id=${boardId}`)
      .then((response) => {
        setMediumOptions(response.data);
      })
      .catch((err) => console.log(err));
  };

  const getStandardOptions = (mediumId) => {
    axios
      .get(`https://www.qlsacademy.com/api/standard/?medium_id=${mediumId}`)
      .then((response) => {
        setStandardOptions(response.data);
      })
      .catch((err) => console.log(err));
  };

  const handleBoardSelectChange = async (e) => {
    setFormValues({ ...formValues, boardId: e.target.value });
  };

  const handleMediumSelectChange = async (e) => {
    setFormValues({ ...formValues, mediumId: e.target.value });
  };

  const handleStandardSelectChange = async (e) => {
    setFormValues({ ...formValues, standardId: e.target.value });
  };

  return (
    <>
      <div style={{ marginLeft: "6rem", marginRight: "6rem" }}>
        <form>
          <h2>Student Registration</h2>
          <div>
            <span>Student Name: </span>
            <CustomInput
              placeholder="Name"
              value={formValues.name}
              onChange={(e) =>
                setFormValues({ ...formValues, name: e.target.value })
              }
              required
            />
          </div>
          <div>
            <span>Board: </span>
            <select onChange={handleBoardSelectChange}>
              <option disabled selected>
                Select
              </option>
              {boardOptions?.map((option) => (
                <option value={option.board_id}>{option.board_name}</option>
              ))}
            </select>
          </div>
          {/* {boardOptions && mediumOptions && ( */}
          <div>
            <span>Medium: </span>
            <select onChange={handleMediumSelectChange}>
              <option disabled selected>
                Select
              </option>
              {mediumOptions.map((option) => (
                <option value={option.medium_id}>{option.medium_name}</option>
              ))}
            </select>
          </div>
          {/* )} */}

          {/* {boardOptions && mediumOptions && standardOptions && ( */}
          <div>
            <span>Standard: </span>
            <select onChange={handleStandardSelectChange}>
              <option disabled selected>
                Select
              </option>
              {standardOptions?.map((option) => (
                <option value={option.standard_id}>{option.standard}</option>
              ))}
            </select>
          </div>
          {/* )} */}
          <div>
            <span>Password: </span>
            <CustomInput
              type="passsword"
              value={formValues.password}
              onChange={(e) =>
                setFormValues({ ...formValues, password: e.target.value })
              }
              required
            />
          </div>
          <div>
            <span>Confirm Password: </span>
            <CustomInput
              type="passsword"
              value={formValues.confirmPassword}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  confirmPassword: e.target.value,
                })
              }
              required
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default App;
