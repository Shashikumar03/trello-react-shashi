import React, { useEffect, useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import getCardsOnBoard from "../service/getCardsinAList";
import getCardsinAList from "../service/getCardsinAList";

function ViewBoardList({ id, name }) {
  const [cards, setCards] = useState([]);
  const [isDisplayed, setDisplayed] = useState(false);

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
              return <div className="board-list">{item.name}</div>;
            })}
            {isDisplayed ? (
              <div>
                <input type="text" className="add-cart-text" />
                <button type="button">add card</button>
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
