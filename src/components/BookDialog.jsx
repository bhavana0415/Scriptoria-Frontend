// import React from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { teal } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

const BookDialog = ({ open, handleClose, book }) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          backgroundColor: teal[900],
          color: teal[50],
          fontFamily: "sans-serif",
        }}
        className="relative items-center">
        {book.title}
        <CancelPresentationIcon
          className="absolute right-4 cursor-pointer"
          onClick={handleClose}
        />
      </DialogTitle>
      <DialogContent
        dividers
        sx={{ backgroundColor: teal[100], color: teal[900] }}>
        <div className="flex relative">
          <div className="md:w-1/3 px-2">
            <img src={book.image} alt="" />
          </div>
          <div className="md:w-2/3 px-2">
            <Typography
              variant="subtitle1"
              color="textSecondary"
              sx={{ fontFamily: "cursive" }}>
              <p className="text-sm py-2">by {book.authors}</p>
            </Typography>
            <Typography variant="body1" paragraph 
            dangerouslySetInnerHTML={{ __html: book.description }}
            >
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <p className="absolute bottom-2">
                {book.pages} pages | Published: {book.year}
              </p>
            </Typography>
          </div>
        </div>
      </DialogContent>
      <DialogActions sx={{ backgroundColor: teal[900] }}>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "space-between",
          }}>
          <Button
            sx={{
              backgroundColor: teal[200],
              color: teal[900],
              "&:hover": { backgroundColor: teal[300] },
            }}
            href={book.download}
            variant="none">
            Download
          </Button>
          <Button
            sx={{
              backgroundColor: teal[200],
              color: teal[900],
              "&:hover": { backgroundColor: teal[300] },
            }}
            // onClick={handleClose}
            variant="none"
            target="_blank"
            href={`${book.url}/read`}>
            Read online
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default BookDialog;
