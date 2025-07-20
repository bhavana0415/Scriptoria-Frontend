import PropTypes from "prop-types";

import Write from "../write/Write";

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

EditBook.propTypes = {
  bookContent: PropTypes.arrayOf(PropTypes.any).isRequired,
  book_id: PropTypes.string.isRequired,
  bookDetails: PropTypes.any.isRequired,
  setEditingBook: PropTypes.func.isRequired,
};

export default EditBook;
