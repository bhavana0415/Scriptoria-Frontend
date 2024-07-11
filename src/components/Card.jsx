import React, { useEffect, useState } from 'react'



const Card = ({ image, rating, title, authors }) => {

  const [stars, setStars] = useState(0);

  const getRating = (value) => {
    if (value <= 4861) {
      return 1;
    } else if (value <= 9722) {
      return 2;
    } else if (value <= 19445) {
      return 3;
    } else if (value <= 38891) {
      return 4;
    } else {
      return 5;
    }
  }

  useEffect(() => {
    const rate = getRating(rating);
    setStars(rate)
  }, [rating])

  return (
    <article className="mx-auto my-4 flex w-full flex-col overflow-hidden rounded-2xl border border-gray-300 bg-white text-gray-900 transition hover:translate-y-2 hover:shadow-lg">
      <a href="#">
      <div className={`rounded-xl transform transition duration-500 hover:scale-105 `}>
                                        <a href="#">
                                            <div className="relative flex items-center justify-center overflow-hidden rounded-xl bg-fuchsia-300 h-80">
                                                <img className="object-fill w-full h-full" src={image} alt="Book Cover" />
                                            </div>
                                        </a>
                                    </div>
        <div className="flex-auto px-6 py-5">
          <div className="mt-2 flex items-center">
            {Array(stars).fill(0).map((_, ind) => (
              <>
                <svg key={ind} className="block h-3 w-3 align-middle text-yellow-500 sm:h-4 sm:w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className=""></path>
                </svg>
              </>
            ))}
            {Array(5 - stars).fill(0).map((_, ind) => (
              <>
                <svg key={ind} className="block h-3 w-3 align-middle text-gray-400 sm:h-4 sm:w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className=""></path>
                </svg>
              </>
            ))}
          </div>
          <h3 className="mt-4 mb-3 text-xl font-semibold xl:text-2xl">{title}</h3>
          <p className="mb-4 text-base font-light">
            {authors && Array.isArray(authors) && authors.map((author) => (
              <>{author.name}</>
            ))
            }
          </p>
          <span className="inline-block cursor-pointer select-none rounded-full border border-gray-800 bg-gray-800 px-2 py-1 text-center align-middle text-sm font-semibold leading-normal text-white no-underline shadow-sm">Learn More</span>
        </div>
      </a>
    </article>
  )
}

export default Card
