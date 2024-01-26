import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import fetchListonBoard from "../service/fetchListonBoard";
import Navbar from "../component/Navbar";
import SideMenu from "../component/SideMenu";
import ViewBoardList from "../component/ViewBoardList";

function BoardPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [listArray, setListArray] = useState([]);

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

  return (
    <>
      <Navbar />
      <div className="board-container">
        <SideMenu />
        <p></p>
        <div className="board-page">
          <div>
            <Button onClick={handleBack}>
              <ArrowBackIcon />
              back
            </Button>
          </div>
          <div className="list-card">
            {listArray
              ? listArray.map((item) => (
                  <ViewBoardList id={item.id} name={item.name} />
                ))
              : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default BoardPage;
