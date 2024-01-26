import React, { useState } from "react";
import createBoardApi from "../service/createBoardApi";

function Navbar({ setNewBoard }) {
  const [text, setText] = useState(false);
  const [boardText, setBoardText] = useState("");
  function handleClick() {
    setText(!text);
  }

  function handleInputChange(event) {
    setBoardText(event.target.value);
  }

  async function handleKeyDown(event) {
    if (event.key === "Enter") {
      const name = boardText.trim();
      if (name !== null && name !== "") {
        console.log("Text submitted:", boardText.trim());

        const a = await createBoardApi(name);
        console.log(a);
        setNewBoard((prev) => [...prev, a]);
      }
      setText(false);
      setBoardText("");
    }
  }

  return (
    <nav className="navbar">
      <div className="container-nav">
        <a className="navbar-brand" href="#">
          <img
            className="logo-gif"
            src="https://trello.com/assets/87e1af770a49ce8e84e3.gif"
            alt="trello"
            width="100"
            height="30"
          />
        </a>
        <div className="create-board">
          {!text ? (
            <button
              onClick={handleClick}
              type="button"
              className="btn btn-primary"
            >
              create
            </button>
          ) : null}
          {text ? (
            <div className="board-field-div">
              <input
                className="board-text-field"
                placeholder="enter board name"
                type="text"
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
