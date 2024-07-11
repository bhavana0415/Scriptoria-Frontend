import React, { useEffect, useState } from 'react'
import Pagination from '@mui/material/Pagination';
import { useSelector } from 'react-redux';
import { fetchBooks } from '../../api/gutendexAPI/api'
import Card from '../../components/Card';

const Books = () => {

  const [books, setBooks] = useState([]);
  const [pagesCount, setPagesCount] = useState(0);
  const [page, setPage] = useState(1);

  const currentMode = useSelector((state) => state.currentState.currentMode);

  const handleChange = (event) => {
    setPage(event.taget.value);
  };

  useEffect(() => {

    const getBooks = async () => {
      const books = await fetchBooks();
      setBooks(books.results);
      setPagesCount(Math.ceil(books.count / 32));
    }
    getBooks();
  }, [])

  return (
    <div>
      <div className="w-full h-20 bg-background-500"></div>
      <div className="mx-auto max-w-screen-lg">
        <div className="mx-auto grid max-w-screen-lg justify-center px-4 sm:grid-cols-2 sm:gap-4 sm:px-8 md:grid-cols-4">
          {books.map((book) => (
            <>
              <Card image={book.formats["image/jpeg"]} rating={book["download_count"]} title={book.title} autho={books.authors} />
            </>
          ))}
        </div>
      </div>
      <Pagination
        page={page}
        onChange={handleChange}
        count={pagesCount}
        variant="outlined"
        shape="rounded"
        className=''
        sx={{
          '& .MuiPagination-ul': {
            justifyContent: 'center', // Centers the pagination items horizontally
          },
          '& .MuiPaginationItem-root': {
            color: currentMode === 'dark' ? 'white' : 'black',
            borderColor: currentMode === 'dark' ? 'white' : 'black',
          },
          '& .Mui-selected': {
            backgroundColor: 'grey',
            color: currentMode === 'dark' ? 'white' : 'black',
          },
        }}
      />
    </div>
  )
}

export default Books
