import { useDispatch, useSelector } from "react-redux";
import { forwardRef, useState } from "react";
import MyCard from "../../components/MyCard";
import Write from "../write/Write";
import CreateIcon from "@mui/icons-material/Create";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { deleteBookAsync } from "../../store/Features/writeContent/writeContentSlice";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Button } from "@mui/material";

const MyBooks = () => {
  const books = useSelector((state) => state.writeContent.books);
  const [editingBook, setEditingBook] = useState(null);
  const [open, setOpen] = useState(false);
  const [deleteBook, setDeleteBook] = useState(null);

  const dispatch = useDispatch();

  const handleEditClick = (book) => {
    setEditingBook(book);
  };

  const handleDeleteClick = (book) => {
    setOpen(true);
    setDeleteBook(book);
  };

  const handleClose = () => {
    setOpen(false);
    setDeleteBook(null);
  };

  const deleteBookConfirm = (book) => {
    const data = {
      bookId: book._id,
      user: book.user,
    };
    dispatch(deleteBookAsync(data));
    setOpen(false);
  };

  return (
    <div className="min-h-screen w-[100%]">
      <div className="w-[100%] flex flex-col items-center justify-center">
        {editingBook ? (
          <EditBook
            bookContent={editingBook.data.content}
            book_id={editingBook._id}
            bookDetails={editingBook.data.bookDetails}
            setEditingBook={setEditingBook}
          />
        ) : (
          <>
            <div className="w-full mt-20 bg-background-500 flex flex-wrap justify-center items-center">
              {books.length > 0 &&
                books.map((book, index) => (
                  <div
                    key={index}
                    className="relative min-w-[350px] flex justify-center">
                    <button
                      className="absolute top-0 right-3 text-white rounded-full p-2 transition-transform transform hover:scale-125"
                      onClick={() => handleDeleteClick(book)}
                      aria-label="Delete Book"
                      role="button"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          handleDeleteClick(book);
                        }
                      }}>
                      <DeleteForeverIcon
                        fontSize="small"
                        className="text-foreground"
                      />
                    </button>
                    <button
                      className="absolute bottom-6 right-3 text-white rounded-full p-2 transition-transform transform hover:scale-125"
                      onClick={() => handleEditClick(book)}
                      aria-label="Edit Book"
                      role="button"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          handleEditClick(book);
                        }
                      }}>
                      <CreateIcon
                        fontSize="small"
                        className="text-foreground"
                      />
                    </button>
                    <MyCard
                      bookDetails={book.data.bookDetails}
                      bookContent={book.data.content}
                      setEditingBook={setEditingBook}
                    />
                  </div>
                ))}
            </div>
            <a
              href="/write"
              className="font-medium text-foreground border-2 border-cyan-500 rounded p-4 transform transition-transform duration-300 hover:scale-105 cursor-pointer">
              Write your own new book
            </a>
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
          </>
        )}
      </div>
    </div>
  );
};

export default MyBooks;

const EditBook = ({ bookContent, book_id, bookDetails, setEditingBook }) => {
  return (
    <div className="w-[100%]">
      <Write
        bookContent={bookContent}
        book_id={book_id}
        bookDetails={bookDetails}
        setEditingBook={setEditingBook}
      />
    </div>
  );
};

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
