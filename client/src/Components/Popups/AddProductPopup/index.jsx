import classNames from "classnames/bind";
import styles from "./AddProductPopup.module.scss";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
import { useState } from "react";
const cx = classNames.bind(styles);

function AddProductPopup(props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = () => {
    const form = {
      name,
      price: +price,
      desc,
    };
    props?.handleSubmit(form);
  };

  const handleClose = () => {
    setName("");
    setPrice("");
    setDesc("");
    props?.handleClose();
  };

  return (
    <Dialog open={props?.openPopup} onClose={props?.handleClose}>
      <DialogTitle id="alert-dialog-title">
        <div>
          <h2 className={cx("title_popup")}>Add product</h2>
        </div>
      </DialogTitle>
      <DialogContent>
        <div className={cx("body_popup")}>
          <div className={cx("list-input")}>
            <TextField
              id="Name"
              label="Name"
              type="text"
              autoComplete="off"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{
                fontSize: "1.6rem",
                width: "200px",
                "& .MuiInputBase-input": {
                  fontSize: "1.3rem",
                },
                "& .MuiInputLabel-root": {
                  fontSize: "1.3rem",
                },
              }}
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
            />
            <TextField
              id="Price"
              label="Price"
              type="text"
              autoComplete="off"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              sx={{
                fontSize: "1.6rem",
                width: "50px",
                "& .MuiInputBase-input": {
                  fontSize: "1.3rem",
                },
                "& .MuiInputLabel-root": {
                  fontSize: "1.3rem",
                },
              }}
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
            />
          </div>
          <div className={cx("text-area")}>
            <TextField
              id="Desc"
              label="Desc"
              type="text"
              autoComplete="off"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              sx={{
                fontSize: "1.6rem",
                width: "100%",
                "& .MuiInputBase-input": {
                  fontSize: "1.3rem",
                },
                "& .MuiInputLabel-root": {
                  fontSize: "1.3rem",
                },
              }}
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
            />
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancle</Button>
        <Button onClick={handleSubmit}>Create</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddProductPopup;
