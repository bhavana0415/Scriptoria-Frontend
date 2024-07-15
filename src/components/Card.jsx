import { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useDispatch, useSelector } from "react-redux";
import {
  setFavourites,
  setIsLoading,
} from "../store/Features/currentState/currentStateSlice";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import BookDialog from "./BookDialog";
import { fetchBooks } from "../api/dbBooks/api";

const Card = ({ key, book }) => {
  const [rating, setRating] = useState(3);
  const [open, setOpen] = useState(false);
  const [bookDetails, setBookDetails] = useState(null);
  const dispatch = useDispatch();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const favourites = useSelector((state) => state.currentState.favourites);

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
        console.log(response);
        setBookDetails(response);
        setOpen(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const checkIfFav = () => {
    const favs = [...favourites];
    return favs.findIndex((f) => f.id === book.id) !== -1;
  };

  const addFavourite = () => {
    dispatch(setFavourites([...favourites, book]));
  };

  const removeFavourite = () => {
    const favs = favourites.filter((f) => f.id != book.id);
    dispatch(setFavourites(favs));
  };

  useEffect(() => {
    setRating(calculateRating(Number(book.id.replace(/\D/g, ""))));
  }, [book.id]);

  return (
    <div key={key} className="justify-center items-center shadow-sm shadow-cyan-500 p-4 rounded-lg">
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
                <>
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
                </>
              ))}
          {rating < 5 &&
            Array(5 - rating)
              .fill(0)
              .map((_, ind) => (
                <>
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
                </>
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
    </div>
  );
};

export default Card;
