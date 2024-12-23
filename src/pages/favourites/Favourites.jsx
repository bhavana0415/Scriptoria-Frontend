import { useSelector } from "react-redux";
import Card from "../../components/Card";

const Favourites = () => {
  const favourites = useSelector((state) => state.favourites.favourites);

  return (
    <div className="min-h-screen">
      <div className="w-full h-20 bg-background-500 flex"></div>
      <div className="mx-auto mt-2 grid max-w-screen-lg justify-center px-4 sm:grid-cols-2 sm:gap-4 sm:px-8 md:grid-cols-4 custom:grids-cols-3">
        {favourites.map((book, index) => (
          <Card type={"mongo"} key={index} book={book} />
        ))}
      </div>
      <div className="w-full flex justify-center">
        {favourites.length === 0 && (
          <span className="text-foreground text-2xl text-mono">
            No Favourite Books!!!
          </span>
        )}
      </div>
    </div>
  );
};

export default Favourites;
