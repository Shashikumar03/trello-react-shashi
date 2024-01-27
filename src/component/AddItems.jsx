import React, { useEffect, useState } from "react";
import getCheckItemsOnCheckList from "../service/getCheckItemsOnCheckList";
import { Button } from "@mui/material";
import CheckBoxOutlineBlankTwoToneIcon from "@mui/icons-material/CheckBoxOutlineBlankTwoTone";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import createCheckItemOnList from "../service/createCheckItemOnList";
import deleteCheckItem from "../service/deleteCheckItem";

function AddItems({ checkListId }) {
  const [checkList, setCheckList] = useState([]);
  const [itemName, setItemName] = useState("");
  const [isDisplay, setDisplay] = useState(false);
  useEffect(() => {
    getCheckItemsOnCheckList(checkListId)
      .then((res) => setCheckList(res))
      .catch((err) => console.log(err));
  }, []);
  console.log(checkList);
  function handleCheckListItemInput(e) {
    setItemName(e.target.value);
  }
  function addCheckItem(checkItemId) {
    createCheckItemOnList(checkItemId, itemName)
      .then((res) => {
        setCheckList((prev) => [...prev, res]);
        setItemName("");
        setDisplay(!isDisplay);
      })
      .catch((err) => console.log(err));
  }

  function addItems() {
    setDisplay(true);
  }
  function cancelButton() {
    setDisplay(false);
  }
  function deleteCheckItemfFromList(checkItemId) {
    deleteCheckItem(checkListId, checkItemId)
      .then((res) => {
        if (res.status === 200) {
          setCheckList((prev) =>
            prev.filter((item) => item.id !== checkItemId)
          );
        }
      })
      .catch((err) => console.log(err));
  }
  return (
    <>
      <div>
        {checkList?.length > 0
          ? checkList.map((item) => {
              return (
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      margin: "0.3rem",
                      gap: "0.2rem",
                    }}
                  >
                    <CheckBoxOutlineBlankTwoToneIcon />
                    <div key={item.id}>{item.name}</div>
                    <CancelRoundedIcon
                      onClick={() => deleteCheckItemfFromList(item.id)}
                    />
                  </div>
                </div>
              );
            })
          : null}
        {isDisplay ? (
          <div>
            <input
              type="text"
              placeholder="add item"
              onChange={handleCheckListItemInput}
              value={itemName}
            />
            <div>
              <Button onClick={() => addCheckItem(checkListId)}>save</Button>
              <Button onClick={cancelButton}>cancel</Button>
            </div>
          </div>
        ) : null}

        {!isDisplay ? <Button onClick={addItems}>add items</Button> : null}
        <hr />
      </div>
    </>
  );
}

export default AddItems;
