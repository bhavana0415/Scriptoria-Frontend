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
import readerImg from "/reader.jpg";
import writerImg from "/writer.jpg";
import authorImg from "/author.png";
import write1 from "/write1.png";
import write2 from "/write2.png";

const images = [
  "https://www.dbooks.org/img/books/5591710361s.jpg",
  "https://www.dbooks.org/img/books/1735831719s.jpg",
  "https://www.dbooks.org/img/books/5616401585s.jpg",
];

export default function Slider() {
  const [current, setCurrent] = useState(0);
  const currentMode =
    useSelector((state) => state.currentState.currentMode) ?? "dark";
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
            <ArrowCircleLeftRoundedIcon className="h-20 w-20" />
          </button>
        </div>
        <div className="overflow-hidden w-[90%] rounded-3xl">
          <div
            className="flex transition-transform ease-out duration-[1000ms]"
            style={{
              transform: `translateX(-${current * 100}%)`,
            }}>
            <div
              className={`min-w-full bg-gradient-to-r ${
                currentMode == "dark" ? "from-green-900" : "from-green-100"
              } ${
                currentMode == "dark" ? "to-sky-800" : "to-sky-200"
              } flex items-center justify-center`}>
              <div className="w-full max-w-screen-lg mx-auto p-8 text-foreground">
                <article className="my-2 flex flex-col rounded-2xl px-4 shadow-2xl md:max-w-5xl md:flex-row md:items-center">
                  <div className="shrink-0 md:mr-8 md:max-w-sm">
                    <img className="rounded-2xl h-40" src={readerImg} alt="" />
                  </div>
                  <div className="py-1 sm:py-2">
                    <p className="mb-6 block text-2xl font-medium text-foreground-700">
                      For Readers:
                    </p>
                    <p className="mb-6 text-foreground-300 text-lg">
                      Dive into a world of endless knowledge. From
                      groundbreaking scientific discoveries and insightful
                      historical analyses to practical guides and academic
                      resources, find your next great read anytime, anywhere.
                      Discover new perspectives and timeless educational
                      materials, all at your fingertips.
                    </p>
                  </div>
                </article>
                <article className="my-2 flex flex-col rounded-2xl px-4 shadow-2xl md:max-w-5xl md:flex-row md:items-center">
                  <div className="py-1 sm:py-2">
                    <p className="mb-6 block text-2xl font-medium text-foreground-700">
                      For Writers:
                    </p>
                    <p className="mb-6 text-foreground-300 text-lg">
                      Share your educational content with the world. Upload your
                      manuscripts to our platform, connect with a community of
                      dedicated learners, and watch your influence grow. Gain
                      valuable feedback and insights to refine your work. When
                      your material resonates with readers, you'll have the
                      opportunity to publish and reach an even wider audience.
                    </p>
                  </div>
                  <div className="shrink-0 md:ml-8 md:max-w-sm">
                    <img
                      className="rounded-2xl h-40 object-contain"
                      src={writerImg}
                      alt=""
                    />
                  </div>
                </article>
              </div>
            </div>
            <div
              className={`min-w-full bg-gradient-to-r ${
                currentMode == "dark" ? "from-pink-900" : "from-pink-100"
              } ${
                currentMode == "dark" ? "to-rose-800" : "to-rose-200"
              } flex items-center justify-center`}>
              <div className="w-full px-10 flex flex-col md:flex-row items-center">
                <div className="w-full md:w-3/5">
                  <div className="grid gap-1 sm:grid-cols-3 lg:grid-cols-3">
                    {images.map((img, ind) => (
                      <div
                        key={img}
                        className={`rounded-xl transition duration-500 hover:scale-105 mt-${
                          ind * 4
                        } `}>
                        <a href="/books">
                          <div className="relative flex items-center justify-center overflow-hidden rounded-xl bg-fuchsia-300 h-80 sm:h-72">
                            <img
                              className="object-fill w-full h-full"
                              src={img}
                              alt="Book Cover"
                            />
                          </div>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="w-full md:w-2/5 p-10">
                  <div className="flex flex-col justify-center items-center text-center">
                    <p className="text-lg">
                      Whether you're looking for your next great read or just
                      browsing, our selection of books has something for
                      everyone. Discover your new favorite book today!
                    </p>
                    <Link
                      to={"books"}
                      className=" shadow-pink-600/30 mt-10 mx-2 inline-flex h-12 items-center rounded-full bg-slate-500 px-6 py-3 text-xl font-light text-white shadow-md transition hover:translate-y-1 hover:scale-105 hover:bg-slate-600 hover:shadow-lg">
                      Browse Collection
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`min-w-full bg-gradient-to-r ${
                currentMode == "dark" ? "from-cyan-900" : "from-cyan-100"
              } ${
                currentMode == "dark" ? "to-teal-800" : "to-teal-200"
              } flex items-center justify-center`}>
              <div className="w-full max-w-screen-lg mx-auto p-8 text-white">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="w-full md:w-1/2 flex flex-col items-center text-center">
                    <span className="rounded-full bg-cyan-500 p-3 text-5xl text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        role="img"
                        width="1em"
                        height="1em"
                        preserveAspectRatio="xMidYMid meet"
                        viewBox="0 0 16 16">
                        <path
                          fill="currentColor"
                          fillRule="evenodd"
                          d="M7.16 3.5C4.73 5.06 3.55 6.67 3.55 9.36c.16-.05.3-.05.44-.05c1.27 0 2.5.86 2.5 2.41c0 1.61-1.03 2.61-2.5 2.61c-1.9 0-2.99-1.52-2.99-4.25c0-3.8 1.75-6.53 5.02-8.42L7.16 3.5zm7 0c-2.43 1.56-3.61 3.17-3.61 5.86c.16-.05.3-.05.44-.05c1.27 0 2.5.86 2.5 2.41c0 1.61-1.03 2.61-2.5 2.61c-1.89 0-2.98-1.52-2.98-4.25c0-3.8 1.75-6.53 5.02-8.42l1.14 1.84h-.01z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>

                    <blockquote className="mt-8 flex-1">
                      <p className="max-w-xl text-lg font-medium leading-relaxed text-foreground">
                        Drawing from insightful reader feedback, P. Mahi
                        diligently revised their educational manuscript seven
                        times before its publication. Since then, the book has
                        captured the hearts of over 70 million readers
                        worldwide, becoming a cornerstone in educational
                        literature
                      </p>
                    </blockquote>
                  </div>
                  <div className="w-full md:w-1/2">
                    <img className="object-contain" src={authorImg} alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`min-w-full bg-gradient-to-r ${
                currentMode == "dark" ? "from-purple-900" : "from-purple-100"
              } ${
                currentMode == "dark" ? "to-indigo-800" : "to-indigo-200"
              } flex items-center justify-center`}>
              <div
                className={`w-full px-10 text-${
                  currentMode != "dark" ? "black" : "white"
                }`}>
                <div className="flex flex-col md:flex-row items-center">
                  <div className="w-full h-full md:w-2/5 flex flex-col">
                    <img src={write1} alt="" className="rounded-lg w-96 h-52" />
                    <img
                      src={write2}
                      alt=""
                      className="-mt-20 ml-16 w-96 rounded-lg"
                    />
                  </div>
                  <div className="relative w-full md:w-3/5 px-12">
                    {/* <div className="absolute inset-0 w-20 border-dashed border-r-2 border-indigo-300"></div> */}
                    <div className="flex flex-col items-start space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-16 flex justify-center items-center bg-indigo-300 rounded-full">
                          <DrawIcon />
                        </div>
                        <div className="flex-1">
                          <div className="mb-1">
                            Discover a curated collection of educational books
                          </div>
                          <div>covering various subjects and interests</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-16 flex justify-center items-center bg-indigo-300 rounded-full">
                          <Diversity2Icon />
                        </div>
                        <div className="flex-1">
                          <div className="mb-1">
                            Access books anytime, anywhere to expand knowledge
                          </div>
                          <div>and learn at your own pace</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-16 flex justify-center items-center bg-indigo-300 rounded-full">
                          <ConnectWithoutContactIcon />
                        </div>
                        <div className="flex-1">
                          <div className="mb-1">
                            Write your own educational manuscripts and
                          </div>
                          <div>
                            publish them on Scriptoria for others to read
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-16 flex justify-center items-center bg-indigo-300 rounded-full">
                          <PublishIcon />
                        </div>
                        <div className="flex-1">
                          <div className="mb-1">
                            Use built-in authoring tools to format and
                          </div>
                          <div>structure your manuscripts effectively</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-16 flex justify-center items-center bg-indigo-300 rounded-full">
                          <CelebrationIcon />
                        </div>
                        <div className="flex-1">
                          <div className="mb-1">
                            Utilize Scriptoria to enhance your knowledge to
                          </div>
                          <div>
                            support your personal and professional growth
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-10% h-auto flex justify-center items-center">
          <button onClick={nextSlide} className="focus:outline-none">
            <ArrowCircleRightRoundedIcon />
          </button>
        </div>
      </div>
      <div className="bottom-0 flex justify-center gap-6 w-full items-center mt-2 mb-10">
        {["About us", "Discover", "Success Stories", "How it works"].map(
          (slide, index) => (
            <div
              key={"circle" + index}
              onClick={() => setCurrent(index)}
              className={`cursor-pointer ${
                index === current ? "text-foreground" : "text-stone-500"
              }`}>
              {slide}
            </div>
          )
        )}
      </div>
    </>
  );
}
