import NorthEastIcon from "@mui/icons-material/NorthEast";

const Welcome = () => {
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="size-96">
            <path
              fill="currentColor"
              d="M64 480H48a32 32 0 0 1-32-32V112a32 32 0 0 1 32-32h16a32 32 0 0 1 32 32v336a32 32 0 0 1-32 32m176-304a32 32 0 0 0-32-32h-64a32 32 0 0 0-32 32v28a4 4 0 0 0 4 4h120a4 4 0 0 0 4-4ZM112 448a32 32 0 0 0 32 32h64a32 32 0 0 0 32-32v-30a2 2 0 0 0-2-2H114a2 2 0 0 0-2 2Z"></path>
            <rect
              width="128"
              height="144"
              x="112"
              y="240"
              fill="currentColor"
              rx="2"
              ry="2"></rect>
            <path
              fill="currentColor"
              d="M320 480h-32a32 32 0 0 1-32-32V64a32 32 0 0 1 32-32h32a32 32 0 0 1 32 32v384a32 32 0 0 1-32 32m175.89-34.55l-32.23-340c-1.48-15.65-16.94-27-34.53-25.31l-31.85 3c-17.59 1.67-30.65 15.71-29.17 31.36l32.23 340c1.48 15.65 16.94 27 34.53 25.31l31.85-3c17.59-1.67 30.65-15.71 29.17-31.36"></path>
          </svg>
        </section>
      </article>
      <section className="w-full flex justify-center items-center py-4">
        <a
          href="/library"
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

export default Welcome;
