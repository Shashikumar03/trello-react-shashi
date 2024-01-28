import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import archiveList from "../service/list/archiveList";

export default function BasicPopover({ listId, setListArray }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  function handleArchive(id) {
    archiveList(id)
      .then((result) => {
        if (!result.close) {
          console.log("close hai bhai");
          console.log(result.id);
          setListArray((prev) => prev.filter((item) => item.id != result.id));
          setAnchorEl(null);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <Button
        aria-describedby={id}
        onClick={handleClick}
        size="small"
        sx={{ maxWidth: "1px" }} // Adjust the width as per your requirement
      >
        <MoreHorizIcon sx={{ color: "blue" }} />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography  className="archive" onClick={() => handleArchive(listId)} sx={{ p: 2 }}>
          Archive.
        </Typography>
      </Popover>
    </div>
  );
}
