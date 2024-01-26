import * as React from "react";
import { Link } from "react-router-dom";

function ViewBoard({ board }) {
  return (
    <>
      {board.map((item) => {
        return (
          <Link
            className="link-to-board"
            to={`/board/${item.id}`}
            key={item.id}
          >
            <div key={item.id} className="card1">
              {item.name}
            </div>
          </Link>
        );
      })}
    </>
  );
}

export default ViewBoard;
