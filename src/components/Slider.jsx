import { useState } from "react";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
import { useSelector } from "react-redux";
import DrawIcon from "@mui/icons-material/Draw";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import PublishIcon from "@mui/icons-material/Publish";
import CelebrationIcon from "@mui/icons-material/Celebration";
import { Link } from "react-router-dom";
import authorImg from "/author.svg";

const images = [
  "https://www.dbooks.org/img/books/5591710361s.jpg",
  "https://www.dbooks.org/img/books/1735831719s.jpg",
  "https://www.dbooks.org/img/books/5616401585s.jpg",
];

export default function Slider() {
  const currentMode =
    useSelector((state) => state.currentState.currentMode) ?? "dark";

  const [current, setCurrent] = useState(0);

  const getBGColor = (mode, current) => {
    let from;
    switch (current) {
      case 0:
        from = "green";
        break;
      case 1:
        from = "pink";
        break;
      case 2:
        from = "cyan";
        break;
      case 3:
        from = "purple";
        break;
    }
    let to;
    switch (current) {
      case 0:
        to = "sky";
        break;
      case 1:
        to = "rose";
        break;
      case 2:
        to = "teal";
        break;
      case 3:
        to = "indigo";
        break;
    }
    const style = `
      text-${currentMode != "dark" ? "black" : "white"} bg-gradient-to-r 
      ${mode == "dark" ? `from-${from}-900` : `from-${from}-100`} 
      ${mode == "dark" ? `to-${to}-800` : `to-${to}-200`}

      `;

    return style;
  };
  const previousSlide = () => {
    setCurrent((prev) => {
      if (prev == 0) {
        return 3;
      }
      return (prev - 1) % 4;
    });
  };

  const nextSlide = () => {
    setCurrent((prev) => {
      if (prev == 3) {
        return 0;
      }
      return (prev + 1) % 4;
    });
  };

  return (
    <>
      <div className="flex mx-auto flex justify-center items-center h-fit">
        <div className="w-10% h-auto flex justify-center items-center">
          <button onClick={previousSlide} className="focus:outline-none">
            <ArrowCircleLeftRoundedIcon sx={{ fontSize: 40 }} />
          </button>
        </div>
        <div
          className={`overflow-hidden w-[90%] rounded-3xl h-fit ${getBGColor(
            currentMode,
            current
          )}`}>
          <div
            className="flex transition-transform ease-out duration-[1000ms]"
            style={{
              transform: `translateX(-${current * 100}%)`,
            }}>
            <article className={`min-w-full flex items-center justify-center`}>
              <div className="w-full max-w-screen-lg mx-auto p-8 text-foreground">
                <section className="p-2 flex flex-col md:max-w-5xl shadow-lg rounded-lg">
                  <p className="mb-6 block text-2xl font-medium text-foreground-700 flex">
                    For Readers:{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-8 h-full">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                      />
                    </svg>
                  </p>
                  <p className="mb-6 text-foreground-300 text-lg">
                    Dive into a world of endless knowledge. From groundbreaking
                    scientific discoveries and insightful historical analyses to
                    practical guides and academic resources, find your next
                    great read anytime, anywhere.
                  </p>
                </section>
                <section className="p-2 flex flex-col md:max-w-5xl shadow-lg rounded-lg">
                  <p className="mb-6 block text-2xl font-medium text-foreground-700 flex justify-end">
                    For Writers:{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-8 h-full">
                      <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                      <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                    </svg>
                  </p>
                  <p className="mb-6 text-foreground-300 text-lg text-right">
                    Share your educational content with the world. Upload your
                    manuscripts to our platform, connect with a community of
                    dedicated learners, and watch your influence grow. Gain
                    valuable feedback and insights to refine your work.
                  </p>
                </section>
              </div>
            </article>
            <article className={`min-w-full flex items-center justify-center`}>
              <section className="w-full md:w-3/5 grid gap-1 grid-cols-3 px-4">
                {images.map((img, ind) => (
                  <Link
                    to={"books"}
                    key={ind}
                    className={`rounded-xl transition duration-500 hover:scale-105 mt-${
                      ind * 4
                    } relative flex overflow-hidden h-80 sm:h-72`}>
                    <img
                      className="object-cover w-full h-full"
                      src={img}
                      alt="Book Cover"
                    />
                  </Link>
                ))}
              </section>
              <section className="w-full md:w-2/5 px-4 flex flex-col justify-center items-center text-center">
                <p className="text-lg">
                  Whether you&apos;re looking for your next great read or just
                  browsing, our selection of books has something for everyone.
                  Discover your new favorite book today!
                </p>
                <Link
                  to={"books"}
                  className="shadow-pink-600/30 mt-10 mx-2 inline-flex h-12 items-center rounded-full bg-slate-500 px-6 py-4 text-xl font-light text-white shadow-md transition hover:translate-y-1 hover:scale-105 hover:bg-slate-600 hover:shadow-lg">
                  Browse Collection
                </Link>
              </section>
            </article>
            <article
              className={`min-w-full flex flex-col items-center justify-center`}>
              <img
                className="object-cover float-right"
                src={authorImg}
                alt=""
                width={100}
                height={100}
              />
              <blockquote className="text-lg font-medium leading-relaxed text-foreground text-center">
                Drawing from insightful reader feedback, Author diligently
                revised their educational manuscript seven times before its
                publication. Since then, the book has captured the hearts of
                over 70 million readers worldwide, becoming a cornerstone in
                educational literature
              </blockquote>
            </article>
            <article className={`min-w-full flex items-center justify-center`}>
              <section className="max-w-fit">
                <article className="flex space-x-2 items-center w-fit">
                  <div className="w-16 h-16 p-2 m-2 flex justify-center items-center bg-indigo-300 rounded-full">
                    <DrawIcon />
                  </div>
                  Discover a curated collection of educational books covering
                  various subjects and interests
                </article>
                <article className="flex space-x-2 items-center w-fit">
                  <div className="w-16 h-16 p-2 m-2 flex justify-center items-center bg-indigo-300 rounded-full">
                    <Diversity2Icon />
                  </div>
                  Access books anytime, anywhere to expand knowledge and learn
                  at your own pace
                </article>
                <article className="flex space-x-2 items-center w-fit">
                  <div className="w-16 h-16 p-2 m-2 flex justify-center items-center bg-indigo-300 rounded-full">
                    <ConnectWithoutContactIcon />
                  </div>
                  Write your own educational manuscripts and publish them on
                  Scriptoria for others to read
                </article>
                <article className="flex space-x-2 items-center w-fit">
                  <div className="w-16 h-16 p-2 m-2 flex justify-center items-center bg-indigo-300 rounded-full">
                    <PublishIcon />
                  </div>
                  Use built-in authoring tools to format and structure your
                  manuscripts effectively
                </article>
                <article className="flex space-x-2 items-center w-fit">
                  <div className="w-16 h-16 p-2 m-2 flex justify-center items-center bg-indigo-300 rounded-full">
                    <CelebrationIcon />
                  </div>
                  Utilize Scriptoria to enhance your knowledge to support your
                  personal and professional growth
                </article>
              </section>
            </article>
          </div>
        </div>
        <div className="w-10% h-auto flex justify-center items-center">
          <button onClick={nextSlide} className="focus:outline-none">
            <ArrowCircleRightRoundedIcon sx={{ fontSize: 40 }} />
          </button>
        </div>
      </div>
      <section className="bottom-0 flex justify-center gap-6 w-full items-center mt-2 mb-10">
        {["About us", "Discover", "Success Stories", "How it works"].map(
          (slide, index) => (
            <button
              key={"circle" + index}
              onClick={() => setCurrent(index)}
              className={`cursor-pointer text-foreground ${
                index === current ? "italic text-lg" : ""
              }`}>
              {slide}
            </button>
          )
        )}
      </section>
    </>
  );
}
