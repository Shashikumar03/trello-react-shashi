import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import fetchListonBoard from "../service/fetchListonBoard";
import Navbar from "../component/Navbar";
import SideMenu from "../component/SideMenu";
import ViewBoardList from "../component/ViewBoardList";
import createNewList from "../service/createNewList";
import CheckListPage from "./CheckListPage";
import BasicModal from "../component/BasicModal";

function BoardPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [listArray, setListArray] = useState([]);
  const [listName, setListName] = useState();
  const [showCheckList, setShowCheckList] = useState(false);
  const [cardId, setCardId] = useState("");

  function handleBack() {
    navigate(-1);
  }

  useEffect(() => {
    async function getListOfABoard() {
      const data = await fetchListonBoard(id);
      setListArray(data);
    }
    getListOfABoard();
  }, []);
  function handleListChange(e) {
    setListName(e.target.value);
  }
  function addList(listId) {
    createNewList(listId, listName)
      .then((result) =>
        setListArray((prev) => {
          setListName("");
          return [...prev, result];
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <Navbar />
      <div className="board-container">
        <SideMenu />

        <div className="board-page">
          <div>
            <Button onClick={handleBack}>
              <ArrowBackIcon />
              back
            </Button>
          </div>
          <div className="add-new-list">
            <div className="list-card">
              {listArray
                ? listArray.map((item) => {
                    return (
                      <div>
                        {!item.close ? (
                          <ViewBoardList
                            id={item.id}
                            name={item.name}
                            setShowCheckList={setShowCheckList}
                            setCardId={setCardId}
                            setListArray={setListArray}
                          />
                        ) : null}
                      </div>
                    );
                  })
                : null}

              <div className="add-another-list">
                <div>+add another list</div>
                <div className="list-text">
                  <input
                    className="list-input"
                    type="text"
                    placeholder="enter list name"
                    onChange={handleListChange}
                    value={listName}
                  />
                  <button
                    className="add-list-button"
                    type="button"
                    onClick={() => addList(id)}
                  >
                    add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BoardPage;
