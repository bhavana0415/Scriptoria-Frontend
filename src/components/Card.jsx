import { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading } from "../store/Features/currentState/currentStateSlice";
import BookDialog from "./BookDialog";
import { fetchBooks } from "../api/dbBooks/api";
import Snackbar from "@mui/material/Snackbar";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  addFavouriteAsync,
  deleteFavouriteAsync,
} from "../store/Features/favourites/favouritesSlice";
import { addRecentAsync } from "../store/Features/recentlyViewed/recentlyViewedSlice";

const Card = ({ book, type }) => {
  if (type == "mongo") {
    book = {
      ...book,
      id: book.book_id,
    };
  } else {
    book = {
      ...book,
      id: book.id,
    };
  }
  const user = useSelector((state) => state.auth.user);
  const [rating, setRating] = useState(3);
  const [open, setOpen] = useState(false);
  const [notificatioOpen, setNotificatioOpen] = useState(false);
  const [bookDetails, setBookDetails] = useState(null);
  const dispatch = useDispatch();

  const favourites = useSelector((state) => state.favourites.favourites);
  const recentlyViewed = useSelector(
    (state) => state.recentlyViewed.recentlyViewed
  );

  const calculateRating = (num) => {
    while (num >= 10) {
      let sum = 0;
      while (num > 0) {
        sum += num % 10;
        num = Math.floor(num / 10);
      }
      num = sum;
    }
    return num > 5 ? Math.ceil(num / 2) : num;
  };

  const handleClickOpen = async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await fetchBooks(`book/${book.id}`);
      if (response) {
        setBookDetails(response);
        setOpen(true);
        addToRecent();
      } else {
        setNotificatioOpen(true);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const addToRecent = () => {
    if (recentlyViewed.findIndex((bk) => bk.book_id === book.id) == -1) {
      const data = {
        book_id: book.id,
        title: book.title,
        subtitle: book.subtitle,
        authors: book.authors,
        image: book.image,
        url: book.url,
        user: user.userId,
      };
      dispatch(addRecentAsync({ ...data }));
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const checkIfFav = () => {
    const favs = [...favourites];
    return favs.findIndex((f) => f.book_id === book.id) !== -1;
  };

  const addFavourite = () => {
    const data = {
      book_id: book.id,
      title: book.title,
      subtitle: book.subtitle,
      authors: book.authors,
      image: book.image,
      url: book.url,
      user: user.userId,
    };
    dispatch(addFavouriteAsync({ ...data }));
  };

  const removeFavourite = () => {
    const remBook =
      favourites[favourites.findIndex((f) => f.book_id === book.id)];
    const data = {
      book_id: remBook._id,
      user: user.userId,
    };
    dispatch(deleteFavouriteAsync({ ...data }));
  };

  useEffect(() => {
    if (book?.id) {
      setRating(calculateRating(Number(book.id.replace(/\D/g, ""))));
    }
  }, [book.id]);

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => setNotificatioOpen(false)}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <div
      key={book.id}
      className="justify-center items-center shadow-sm shadow-cyan-500 p-4 rounded-lg h-full max-w-[350px]">
      <div className={`relative rounded-xl flex flex-col h-full`}>
        <button onClick={handleClickOpen}>
          <div className="relative transform transition duration-500 hover:scale-105 flex items-center justify-center overflow-hidden rounded-xl bg-fuchsia-300 h-64">
            <img
              className="object-fill w-full h-full"
              src={book.image}
              alt="Book Cover"
            />
          </div>
        </button>
        <h3 className="my-1 text-sm font-mono pb-4">{book.title}</h3>
        <div className="absolute bottom-0 w-full flex items-end">
          {rating > 0 &&
            Array(rating)
              .fill(0)
              .map((_, ind) => (
                <svg
                  key={ind}
                  className="block h-3 w-3 align-middle text-yellow-500 sm:h-4 sm:w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    className=""></path>
                </svg>
              ))}
          {rating < 5 &&
            Array(5 - rating)
              .fill(0)
              .map((_, ind) => (
                <svg
                  key={ind}
                  className="block h-3 w-3 align-middle text-gray-400 sm:h-4 sm:w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    className=""></path>
                </svg>
              ))}

          {checkIfFav() ? (
            <FavoriteIcon
              fontSize="small"
              className="absolute cursor-pointer right-0 transition hover:scale-105"
              onClick={removeFavourite}
            />
          ) : (
            <FavoriteBorderIcon
              fontSize="small"
              className="absolute cursor-pointer right-0 transition hover:scale-105"
              onClick={addFavourite}
            />
          )}
        </div>
      </div>
      {open && (
        <BookDialog open={open} handleClose={handleClose} book={bookDetails} />
      )}
      {notificatioOpen && (
        <Snackbar
          open={notificatioOpen}
          autoHideDuration={3000}
          onClose={() => setNotificatioOpen(false)}
          message="Unable to fetch Book"
          action={action}
        />
      )}
    </div>
  );
};

export default Card;
