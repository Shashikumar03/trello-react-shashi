import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import deleteBoard from "../service/board/deleteBoard";

function ViewBoard({ board, setBoard }) {
  const [isHovered, setIsHovered] = useState(false);
  function deleteBoardFun(boardId) {
    deleteBoard(boardId)
      .then((res) => {
        console.log(res, "delete wala hai");
        setBoard((prev) => prev.filter((item) => item.id !== boardId));
      })
      .catch((err) => console.log(err));
  }
  return (
    <>
      {board.map((item) => {
        return (
          <div
            className="boards"
            onMouseEnter={() => setIsHovered(item.id)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Link
              className="link-to-board"
              to={`/board/${item.id}`}
              key={item.id}
            >
              <div key={item.id} className="card1">
                <div>{item.name}</div>
              </div>
            </Link>
            {isHovered === item.id ? (
              <DeleteForeverIcon
                className="delete-board-button"
                onClick={() => deleteBoardFun(item.id)}
              />
            ) : null}
          </div>
        );
      })}
    </>
  );
}

export default ViewBoard;
