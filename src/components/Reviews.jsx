import React, { useState } from "react";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";

const reviews = [
  {
    review:
      "A fantastic collection of books covering a wide range of subjects. The platform is easy to navigate and offers great reading experiences.",
    reviewerName: "John Doe",
    reviewerRole: "Teacher",
  },
  {
    review:
      "I found the content to be very enriching and informative. It's wonderful to have access to such valuable resources for free.",
    reviewerName: "Jane Smith",
    reviewerRole: "Developer",
  },
  {
    review:
      "As an educator, I appreciate the variety of educational materials available. It helps me enhance my teaching methods and provide more resources to my students.",
    reviewerName: "Michael Brown",
    reviewerRole: "Teacher",
  },
  {
    review:
      "The platform has become my go-to for expanding my knowledge. Highly recommend it to anyone interested in learning new things.",
    reviewerName: "Sarah Lee",
    reviewerRole: "Student",
  },
];

const Reviews = () => {
  const [current, setCurrent] = useState(0);
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
    <div className="my-10">
      <div className="text-center">
        <h2 className="text-xl py-2 font-serif text-foreground sm:text-2xl lg:text-3xl">
          Have a look at what our readers say
        </h2>
      </div>
      <div className="overflow-hidden relative w-full h-fit mx-auto rounded-3xl">
        <div
          className="flex transition-transform ease-out duration-[1000ms]"
          style={{
            transform: `translateX(-${current * 100}%)`,
          }}>
          {reviews.map((review, index) => (
            <div
              key={index}
              className="min-w-full flex items-center justify-center">
              <section className="relative w-screen overflow-hidden py-1 sm:py-2 lg:pt-2">
                <svg
                  className="scale-[5] text-slate-600 pointer-events-none absolute right-5 bottom-6 text-9xl"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="img"
                  width="65"
                  height="65"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 40 20">
                  <path
                    fill="currentColor"
                    d="M6.5 10c-.223 0-.437.034-.65.065c.069-.232.14-.468.254-.68c.114-.308.292-.575.469-.844c.148-.291.409-.488.601-.737c.201-.242.475-.403.692-.604c.213-.21.492-.315.714-.463c.232-.133.434-.28.65-.35l.539-.222l.474-.197l-.485-1.938l-.597.144c-.191.048-.424.104-.689.171c-.271.05-.56.187-.882.312c-.318.142-.686.238-1.028.466c-.344.218-.741.4-1.091.692c-.339.301-.748.562-1.05.945c-.33.358-.656.734-.909 1.162c-.293.408-.492.856-.702 1.299c-.19.443-.343.896-.468 1.336c-.237.882-.343 1.72-.384 2.437c-.034.718-.014 1.315.028 1.747c.015.204.043.402.063.539l.025.168l.026-.006A4.5 4.5 0 1 0 6.5 10zm11 0c-.223 0-.437.034-.65.065c.069-.232.14-.468.254-.68c.114-.308.292-.575.469-.844c.148-.291.409-.488.601-.737c.201-.242.475-.403.692-.604c.213-.21.492-.315.714-.463c.232-.133.434-.28.65-.35l.539-.222l.474-.197l-.485-1.938l-.597.144c-.191.048-.424.104-.689.171c-.271.05-.56.187-.882.312c-.317.143-.686.238-1.028.467c-.344.218-.741.4-1.091.692c-.339.301-.748.562-1.05.944c-.33.358-.656.734-.909 1.162c-.293.408-.492.856-.702 1.299c-.19.443-.343.896-.468 1.336c-.237.882-.343 1.72-.384 2.437c-.034.718-.014 1.315.028 1.747c.015.204.043.402.063.539l.025.168l.026-.006A4.5 4.5 0 1 0 17.5 10z"
                  />
                </svg>
                <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">
                  <div className="relative flex flex-col overflow-hidden rounded-lg bg-white px-8 w-[70%]">
                    <svg
                      className="text-slate-600 absolute right-5 bottom-6 text-7xl"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      role="img"
                      width="1em"
                      height="1em"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M6.5 10c-.223 0-.437.034-.65.065c.069-.232.14-.468.254-.68c.114-.308.292-.575.469-.844c.148-.291.409-.488.601-.737c.201-.242.475-.403.692-.604c.213-.21.492-.315.714-.463c.232-.133.434-.28.65-.35l.539-.222l.474-.197l-.485-1.938l-.597.144c-.191.048-.424.104-.689.171c-.271.05-.56.187-.882.312c-.318.142-.686.238-1.028.466c-.344.218-.741.4-1.091.692c-.339.301-.748.562-1.05.945c-.33.358-.656.734-.909 1.162c-.293.408-.492.856-.702 1.299c-.19.443-.343.896-.468 1.336c-.237.882-.343 1.72-.384 2.437c-.034.718-.014 1.315.028 1.747c.015.204.043.402.063.539l.025.168l.026-.006A4.5 4.5 0 1 0 6.5 10zm11 0c-.223 0-.437.034-.65.065c.069-.232.14-.468.254-.68c.114-.308.292-.575.469-.844c.148-.291.409-.488.601-.737c.201-.242.475-.403.692-.604c.213-.21.492-.315.714-.463c.232-.133.434-.28.65-.35l.539-.222l.474-.197l-.485-1.938l-.597.144c-.191.048-.424.104-.689.171c-.271.05-.56.187-.882.312c-.317.143-.686.238-1.028.467c-.344.218-.741.4-1.091.692c-.339.301-.748.562-1.05.944c-.33.358-.656.734-.909 1.162c-.293.408-.492.856-.702 1.299c-.19.443-.343.896-.468 1.336c-.237.882-.343 1.72-.384 2.437c-.034.718-.014 1.315.028 1.747c.015.204.043.402.063.539l.025.168l.026-.006A4.5 4.5 0 1 0 17.5 10z"
                      />
                    </svg>
                    <div className="lg:py- flex flex-1 flex-col justify-between p-6 lg:px-7">
                      <div className="flex-1">
                        <blockquote className="mt-4 flex-1">
                          <p className="text-xl leading-snug text-black">
                            {review.review}
                          </p>
                        </blockquote>
                      </div>

                      <div className="mt-8 flex items-center tracking-wide">
                        <p className="text-base font-bold text-black">
                          {review.reviewerName}
                        </p>
                        <p className="ml-3 text-gray-700">
                          {review.reviewerRole}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          ))}
          {/* <div className="min-w-full flex items-center justify-center">
            <section className="relative w-screen overflow-hidden py-1 sm:py-2 lg:pt-2">
              <svg
                className="scale-[5] text-slate-600 pointer-events-none absolute right-5 bottom-6 text-9xl"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                width="65"
                height="65"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 40 20">
                <path
                  fill="currentColor"
                  d="M6.5 10c-.223 0-.437.034-.65.065c.069-.232.14-.468.254-.68c.114-.308.292-.575.469-.844c.148-.291.409-.488.601-.737c.201-.242.475-.403.692-.604c.213-.21.492-.315.714-.463c.232-.133.434-.28.65-.35l.539-.222l.474-.197l-.485-1.938l-.597.144c-.191.048-.424.104-.689.171c-.271.05-.56.187-.882.312c-.318.142-.686.238-1.028.466c-.344.218-.741.4-1.091.692c-.339.301-.748.562-1.05.945c-.33.358-.656.734-.909 1.162c-.293.408-.492.856-.702 1.299c-.19.443-.343.896-.468 1.336c-.237.882-.343 1.72-.384 2.437c-.034.718-.014 1.315.028 1.747c.015.204.043.402.063.539l.025.168l.026-.006A4.5 4.5 0 1 0 6.5 10zm11 0c-.223 0-.437.034-.65.065c.069-.232.14-.468.254-.68c.114-.308.292-.575.469-.844c.148-.291.409-.488.601-.737c.201-.242.475-.403.692-.604c.213-.21.492-.315.714-.463c.232-.133.434-.28.65-.35l.539-.222l.474-.197l-.485-1.938l-.597.144c-.191.048-.424.104-.689.171c-.271.05-.56.187-.882.312c-.317.143-.686.238-1.028.467c-.344.218-.741.4-1.091.692c-.339.301-.748.562-1.05.944c-.33.358-.656.734-.909 1.162c-.293.408-.492.856-.702 1.299c-.19.443-.343.896-.468 1.336c-.237.882-.343 1.72-.384 2.437c-.034.718-.014 1.315.028 1.747c.015.204.043.402.063.539l.025.168l.026-.006A4.5 4.5 0 1 0 17.5 10z"
                />
              </svg>
              <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">
                <div className="relative flex flex-col overflow-hidden rounded-lg bg-white px-8 w-[70%]">
                  <svg
                    className="text-slate-600 absolute right-5 bottom-6 text-7xl"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="img"
                    width="1em"
                    height="1em"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M6.5 10c-.223 0-.437.034-.65.065c.069-.232.14-.468.254-.68c.114-.308.292-.575.469-.844c.148-.291.409-.488.601-.737c.201-.242.475-.403.692-.604c.213-.21.492-.315.714-.463c.232-.133.434-.28.65-.35l.539-.222l.474-.197l-.485-1.938l-.597.144c-.191.048-.424.104-.689.171c-.271.05-.56.187-.882.312c-.318.142-.686.238-1.028.466c-.344.218-.741.4-1.091.692c-.339.301-.748.562-1.05.945c-.33.358-.656.734-.909 1.162c-.293.408-.492.856-.702 1.299c-.19.443-.343.896-.468 1.336c-.237.882-.343 1.72-.384 2.437c-.034.718-.014 1.315.028 1.747c.015.204.043.402.063.539l.025.168l.026-.006A4.5 4.5 0 1 0 6.5 10zm11 0c-.223 0-.437.034-.65.065c.069-.232.14-.468.254-.68c.114-.308.292-.575.469-.844c.148-.291.409-.488.601-.737c.201-.242.475-.403.692-.604c.213-.21.492-.315.714-.463c.232-.133.434-.28.65-.35l.539-.222l.474-.197l-.485-1.938l-.597.144c-.191.048-.424.104-.689.171c-.271.05-.56.187-.882.312c-.317.143-.686.238-1.028.467c-.344.218-.741.4-1.091.692c-.339.301-.748.562-1.05.944c-.33.358-.656.734-.909 1.162c-.293.408-.492.856-.702 1.299c-.19.443-.343.896-.468 1.336c-.237.882-.343 1.72-.384 2.437c-.034.718-.014 1.315.028 1.747c.015.204.043.402.063.539l.025.168l.026-.006A4.5 4.5 0 1 0 17.5 10z"
                    />
                  </svg>
                  <div className="lg:py- flex flex-1 flex-col justify-between p-6 lg:px-7">
                    <div className="flex-1">
                      <blockquote className="mt-4 flex-1">
                        <p className="text-xl leading-snug text-black">
                          You made it so simple. My new site is so much faster
                          and easier to work with than my old site. I just
                          choose the page, make the change.
                        </p>
                      </blockquote>
                    </div>

                    <div className="mt-8 flex items-center tracking-wide">
                      <p className="text-base font-bold text-black">
                        Akorn Veesle
                      </p>
                      <p className="ml-3 text-gray-700">React Developer</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className="min-w-full flex items-center justify-center">
            <section className="relative w-screen overflow-hidden py-1 sm:py-2 lg:pt-2">
              <svg
                className="scale-[5] text-slate-600 pointer-events-none absolute right-5 bottom-6 text-9xl"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                width="65"
                height="65"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 40 20">
                <path
                  fill="currentColor"
                  d="M6.5 10c-.223 0-.437.034-.65.065c.069-.232.14-.468.254-.68c.114-.308.292-.575.469-.844c.148-.291.409-.488.601-.737c.201-.242.475-.403.692-.604c.213-.21.492-.315.714-.463c.232-.133.434-.28.65-.35l.539-.222l.474-.197l-.485-1.938l-.597.144c-.191.048-.424.104-.689.171c-.271.05-.56.187-.882.312c-.318.142-.686.238-1.028.466c-.344.218-.741.4-1.091.692c-.339.301-.748.562-1.05.945c-.33.358-.656.734-.909 1.162c-.293.408-.492.856-.702 1.299c-.19.443-.343.896-.468 1.336c-.237.882-.343 1.72-.384 2.437c-.034.718-.014 1.315.028 1.747c.015.204.043.402.063.539l.025.168l.026-.006A4.5 4.5 0 1 0 6.5 10zm11 0c-.223 0-.437.034-.65.065c.069-.232.14-.468.254-.68c.114-.308.292-.575.469-.844c.148-.291.409-.488.601-.737c.201-.242.475-.403.692-.604c.213-.21.492-.315.714-.463c.232-.133.434-.28.65-.35l.539-.222l.474-.197l-.485-1.938l-.597.144c-.191.048-.424.104-.689.171c-.271.05-.56.187-.882.312c-.317.143-.686.238-1.028.467c-.344.218-.741.4-1.091.692c-.339.301-.748.562-1.05.944c-.33.358-.656.734-.909 1.162c-.293.408-.492.856-.702 1.299c-.19.443-.343.896-.468 1.336c-.237.882-.343 1.72-.384 2.437c-.034.718-.014 1.315.028 1.747c.015.204.043.402.063.539l.025.168l.026-.006A4.5 4.5 0 1 0 17.5 10z"
                />
              </svg>
              <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">
                <div className="relative flex flex-col overflow-hidden rounded-lg bg-white px-8 w-[70%]">
                  <svg
                    className="text-slate-600 absolute right-5 bottom-6 text-7xl"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="img"
                    width="1em"
                    height="1em"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M6.5 10c-.223 0-.437.034-.65.065c.069-.232.14-.468.254-.68c.114-.308.292-.575.469-.844c.148-.291.409-.488.601-.737c.201-.242.475-.403.692-.604c.213-.21.492-.315.714-.463c.232-.133.434-.28.65-.35l.539-.222l.474-.197l-.485-1.938l-.597.144c-.191.048-.424.104-.689.171c-.271.05-.56.187-.882.312c-.318.142-.686.238-1.028.466c-.344.218-.741.4-1.091.692c-.339.301-.748.562-1.05.945c-.33.358-.656.734-.909 1.162c-.293.408-.492.856-.702 1.299c-.19.443-.343.896-.468 1.336c-.237.882-.343 1.72-.384 2.437c-.034.718-.014 1.315.028 1.747c.015.204.043.402.063.539l.025.168l.026-.006A4.5 4.5 0 1 0 6.5 10zm11 0c-.223 0-.437.034-.65.065c.069-.232.14-.468.254-.68c.114-.308.292-.575.469-.844c.148-.291.409-.488.601-.737c.201-.242.475-.403.692-.604c.213-.21.492-.315.714-.463c.232-.133.434-.28.65-.35l.539-.222l.474-.197l-.485-1.938l-.597.144c-.191.048-.424.104-.689.171c-.271.05-.56.187-.882.312c-.317.143-.686.238-1.028.467c-.344.218-.741.4-1.091.692c-.339.301-.748.562-1.05.944c-.33.358-.656.734-.909 1.162c-.293.408-.492.856-.702 1.299c-.19.443-.343.896-.468 1.336c-.237.882-.343 1.72-.384 2.437c-.034.718-.014 1.315.028 1.747c.015.204.043.402.063.539l.025.168l.026-.006A4.5 4.5 0 1 0 17.5 10z"
                    />
                  </svg>
                  <div className="lg:py- flex flex-1 flex-col justify-between p-6 lg:px-7">
                    <div className="flex-1">
                      <blockquote className="mt-4 flex-1">
                        <p className="text-xl leading-snug text-black">
                          You made it so simple. My new site is so much faster
                          and easier to work with than my old site. I just
                          choose the page, make the change.
                        </p>
                      </blockquote>
                    </div>

                    <div className="mt-8 flex items-center tracking-wide">
                      <p className="text-base font-bold text-black">
                        Akorn Veesle
                      </p>
                      <p className="ml-3 text-gray-700">React Developer</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className="min-w-full flex items-center justify-center">
            <section className="relative w-screen overflow-hidden py-1 sm:py-2 lg:pt-2">
              <svg
                className="scale-[5] text-slate-600 pointer-events-none absolute right-5 bottom-6 text-9xl"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                width="65"
                height="65"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 40 20">
                <path
                  fill="currentColor"
                  d="M6.5 10c-.223 0-.437.034-.65.065c.069-.232.14-.468.254-.68c.114-.308.292-.575.469-.844c.148-.291.409-.488.601-.737c.201-.242.475-.403.692-.604c.213-.21.492-.315.714-.463c.232-.133.434-.28.65-.35l.539-.222l.474-.197l-.485-1.938l-.597.144c-.191.048-.424.104-.689.171c-.271.05-.56.187-.882.312c-.318.142-.686.238-1.028.466c-.344.218-.741.4-1.091.692c-.339.301-.748.562-1.05.945c-.33.358-.656.734-.909 1.162c-.293.408-.492.856-.702 1.299c-.19.443-.343.896-.468 1.336c-.237.882-.343 1.72-.384 2.437c-.034.718-.014 1.315.028 1.747c.015.204.043.402.063.539l.025.168l.026-.006A4.5 4.5 0 1 0 6.5 10zm11 0c-.223 0-.437.034-.65.065c.069-.232.14-.468.254-.68c.114-.308.292-.575.469-.844c.148-.291.409-.488.601-.737c.201-.242.475-.403.692-.604c.213-.21.492-.315.714-.463c.232-.133.434-.28.65-.35l.539-.222l.474-.197l-.485-1.938l-.597.144c-.191.048-.424.104-.689.171c-.271.05-.56.187-.882.312c-.317.143-.686.238-1.028.467c-.344.218-.741.4-1.091.692c-.339.301-.748.562-1.05.944c-.33.358-.656.734-.909 1.162c-.293.408-.492.856-.702 1.299c-.19.443-.343.896-.468 1.336c-.237.882-.343 1.72-.384 2.437c-.034.718-.014 1.315.028 1.747c.015.204.043.402.063.539l.025.168l.026-.006A4.5 4.5 0 1 0 17.5 10z"
                />
              </svg>
              <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">
                <div className="relative flex flex-col overflow-hidden rounded-lg bg-white px-8 w-[70%]">
                  <svg
                    className="text-slate-600 absolute right-5 bottom-6 text-7xl"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="img"
                    width="1em"
                    height="1em"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M6.5 10c-.223 0-.437.034-.65.065c.069-.232.14-.468.254-.68c.114-.308.292-.575.469-.844c.148-.291.409-.488.601-.737c.201-.242.475-.403.692-.604c.213-.21.492-.315.714-.463c.232-.133.434-.28.65-.35l.539-.222l.474-.197l-.485-1.938l-.597.144c-.191.048-.424.104-.689.171c-.271.05-.56.187-.882.312c-.318.142-.686.238-1.028.466c-.344.218-.741.4-1.091.692c-.339.301-.748.562-1.05.945c-.33.358-.656.734-.909 1.162c-.293.408-.492.856-.702 1.299c-.19.443-.343.896-.468 1.336c-.237.882-.343 1.72-.384 2.437c-.034.718-.014 1.315.028 1.747c.015.204.043.402.063.539l.025.168l.026-.006A4.5 4.5 0 1 0 6.5 10zm11 0c-.223 0-.437.034-.65.065c.069-.232.14-.468.254-.68c.114-.308.292-.575.469-.844c.148-.291.409-.488.601-.737c.201-.242.475-.403.692-.604c.213-.21.492-.315.714-.463c.232-.133.434-.28.65-.35l.539-.222l.474-.197l-.485-1.938l-.597.144c-.191.048-.424.104-.689.171c-.271.05-.56.187-.882.312c-.317.143-.686.238-1.028.467c-.344.218-.741.4-1.091.692c-.339.301-.748.562-1.05.944c-.33.358-.656.734-.909 1.162c-.293.408-.492.856-.702 1.299c-.19.443-.343.896-.468 1.336c-.237.882-.343 1.72-.384 2.437c-.034.718-.014 1.315.028 1.747c.015.204.043.402.063.539l.025.168l.026-.006A4.5 4.5 0 1 0 17.5 10z"
                    />
                  </svg>
                  <div className="lg:py- flex flex-1 flex-col justify-between p-6 lg:px-7">
                    <div className="flex-1">
                      <blockquote className="mt-4 flex-1">
                        <p className="text-xl leading-snug text-black">
                          You made it so simple. My new site is so much faster
                          and easier to work with than my old site. I just
                          choose the page, make the change.
                        </p>
                      </blockquote>
                    </div>

                    <div className="mt-8 flex items-center tracking-wide">
                      <p className="text-base font-bold text-black">
                        Akorn Veesle
                      </p>
                      <p className="ml-3 text-gray-700">React Developer</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className="min-w-full flex items-center justify-center">
            <section className="relative w-screen overflow-hidden py-1 sm:py-2 lg:pt-2">
              <svg
                className="scale-[5] text-slate-600 pointer-events-none absolute right-5 bottom-6 text-9xl"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                width="65"
                height="65"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 40 20">
                <path
                  fill="currentColor"
                  d="M6.5 10c-.223 0-.437.034-.65.065c.069-.232.14-.468.254-.68c.114-.308.292-.575.469-.844c.148-.291.409-.488.601-.737c.201-.242.475-.403.692-.604c.213-.21.492-.315.714-.463c.232-.133.434-.28.65-.35l.539-.222l.474-.197l-.485-1.938l-.597.144c-.191.048-.424.104-.689.171c-.271.05-.56.187-.882.312c-.318.142-.686.238-1.028.466c-.344.218-.741.4-1.091.692c-.339.301-.748.562-1.05.945c-.33.358-.656.734-.909 1.162c-.293.408-.492.856-.702 1.299c-.19.443-.343.896-.468 1.336c-.237.882-.343 1.72-.384 2.437c-.034.718-.014 1.315.028 1.747c.015.204.043.402.063.539l.025.168l.026-.006A4.5 4.5 0 1 0 6.5 10zm11 0c-.223 0-.437.034-.65.065c.069-.232.14-.468.254-.68c.114-.308.292-.575.469-.844c.148-.291.409-.488.601-.737c.201-.242.475-.403.692-.604c.213-.21.492-.315.714-.463c.232-.133.434-.28.65-.35l.539-.222l.474-.197l-.485-1.938l-.597.144c-.191.048-.424.104-.689.171c-.271.05-.56.187-.882.312c-.317.143-.686.238-1.028.467c-.344.218-.741.4-1.091.692c-.339.301-.748.562-1.05.944c-.33.358-.656.734-.909 1.162c-.293.408-.492.856-.702 1.299c-.19.443-.343.896-.468 1.336c-.237.882-.343 1.72-.384 2.437c-.034.718-.014 1.315.028 1.747c.015.204.043.402.063.539l.025.168l.026-.006A4.5 4.5 0 1 0 17.5 10z"
                />
              </svg>
              <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">
                <div className="relative flex flex-col overflow-hidden rounded-lg bg-white px-8 w-[70%]">
                  <svg
                    className="text-slate-600 absolute right-5 bottom-6 text-7xl"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="img"
                    width="1em"
                    height="1em"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M6.5 10c-.223 0-.437.034-.65.065c.069-.232.14-.468.254-.68c.114-.308.292-.575.469-.844c.148-.291.409-.488.601-.737c.201-.242.475-.403.692-.604c.213-.21.492-.315.714-.463c.232-.133.434-.28.65-.35l.539-.222l.474-.197l-.485-1.938l-.597.144c-.191.048-.424.104-.689.171c-.271.05-.56.187-.882.312c-.318.142-.686.238-1.028.466c-.344.218-.741.4-1.091.692c-.339.301-.748.562-1.05.945c-.33.358-.656.734-.909 1.162c-.293.408-.492.856-.702 1.299c-.19.443-.343.896-.468 1.336c-.237.882-.343 1.72-.384 2.437c-.034.718-.014 1.315.028 1.747c.015.204.043.402.063.539l.025.168l.026-.006A4.5 4.5 0 1 0 6.5 10zm11 0c-.223 0-.437.034-.65.065c.069-.232.14-.468.254-.68c.114-.308.292-.575.469-.844c.148-.291.409-.488.601-.737c.201-.242.475-.403.692-.604c.213-.21.492-.315.714-.463c.232-.133.434-.28.65-.35l.539-.222l.474-.197l-.485-1.938l-.597.144c-.191.048-.424.104-.689.171c-.271.05-.56.187-.882.312c-.317.143-.686.238-1.028.467c-.344.218-.741.4-1.091.692c-.339.301-.748.562-1.05.944c-.33.358-.656.734-.909 1.162c-.293.408-.492.856-.702 1.299c-.19.443-.343.896-.468 1.336c-.237.882-.343 1.72-.384 2.437c-.034.718-.014 1.315.028 1.747c.015.204.043.402.063.539l.025.168l.026-.006A4.5 4.5 0 1 0 17.5 10z"
                    />
                  </svg>
                  <div className="lg:py- flex flex-1 flex-col justify-between p-6 lg:px-7">
                    <div className="flex-1">
                      <blockquote className="mt-4 flex-1">
                        <p className="text-xl leading-snug text-black">
                          You made it so simple. My new site is so much faster
                          and easier to work with than my old site. I just
                          choose the page, make the change.
                        </p>
                      </blockquote>
                    </div>

                    <div className="mt-8 flex items-center tracking-wide">
                      <p className="text-base font-bold text-black">
                        Akorn Veesle
                      </p>
                      <p className="ml-3 text-gray-700">React Developer</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div> */}
        </div>

        <div className="absolute top-0 h-full w-full flex justify-between items-center text-white px-[10%] text-3xl">
          <button onClick={previousSlide} className="focus:outline-none">
            <ArrowCircleLeftRoundedIcon sx={{ fontSize: 40 }} />
          </button>
          <button onClick={nextSlide} className="focus:outline-none">
            <ArrowCircleRightRoundedIcon sx={{ fontSize: 40 }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
