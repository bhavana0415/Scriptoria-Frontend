import { useRef, useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { blueGrey } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import {
  addBookAsync,
  updateBookAsync,
} from "../store/Features/writeContent/writeContentSlice";
import { showAlert } from "../store/Features/alert/alertSlice";

const PreviewDialog = ({
  open,
  content,
  handleClose,
  book_id,
  bookDetails,
  isPreview,
  setEditingBook,
}) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const imageInputRef = useRef(null);
  const navigate = useNavigate();
  const [formOpen, setFormOpen] = useState(false);
  const [image, setImage] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [myBookDetails, setBookDetails] = useState(
    bookDetails
      ? bookDetails
      : {
          bookName: "",
          image: "",
          description: "",
        }
  );
  const [errors, setErrors] = useState([]);
  const pdfRef = useRef();

  const handleFormOpen = () => setFormOpen(true);
  const handleFormClose = () => setFormOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const { bookName, image, description } = myBookDetails;

    if (!bookName || !image || !description) {
      setErrors(() => {
        let errs = [];
        if (!bookName) errs.push("bookName");
        if (!image) errs.push("image");
        if (!description) errs.push("description");
        return errs;
      });
      dispatch(
        showAlert({
          severity: "error",
          message: `Please fill all fields!`,
        })
      );
      return;
    }

    if (!book_id) {
      const data = {
        data: {
          bookDetails: myBookDetails,
          content,
        },
        user: user.userId,
      };
      dispatch(addBookAsync({ ...data }));
      navigate("/inkwell");
    } else {
      const data = {
        data: {
          bookDetails: myBookDetails,
          content,
        },
        bookId: book_id,
        user: user.userId,
      };
      dispatch(updateBookAsync({ ...data }));
    }
    setFormOpen(false);
    handleClose();
    setEditingBook(null);
  };

  const handleLabelClick = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  const convertImage = useCallback(async (file) => {
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "scriptoria");
    data.append("cloud_name", "dpmtu5hlx");

    const url = "https://api.cloudinary.com/v1_1/dpmtu5hlx/image/upload";
    try {
      setUploadingImage(true);
      const res = await fetch(url, {
        method: "POST",
        body: data,
      });

      const uploadedImageURL = await res.json();
      setImage(uploadedImageURL.secure_url);
      setBookDetails((prev) => ({
        ...prev,
        image: uploadedImageURL.secure_url,
      }));
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploadingImage(false);
    }
  }, []);

  function downloadBook() {
    let jsPdf = new jsPDF("p", "pt", "letter");
    var htmlElement = pdfRef.current.cloneNode(true);
    htmlElement.style.width = "1000px";

    const opt = {
      callback: function (jsPdf) {
        jsPdf.setTextColor(0, 0, 0);
        jsPdf.save(`${myBookDetails.bookName}.pdf`);
      },
      margin: [20, 20, 20, 20],
      autoPaging: "text",
      html2canvas: {
        allowTaint: true,
        dpi: 100,
        letterRendering: true,
        logging: false,
        scale: 0.57,
      },
    };

    jsPdf.html(htmlElement, opt);
  }

  useEffect(() => {
    const handlePaste = (event) => {
      const items = event.clipboardData?.items;
      if (!items) return;

      for (const item of items) {
        if (item.type.indexOf("image") !== -1) {
          const blob = item.getAsFile();
          const reader = new FileReader();
          reader.onload = (e) => {
            convertImage(e.target.result);
          };
          reader.readAsDataURL(blob);
        }
      }
    };

    window.addEventListener("paste", handlePaste);
    return () => {
      window.removeEventListener("paste", handlePaste);
    };
  }, [convertImage]);

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle
          sx={{
            backgroundColor: blueGrey[900],
            color: blueGrey[50],
            fontFamily: "sans-serif",
          }}>
          Preview
        </DialogTitle>
        <DialogContent
          dividers
          sx={{ backgroundColor: "white", color: "black" }}>
          <div className="px-10 py-5" ref={pdfRef}>
            {content &&
              content.map((item, index) => {
                if (item.type === "Image") {
                  return (
                    <div
                      key={index}
                      className="flex justify-center items-center">
                      <img src={item.text} alt="img" />
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={index}
                      className={`flex ${
                        item.type === "Chapter" ? "justify-center" : ""
                      } items-center text-black`}>
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
            {isPreview ? (
              <Button
                sx={{
                  backgroundColor: blueGrey[200],
                  color: blueGrey[900],
                  "&:hover": { backgroundColor: blueGrey[300] },
                }}
                onClick={downloadBook}>
                Download
              </Button>
            ) : (
              <Button
                sx={{
                  backgroundColor: blueGrey[200],
                  color: blueGrey[900],
                  "&:hover": { backgroundColor: blueGrey[300] },
                }}
                aria-label="Handle form"
                role="button"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    bookDetails ? handleSave() : handleFormOpen();
                  }
                }}
                onClick={bookDetails ? handleSave : handleFormOpen}>
                Save
              </Button>
            )}
            <Button
              sx={{
                backgroundColor: blueGrey[200],
                color: blueGrey[900],
                "&:hover": { backgroundColor: blueGrey[300] },
              }}
              onClick={handleClose}>
              Close
            </Button>
          </Box>
        </DialogActions>
      </Dialog>

      <Dialog open={formOpen} onClose={handleFormClose} fullWidth maxWidth="sm">
        <DialogTitle
          sx={{
            backgroundColor: blueGrey[900],
            color: blueGrey[50],
            fontFamily: "sans-serif",
          }}>
          Book Details
        </DialogTitle>
        <DialogContent
          dividers
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Book Name *"
            name="bookName"
            value={myBookDetails.bookName}
            onChange={handleInputChange}
            error={errors.includes("bookName")}
            helperText={errors.includes("bookName") ? "Required" : ""}
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: errors.includes("bookName") ? "red" : "default",
                },
                "&:hover fieldset": {
                  borderColor: errors.includes("bookName") ? "red" : "default",
                },
                "&.Mui-focused fieldset": {
                  borderColor: errors.includes("bookName")
                    ? "red"
                    : "primary.main",
                },
              },
            }}
          />
          <div
            className={`w-full mb-4 p-4 relative border-2 border-${
              errors.includes("image") ? "red-500" : "cyan-500"
            } rounded-md flex flex-col justify-center items-center`}>
            <input
              ref={imageInputRef}
              type="file"
              accept=".png, .jpg, .jpeg"
              onChange={(e) =>
                e.target.files && convertImage(e.target.files[0])
              }
              style={{
                display: "none",
              }}
            />
            {image === "" && !uploadingImage && (
              <>
                <label
                  onClick={handleLabelClick}
                  aria-label="Chose cover"
                  role="button"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleLabelClick();
                    }
                  }}
                  className="custom-file-input-label w-36 h-8 border border-cyan-500 rounded-md flex items-center justify-center cursor-pointer"
                  htmlFor="customFile">
                  Choose cover
                </label>
                <p className="w-full text-center"> - Or - </p>
                <textarea
                  className="w-full rounded-[7px] border border-cyan-500 bg-transparent px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-cyan-500 focus:border-t-transparent focus:outline-none disabled:border-0"
                  rows="1"
                  placeholder="Paste an image (Ctrl+V or Cmd+V) here..."
                  style={{ overflow: "hidden" }}
                />
              </>
            )}
            {image !== "" && !uploadingImage && (
              <div className="relative w-fit">
                <div style={{ display: "inline-block" }}>
                  <img
                    src={image}
                    alt="Uploaded"
                    className="rounded-lg border border-cyan-500 w-auto"
                  />
                </div>
                <button
                  onClick={() => setImage("")}
                  aria-label="Set Image Empty"
                  role="button"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setImage("");
                    }
                  }}
                  className="absolute top-0 right-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </button>
              </div>
            )}
            {uploadingImage && (
              <div className="text-base flex">
                <p className="w-6 h-6 rounded-full animate-spin border-4 border-solid border-pink-500 border-t-transparent"></p>
                Uploading...
              </div>
            )}
          </div>
          <TextField
            label="Description *"
            name="description"
            value={myBookDetails.description}
            onChange={handleInputChange}
            error={errors.includes("description")}
            helperText={errors.includes("description") ? "Required" : ""}
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: errors.includes("description")
                    ? "red"
                    : "default",
                },
                "&:hover fieldset": {
                  borderColor: errors.includes("description")
                    ? "red"
                    : "default",
                },
                "&.Mui-focused fieldset": {
                  borderColor: errors.includes("description")
                    ? "red"
                    : "primary.main",
                },
              },
            }}
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions sx={{ backgroundColor: blueGrey[900] }}>
          <Button
            sx={{
              backgroundColor: blueGrey[200],
              color: blueGrey[900],
              "&:hover": { backgroundColor: blueGrey[300] },
            }}
            aria-label="Handle Save"
            role="button"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleSave();
              }
            }}
            onClick={handleSave}>
            Save
          </Button>
          <Button
            sx={{
              backgroundColor: blueGrey[200],
              color: blueGrey[900],
              "&:hover": { backgroundColor: blueGrey[300] },
            }}
            onClick={handleFormClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

PreviewDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  content: PropTypes.arrayOf(PropTypes.any).isRequired,
  handleClose: PropTypes.func.isRequired,
  book_id: PropTypes.string,
  bookDetails: PropTypes.any,
  isPreview: PropTypes.bool,
  setEditingBook: PropTypes.func.isRequired,
};

export default PreviewDialog;

const ContextTypography = ({ item, content, index }) => {
  ContextTypography.propTypes = {
    item: PropTypes.any.isRequired,
    content: PropTypes.array.isRequired,
    index: PropTypes.number.isRequired,
  };

  if (item.type === "Chapter") {
    return (
      <Typography
        variant="h4"
        sx={{ marginTop: "4px", paddingY: "10px", fontFamily: "serif" }}>
        {`Chapter ${
          content.slice(0, index + 1).filter((it) => it.type === "Chapter")
            .length
        }: ${item.text}`}
      </Typography>
    );
  } else if (item.type === "Heading") {
    return (
      <Typography variant="h5" sx={{ marginTop: "4px", paddingY: "4px" }}>
        {item.text}
      </Typography>
    );
  } else if (item.type === "Subheading") {
    return (
      <Typography variant="h6" sx={{ marginTop: "4px", paddingY: "2px" }}>
        {item.text}
      </Typography>
    );
  } else if (item.type === "Image") {
    return (
      <img className="w-[50%] h-auto" src={item.text} alt="out book image" />
    );
  } else {
    return (
      <Typography sx={{ marginTop: "4px", paddingY: "2px" }} variant="body1">
        <div style={{ whiteSpace: "pre-line" }}>{item.text}</div>
      </Typography>
    );
  }
};
