import { useEffect, useMemo, useState } from "react";
import Pagination from "@mui/material/Pagination";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/Card";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { data } from "./data";
import BooksSidebar from "../../components/BooksSidebar";
import {
  fetchBooksAsync,
  fetchRecentBooksAsync,
} from "../../store/Features/fetchData/fetchDataSlice";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { pink } from "@mui/material/colors";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { setCheckedItems } from "../../store/Features/currentState/currentStateSlice";

const MenuProps = {
  PaperProps: {
    sx: {
      bgcolor: pink[100], // background color of dropdown
      "& .MuiMenuItem-root": {
        color: pink[900], // text color of menu items
      },
    },
  },
};

const Books = () => {
  const currentMode = useSelector((state) => state.currentState.currentMode);
  const checkedItems = useSelector((state) => state.currentState.checkedItems);
  const books = useSelector((state) => state.fetchData.books);
  const [page, setPage] = useState(1);
  const [checked, setChecked] = useState(checkedItems ?? []);
  const [filter, setFilter] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const dispatch = useDispatch();

  const handleChange = (_, value) => {
    console.log(value);
    setPage(value);
  };

  useEffect(() => {
    if (books == null) {
      dispatch(fetchRecentBooksAsync());
    }
  }, [books, dispatch]);

  const filteredBooks = useMemo(() => {
    if (filter === "" || filterValue === "") return books;
    return books.filter((book) =>
      book[filter]?.toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [books, filter, filterValue]);

  const pagesCount = useMemo(() => Math.ceil(filteredBooks ? filteredBooks.length / 20 : 0), [filteredBooks]);

  useEffect(() => {
    dispatch(setCheckedItems(checked));
    if (checked.length > 0) {
      dispatch(fetchBooksAsync(checked));
    } else {
      dispatch(fetchRecentBooksAsync());
    }
  }, [checked, dispatch]);

  const handleCheck = (value) => {
    setChecked((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  return (
    <div>
      <div className="w-full h-20 bg-background-500 flex"></div>
      <div className="sm:w-1/5 px-2 fixed h-screen overflow-y-scroll no-scrollbar hidden sm:flex">
        <BooksSidebar data={data} checked={checked} setChecked={setChecked} />
      </div>
      <div className="flex w-full min-h-screen mt-2">
        <div className="sm:w-1/5 px-2"></div>
        <div className="w-full sm:w-4/5 mx-2 my-2 flex-grow flex flex-col">
          <div className="mx-auto flex flex-right max-w-screen-lg justify-center px-2 pb-4">
            <FormControl sx={{ minWidth: 120 }} size="small">
              <InputLabel
                id="demo-select-small-label"
                sx={{
                  color: pink[500],
                  "&.Mui-focused": { color: pink[500] },
                }}>
                Filter By
              </InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={filter}
                label="Filter By"
                onChange={(e) => setFilter(e.target.value)}
                MenuProps={MenuProps}
                sx={{
                  color: pink[500],
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: pink[500],
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: pink[500],
                  },
                }}>
                <MenuItem value={""}></MenuItem>
                <MenuItem value={"authors"}>Author</MenuItem>
                <MenuItem value={"title"}>Title</MenuItem>
              </Select>
            </FormControl>
            <div className="relative w-full flex items-center px-2">
              <SearchRoundedIcon className="absolute left-4 text-foregroundReverse" />
              <input
                type="text"
                placeholder="Filter by..."
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                className="h-full w-full pl-12 pr-4 rounded-lg focus:outline-none bg-pink-600 text-foregroundReverse"
              />
            </div>
          </div>
          <div className="mx-auto flex flex-wrap max-w-screen-lg justify-center px-2 pb-4 sm:gap-2 sm:px-4">
            {checked &&
              Array.isArray(checked) &&
              checked.map((item) => (
                <div key={item}>
                  <p className="text-md flex p-1 bg-pink-600 rounded-xl">
                    #{item}
                    <DeleteForeverRoundedIcon
                      className="cursor-pointer transition hover:scale-105"
                      onClick={() => handleCheck(item)}
                    />
                  </p>
                </div>
              ))}
          </div>
          <div className="mx-auto grid max-w-screen-lg justify-center px-4 xsm:grid-col-1 sm:grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {books &&
              books
                .filter((book) => {
                  if (filter != "" && filterValue != "") {
                    return book[filter]
                      .toLowerCase()
                      .includes(filterValue.toLocaleLowerCase());
                  }
                  return true;
                })
                .slice((page - 1) * 20, page * 20)
                .map((book) => <Card key={book.id} book={book} />)}
          </div>
          <div className="w-full mx-auto flex justify-center items-center">
            {books && books.length == 0 && (
              <p className="text-foreground text-2xl text-mono w-fit">
                Books not Found!!!
              </p>
            )}
          </div>
          {books && books.length > 0 && (<Pagination
            page={page}
            onChange={handleChange}
            count={pagesCount}
            variant="outlined"
            shape="rounded"
            className="pt-10"
            sx={{
              "& .MuiPagination-ul": {
                justifyContent: "center",
              },
              "& .MuiPaginationItem-root": {
                color: currentMode === "dark" ? "white" : "black",
                borderColor: currentMode === "dark" ? "white" : "black",
              },
              "& .Mui-selected": {
                backgroundColor: "teal",
                color: currentMode === "dark" ? "white" : "black",
              },
            }}
          />)}
        </div>
      </div>
    </div>
  );
};

export default Books;
