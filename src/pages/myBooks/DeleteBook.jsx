import { forwardRef } from "react";
import PropTypes from "prop-types";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Button } from "@mui/material";

const DeleteBook = ({ open, handleClose, deleteBookConfirm, deleteBook }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      className="opacity-1">
      <DialogTitle className="bg-background text-foreground">
        Delete Book
      </DialogTitle>
      <DialogContent className="mt-5">
        <DialogContentText id="alert-dialog-slide-description">
          Are you sure you want to delete this book?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          onClick={handleClose}
          aria-label="Handle Close"
          role="button"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleClose();
            }
          }}>
          Cancel
        </Button>
        <Button
          color="error"
          onClick={() => deleteBookConfirm(deleteBook)}
          aria-label="Conform if Delete Book"
          role="button"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              deleteBookConfirm(deleteBook);
            }
          }}
          disabled={deleteBook == null}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DeleteBook.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  deleteBookConfirm: PropTypes.func.isRequired,
  deleteBook: PropTypes.any,
};

export default DeleteBook;

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

Transition.propTypes = {
  children: PropTypes.node,
};
