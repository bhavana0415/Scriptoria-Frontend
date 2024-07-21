import { useSelector } from "react-redux";
import Card from "../../components/Card";

const Favourites = () => {
  const favourites = useSelector((state) => state.favourites.favourites);

  return (
    <>
      <div className="w-full h-20 bg-background-500 flex"></div>
      <div className="w-full"></div>
      <div className="mx-auto mt-2 grid max-w-screen-lg min-h-screen justify-center px-4 sm:grid-cols-2 sm:gap-4 sm:px-8 md:grid-cols-4 custom:grids-cols-3">
        {favourites.map((book) => (
            <Card key={book.id} book={book} />
        ))}
      </div>
    </>
  );
};

export default Favourites;
