import React, { useEffect, useState } from "react";
import getCheckItemsOnCheckList from "../service/getCheckItemsOnCheckList";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import TaskAltTwoToneIcon from "@mui/icons-material/TaskAltTwoTone";

function AddItems({ checkListId }) {
  console.log(checkListId, "lllll");
  const [checkItems, setCheckItems] = useState([]);

  useEffect(() => {
    getCheckItemsOnCheckList(checkListId)
      .then((results) => setCheckItems(results))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {checkItems.map((item) => {
        return (
          <div  className="add-items-div" style={{ display: "flex" }}>
            <TaskAltTwoToneIcon />
            <div>{item.name}</div>
            <CloseTwoToneIcon className="close-icon" />
          </div>
        );
      })}
    </>
  );
}

export default AddItems;
