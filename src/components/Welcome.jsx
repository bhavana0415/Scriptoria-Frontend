import NorthEastIcon from "@mui/icons-material/NorthEast";
import ebookImg from "/ebook.svg";

export const Welcome = () => {
  return (
    <section className="pt-20">
      <article className="flex flex-row justify-center items-center">
        <section className="lg:w-3/5 w-full relative mx-auto flex flex-col text-center items-center justify-center sm:max-w-screen-sm md:max-w-screen-md">
          <h2 className="bg-clip-text text-3xl font-extrabold text-gray-500 sm:text-5xl">
            Get Your OWN Collection
          </h2>
          <h2 className="bg-gradient-to-r from-pink-500 to-indigo-500 bg-clip-text text-4xl font-extrabold text-transparent sm:text-6xl">
            Find & Download books Online for free!!!
          </h2>
          <h2 className="bg-gradient-to-r from-pink-700 to-indigo-700 bg-clip-text text-4xl font-extrabold text-transparent sm:text-6xl">
            Wide range of books available
          </h2>
        </section>
        <section className="lg:w-2/5 lg:flex hidden flex items-center">
          <img
            src={ebookImg}
            alt="eBooks"
            className="object-contain"
            width={"75%"}
            height={"75%"}
          />
        </section>
      </article>
      <section className="w-full flex justify-center items-center py-4">
        <a
          href="/books"
          aria-label="Navigate to books page"
          className="shadow-pink-600/30 mt-10 mx-2 inline-flex h-12 items-center rounded-full bg-pink-500 px-6 py-3 text-xl font-light text-white shadow-md transition hover:translate-y-1 hover:scale-105 hover:bg-pink-600 hover:shadow-lg">
          Start Reading <NorthEastIcon />
        </a>
        <a
          href="/write"
          aria-label="Navigate to writing page"
          className="shadow-pink-600/30 mt-10 mx-2 inline-flex h-12 items-center rounded-full bg-indigo-500 px-6 py-3 text-xl font-light text-white shadow-md transition hover:translate-y-1 hover:scale-105 hover:bg-indigo-600 hover:shadow-lg">
          Start Writing <NorthEastIcon />
        </a>
      </section>
    </section>
  );
};
