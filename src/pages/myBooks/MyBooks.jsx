import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import CreateIcon from "@mui/icons-material/Create";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import MyCard from "../../components/MyCard";
import EditBook from "./EditBook";
import DeleteBook from "./DeleteBook";

import { deleteBookAsync } from "../../store/Features/writeContent/writeContentSlice";

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
            <DeleteBook
              open={open}
              handleClose={handleClose}
              deleteBookConfirm={deleteBookConfirm}
              deleteBook={deleteBook}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default MyBooks;
