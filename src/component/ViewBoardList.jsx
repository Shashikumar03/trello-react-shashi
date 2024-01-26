import React, { useEffect, useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import getCardsOnBoard from "../service/getCardsinAList";
import getCardsinAList from "../service/getCardsinAList";
import createCard from "../service/createCard";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import Button from "@mui/material/Button";
import deleteCard from "../service/deleteCard";
import updateCard from "../service/updateCard";

function ViewBoardList({ id, name }) {
  const [cards, setCards] = useState([]);
  const [isDisplayed, setDisplayed] = useState(false);
  const [cardName, setCardName] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [editName, setEditName] = useState("");

  useEffect(() => {
    async function getCards() {
      const a = await getCardsinAList(id);
      setCards(a);
    }
    getCards();
  }, []);
  function handleClick(id) {
    setDisplayed(!isDisplayed);
  }

  function addCard(id) {
    createCard(id, cardName)
      .then((result) => {
        setCards([...cards, result]);
        setCardName("");
        setDisplayed(!isDisplayed);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  function handleInput(e) {
    setCardName(e.target.value);
  }
  function handleEdit(id, name) {
    setEditName(name);
    if (isHovered) {
      setEdit(id);
    } else {
      setEdit(false);
    }
  }
  function handleEditChnage(e) {
    setEditName(e.target.value);
  }
  function saveEditCardName(id) {
    const data = {
      name: editName,
    };

    updateCard(id, data)
      .then((result) => {
        setCards((prevCards) => {
          return prevCards.map((item) => {
            if (item.id === id) {
              return { ...item, name: result.name };
            } else {
              return item;
            }
          });
        });
        setDisplayed(false);
        setEdit(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  console.log(cards);
  function handledeDeleteCard(id) {
    deleteCard(id)
      .then((result) => {
        const data = cards;
        const ans = data.filter((item) => item.id !== id);
        setCards(ans);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <div className="list-itrate">
        <div className="board-list-div">
          <div className="list-three-dot-div">
            <p>{name}</p>
            <MoreHorizIcon className="three-dot" />
          </div>
          <div>
            {cards?.map((item) => {
              return (
                <div
                  className="board-list"
                  onMouseEnter={() => setIsHovered(item.id)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  {isEdit === item.id && isHovered === item.id ? (
                    <div className="edit-save">
                      <input
                        type="text"
                        className="list-name"
                        value={editName}
                        onChange={handleEditChnage}
                      />
                      <div className="save-delete">
                        <button
                          className="save-button"
                          type="button"
                          onClick={() => saveEditCardName(item.id)}
                        >
                          save
                        </button>
                        <DeleteForeverRoundedIcon
                          className="delete"
                          onClick={() => handledeDeleteCard(item.id)}
                        />
                      </div>
                    </div>
                  ) : (
                    <span>{item.name}</span>
                  )}
                  {isHovered === item.id ? (
                    <EditNoteIcon
                      onClick={() => handleEdit(item.id, item.name)}
                    />
                  ) : null}
                </div>
              );
            })}
            {isDisplayed ? (
              <div>
                <input
                  type="text"
                  className="add-cart-text"
                  value={cardName}
                  onChange={handleInput}
                />
                <button type="button" onClick={() => addCard(id)}>
                  add card
                </button>
              </div>
            ) : null}
          </div>

          <div className="list-card-div">
            <button
              type="button"
              className="list-card-button"
              onClick={() => handleClick(id)}
            >
              + add card
            </button>
          </div>
        </div>

        {/* <div className="add-another-list">
          <div>+add another list</div>
          <div className="list-text">
            <input
              className="list-input"
              type="text"
              placeholder="enter list name"
            />
            <button className="add-list-button" type="button">
              add
            </button>
          </div>
        </div> */}
      </div>
    </>
  );
}

export default ViewBoardList;
