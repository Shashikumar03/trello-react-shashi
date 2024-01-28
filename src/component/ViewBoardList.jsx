import React, { useEffect, useState } from "react";
import getCardsOnBoard from "../service/getCardsinAList";
import getCardsinAList from "../service/getCardsinAList";
import createCard from "../service/createCard";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import Button from "@mui/material/Button";
import deleteCard from "../service/deleteCard";
import updateCard from "../service/updateCard";
import CheckListPage from "../pages/CheckListPage";
import BasicModal from "./BasicModal";
import AddCardIcon from "@mui/icons-material/AddCard";
import AddCard from "@mui/icons-material/AddCard";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import BasicPopover from "./BasicPopover";

function ViewBoardList({
  id,
  name,
  setShowCheckList,
  setCardId,
  setListArray,
}) {
  const [cards, setCards] = useState([]);
  const [isDisplayed, setDisplayed] = useState(false);
  const [cardName, setCardName] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [editName, setEditName] = useState("");
  const [newCardName, setNewCardName] = useState("");

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
  function handleCheckList(idCard) {
    setShowCheckList(true);
    setCardId(idCard);
  }
  function addNewCardInput(e) {
    setNewCardName(e.target.value);
  }
  function addNewCard(id) {
    createCard(id, newCardName)
      .then((result) => {
        setCards((prev) => [...prev, result]);
        setNewCardName("");
        setDisplayed(!isDisplayed);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  function cancelAddNewCard() {
    setNewCardName("");
    setDisplayed(!isDisplayed);
  }
  return (
    <>
      <div className="viewBoard-conatiner">
        <div className="list-itrate">
          <div className="board-list-div">
            <div className="list-three-dot-div">
              <p>{name}</p>
              <BasicPopover listId={id} setListArray={setListArray} />
            </div>
            <div className="a">
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
                      <BasicModal nameOfCard={item.name} id={item.id} />
                    )}
                    {isHovered === item.id ? (
                      <EditNoteIcon
                        className="Edit-card-name"
                        onClick={() => handleEdit(item.id, item.name)}
                      />
                    ) : null}
                  </div>
                );
              })}
            </div>

            <div className="list-card-div">
              {isDisplayed ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <input
                    type="text"
                    placeholder="enter card name"
                    className="card-input"
                    onChange={addNewCardInput}
                    value={newCardName}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "50%",
                      marginTop: "0.2rem",
                    }}
                  >
                    <AddCard
                      onClick={() => addNewCard(id)}
                      className="add-card"
                    />
                    <CloseOutlinedIcon
                      onClick={cancelAddNewCard}
                      className="delete-card"
                    />
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  className="list-card-button"
                  onClick={() => handleClick(id)}
                >
                  + add card
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewBoardList;
