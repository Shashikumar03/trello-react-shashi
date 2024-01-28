import React, { useEffect, useState } from "react";
import api from "../service/api";
import Navbar from "../component/Navbar";
import SideMenu from "../component/SideMenu";
import ViewBoard from "../component/ViewBoard";

function HomePage() {
  const [board, setBoard] = useState([]);

  useEffect(() => {
    async function apiFetching() {
      const boardsList = await api();
      setBoard(boardsList);
    }
    apiFetching();
  }, []);

  return (
    <>
      <Navbar setNewBoard={setBoard} board={board} />
      <div className="container1">
        <SideMenu />
        <div className="boardList">
          <ViewBoard board={board} setBoard={setBoard} />
        </div>
      </div>
    </>
  );
}

export default HomePage;
