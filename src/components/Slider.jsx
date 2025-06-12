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
import readerImg from "/reader.svg";
import writerImg from "/writer.svg";
import authorImg from "/author.svg";
import write1 from "/web.webp";
import write2 from "/web2.webp";

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
    <section className="w-full h-fit relative my-10 ">
      <div
        className={`overflow-hidden w-full h-fit ${getBGColor(
          currentMode,
          current
        )}`}>
        <div
          className="flex items-center transition-transform ease-out duration-[1000ms] h-fit"
          style={{
            transform: `translateX(-${current * 100}%)`,
          }}>
          <article className="min-w-full flex flex-col items-center justify-center p-10">
            <section className="my-2 flex flex-col md:max-w-5xl">
              <p className="mb-6 block text-2xl font-medium text-foreground-700">
                For Readers:
              </p>
              <p className="mb-6 text-foreground-300 text-lg">
                <img
                  className="rounded-2xl h-40 float-left"
                  src={readerImg}
                  alt=""
                />
                Dive into a world of endless knowledge. From groundbreaking
                scientific discoveries and insightful historical analyses to
                practical guides and academic resources, find your next great
                read anytime, anywhere. Discover new perspectives and timeless
                educational materials, all at your fingertips.
              </p>
            </section>
            <section className="my-2 flex flex-col md:max-w-5xl">
              <p className="mb-6 block text-2xl font-medium text-foreground-700">
                For Writers:
              </p>
              <p className="mb-6 text-foreground-300 text-lg">
                <img
                  className="rounded-2xl h-40 float-right"
                  src={writerImg}
                  alt=""
                />
                Share your educational content with the world. Upload your
                manuscripts to our platform, connect with a community of
                dedicated learners, and watch your influence grow. Gain valuable
                feedback and insights to refine your work. When your material
                resonates with readers, you&apos;ll have the opportunity to
                publish and reach an even wider audience.
              </p>
            </section>
          </article>
          <article className="min-w-full flex items-center justify-center p-10">
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
          <article className="min-w-full flex flex-col items-center justify-center text-white p-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              width="1em"
              height="1em"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 16 16"
              className="rounded-full bg-cyan-500 p-3 text-5xl text-white">
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M7.16 3.5C4.73 5.06 3.55 6.67 3.55 9.36c.16-.05.3-.05.44-.05c1.27 0 2.5.86 2.5 2.41c0 1.61-1.03 2.61-2.5 2.61c-1.9 0-2.99-1.52-2.99-4.25c0-3.8 1.75-6.53 5.02-8.42L7.16 3.5zm7 0c-2.43 1.56-3.61 3.17-3.61 5.86c.16-.05.3-.05.44-.05c1.27 0 2.5.86 2.5 2.41c0 1.61-1.03 2.61-2.5 2.61c-1.89 0-2.98-1.52-2.98-4.25c0-3.8 1.75-6.53 5.02-8.42l1.14 1.84h-.01z"
                clipRule="evenodd"
              />
            </svg>
            <blockquote className="text-lg font-medium leading-relaxed text-foreground">
              <img
                className="object-cover float-right"
                src={authorImg}
                alt=""
                width={100}
                height={100}
              />
              Drawing from insightful reader feedback, Author diligently revised
              their educational manuscript seven times before its publication.
              Since then, the book has captured the hearts of over 70 million
              readers worldwide, becoming a cornerstone in educational
              literature
            </blockquote>
          </article>
          <article className="min-w-full flex flex-col p-2 justify-center items-center p-10">
            <section className="w-[75%]">
              <article className="flex space-x-2 items-center">
                <div className="w-16 h-16 p-2 m-2 flex justify-center items-center bg-indigo-300 rounded-full">
                  <DrawIcon />
                </div>
                Discover a curated collection of educational books covering
                various subjects and interests
              </article>
              <article className="flex space-x-2 items-center">
                <div className="w-16 h-16 p-2 m-2 flex justify-center items-center bg-indigo-300 rounded-full">
                  <Diversity2Icon />
                </div>
                Access books anytime, anywhere to expand knowledge and learn at
                your own pace
              </article>
              <article className="flex space-x-2 items-center">
                <div className="w-16 h-16 p-2 m-2 flex justify-center items-center bg-indigo-300 rounded-full">
                  <ConnectWithoutContactIcon />
                </div>
                Write your own educational manuscripts and publish them on
                Scriptoria for others to read
              </article>
              <article className="flex space-x-2 items-center">
                <div className="w-16 h-16 p-2 m-2 flex justify-center items-center bg-indigo-300 rounded-full">
                  <PublishIcon />
                </div>
                Use built-in authoring tools to format and structure your
                manuscripts effectively
              </article>
              <article className="flex space-x-2 items-center">
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
      <ArrowCircleLeftRoundedIcon
        onClick={previousSlide}
        className="absolute left-0 top-[50%] h-20 w-20 focus:outline-none"
      />
      <ArrowCircleRightRoundedIcon
        onClick={nextSlide}
        className="absolute right-0 top-[50%] h-20 w-20 focus:outline-none"
      />
      <div className="absolute bottom-0 grid grid-cols-4 gap-2 w-full">
        {["About us", "Discover", "Success Stories", "How it works"].map(
          (slide, index) => (
            <span
              key={"circle" + index}
              onClick={() => setCurrent(index)}
              className={`cursor-pointer text-center ${
                index === current ? "text-foreground" : "text-stone-500"
              }`}>
              {slide}
            </span>
          )
        )}
      </div>
    </section>
  );
}
