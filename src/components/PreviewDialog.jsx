// import React from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { blueGrey } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";
import { setWriteContent } from "../store/Features/writeContent/writeContentSlice";

const PreviewDialog = ({ open, content, bookDetails, handleClose }) => {

  const dispatch = useDispatch();

  PreviewDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    content: PropTypes.array.isRequired,
    bookDetails: PropTypes.object.isRequired,
    handleClose: PropTypes.func.isRequired
  }

  
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle
        sx={{
          backgroundColor: blueGrey[900],
          color: blueGrey[50],
          fontFamily: "sans-serif",
        }}
        className="relative items-center">
        {bookDetails.name}
      </DialogTitle>
      <DialogContent dividers sx={{ backgroundColor: "white", color: "black" }}>
        <div className="px-10 py-5">
          {content.map((item, index) => {
            if (item.type === "Image") {
              return (
                <div key={item} className="flex justify-center items-center">
                  <img src={item.text} alt="img" />
                </div>
              );
            } else {
              return (
                <div key={index} className={`flex ${item.type === "Chapter" ? "justify-center" : ""} items-center`}>
                  <ContextTypography
                    item={item}
                    content={content}
                    index={index}
                  />
                </div>
              );
            }
          })}
        </div>
      </DialogContent>
      <DialogActions sx={{ backgroundColor: blueGrey[900] }}>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "space-between",
          }}>
          <Button
            sx={{
              backgroundColor: blueGrey[200],
              color: blueGrey[900],
              "&:hover": { backgroundColor: blueGrey[300] },
            }}
            onClick={()=>dispatch(setWriteContent(content))}
            variant="none">
            Save
          </Button>
          <Button
            sx={{
              backgroundColor: blueGrey[200],
              color: blueGrey[900],
              "&:hover": { backgroundColor: blueGrey[300] },
            }}
            variant="none"
            onClick={handleClose}>
            Close
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default PreviewDialog;

const ContextTypography = ({ item, content, index }) => {
  ContextTypography.propTypes = {
    item: PropTypes.any.isRequired,
    content: PropTypes.array.isRequired,
    index: PropTypes.number.isRequired,
  }

  if (item.type === "Chapter") {
    return (
      <Typography variant="h4" sx={{paddingY: "10px", fontFamily: "serif"}}>
        {`Chapter ${
          content.slice(0, index + 1).filter((it) => it.type === "Chapter")
            .length
        }: ${item.text}`}
      </Typography>
    );
  } else if (item.type === "Heading") {
    return (
      <Typography variant="h5" sx={{paddingY: "4px"}}>
        {item.text}
      </Typography>
    );
  }else if (item.type === "Subheading") {
    return (
      <Typography variant="h6" sx={{paddingY: "2px"}}>
        {item.text}
      </Typography>
    );
  } else if (item.type === "Image") {
    return (
      <img className="w-[50%] h-auto" src={item.text} alt=""/>
    );
  } else {
    return (
      <Typography sx={{paddingY: "2px"}} variant="body1">
        <>&emsp;</>
        {item.text}
      </Typography>
    );
  }
};
