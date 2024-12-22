import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";
import MyCard from "../../components/MyCard";
import Write from "../write/Write";
import CreateIcon from "@mui/icons-material/Create";

const MyBooks = () => {
  const books = useSelector((state) => state.writeContent.books);
  console.log(books);
  const [editingBook, setEditingBook] = useState(null);

  const handleEditClick = (book) => {
    setEditingBook(book); // Set the book to be edited
  };

  return (
    <div className="min-h-screen w-[100%]">
      <div className="w-full h-20 bg-background-500 flex items-center"></div>
      <div className="w-[100%] flex flex-col items-center justify-center">
        {editingBook ? (
          // Render EditBook component if editingBook is set
          <EditBook
            bookContent={editingBook.data.content}
            book_id={editingBook._id}
            bookDetails={editingBook.data.bookDetails}
          />
        ) : (
          <>
            {books.length > 0 && (
              <>
                {books.map((book) => (
                  <div key={book.id} className="relative min-w-[550px]">
                    <button
                      className="absolute top-0 right-2 text-white rounded-full p-2 transition-transform transform hover:scale-125"
                      onClick={() => handleEditClick(book)}>
                      <CreateIcon fontSize="small" />
                    </button>
                    <MyCard
                      bookDetails={book.data.bookDetails}
                      bookContent={editingBook.data.content}
                    />
                  </div>
                ))}
              </>
            )}

            <a
              href="/write"
              className="font-medium text-foreground border-2 border-cyan-500 rounded p-4 transform transition-transform duration-300 hover:scale-105 cursor-pointer">
              Write your own new book
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default MyBooks;

const EditBook = ({ bookContent, book_id, bookDetails }) => {
  return (
    <div className="w-[100%]">
      <Write
        bookContent={bookContent}
        book_id={book_id}
        bookDetails={bookDetails}
      />
    </div>
  );
};
