import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import getCheckList from "../service/getCheckList";
import ChecklistIcon from "@mui/icons-material/Checklist";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import ChecklistRtlTwoToneIcon from "@mui/icons-material/ChecklistRtlTwoTone";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import createACheckListOnCard from "../service/createACheckListOnCard";

import AddItems from "./AddItems";
import deleteCheckList from "../service/deleteCheckList";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ nameOfCard, id }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [checkListArray, setCheckListArray] = useState([]);
  const [checkListName, setCheckListName] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  // const [checkItems, setCheckItems] = useState([]);

  useEffect(() => {
    getCheckList(id)
      .then((result) => {
        setCheckListArray(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCheckListInput(e) {
    setCheckListName(e.target.value);
  }

  function addCheckList(id) {
    createACheckListOnCard(id, checkListName)
      .then((result) => {
        setCheckListArray((prev) => [...prev, result]);
        setCheckListName("");
        setIsFocused(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleFocus = () => {
    setIsFocused(true);
  };

  // const handleBlur = () => {
  //   setIsFocused(false);
  // };

  const handleCancel = () => {
    setCheckListName("");
    setIsFocused(false);
  };

  function deleteCheckListFn(listId) {
    deleteCheckList(listId)
      .then((res) => {
        if (res.status === 200) {
          setCheckListArray((prev) =>
            prev.filter((item) => item.id !== listId)
          );
        }
      })
      .catch((err) => console.log(err));
  }
  // --------------------------------------------------------------------------

  return (
    <div>
      <Button onClick={handleOpen}>{nameOfCard}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div id="modal-modal-title" variant="h6" component="h2">
            {nameOfCard}
          </div>
          <div className="checklist-item">
            <div className="already-present-checklist">
              <ul className="my-list1">
                {checkListArray?.map((item) => (
                  <div key={item.id} style={{ margin: "0.3rem" }}>
                    <div className="add-items">
                      <ChecklistRtlTwoToneIcon />
                      <li key={item.id}>{item.name}</li>
                      <DeleteForeverTwoToneIcon
                        onClick={() => deleteCheckListFn(item.id)}
                        className="delete-icon"
                      />
                    </div>
                    <AddItems checkListId={item.id} />
                  </div>
                ))}
              </ul>
            </div>

            <div className="create-checkList">
              <div className="create-checkList1">
                <ChecklistIcon />
                <div className="adding-new-check">
                  <input
                    className="add-checklist-input"
                    type="text"
                    placeholder="add check list"
                    onChange={handleCheckListInput}
                    value={checkListName}
                    onFocus={handleFocus}
                    // onBlur={handleBlur}
                  />
                  {isFocused ? (
                    <div className="add-close-checklist">
                      <CancelTwoToneIcon
                        className="cancel-icon"
                        onClick={handleCancel}
                      />
                      <AddBoxIcon
                        className="add-icon"
                        onClick={() => addCheckList(id)}
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
