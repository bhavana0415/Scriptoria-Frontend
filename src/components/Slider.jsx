import { useState } from "react";
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import { useSelector } from "react-redux";
import DrawIcon from '@mui/icons-material/Draw';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import PublishIcon from '@mui/icons-material/Publish';
import CelebrationIcon from '@mui/icons-material/Celebration';

const images = [
    "https://www.gutenberg.org/cache/epub/29024/pg29024.cover.medium.jpg",
    "https://www.gutenberg.org/cache/epub/1342/pg1342.cover.medium.jpg",
    "https://www.gutenberg.org/cache/epub/37106/pg37106.cover.medium.jpg",
]

export default function Slider() {
    const [current, setCurrent] = useState(0);
    const currentMode = useSelector((state) => state.currentState.currentMode)

    const previousSlide = () => {
        setCurrent((prev) => {
            if (prev == 0) {
                return 3
            }
            return (prev - 1) % 4
        }
        );
    };

    const nextSlide = () => {
        setCurrent((prev) => {
            if (prev == 3) {
                return 0;
            }
            return (prev + 1) % 4
        }
        );
    };

    return (
        <div className="overflow-hidden relative w-full">
            <div
                className="flex transition-transform ease-out duration-[1000ms]"
                style={{
                    transform: `translateX(-${current * 100}%)`,
                }}
            >
                <div className={`min-w-full bg-gradient-to-r from-green-${currentMode == 'dark' ? 900 : 200} to-sky-${currentMode == 'dark' ? 800 : 300} flex items-center justify-center`}>
                    <div className="w-full max-w-screen-lg mx-auto p-8 text-foreground">
                        <article className="ml-auto my-5 flex max-w-md flex-col rounded-2xl px-4 shadow md:max-w-5xl md:flex-row md:items-center">
                            <div className="shrink-0 my-4 md:mr-8 md:max-w-sm">
                                <img className="rounded-2xl h-40" src="src/assets/reader.jpg" alt="" />
                            </div>
                            <div className="py-4 sm:py-8">
                                <a href="#" className="mb-6 block text-2xl font-medium text-foreground-700">For Readers:</a>
                                <p className="mb-6 text-foreground-300 text-lg">Dive into a world of endless stories. From gripping mysteries and epic fantasies to touching dramas and passionate romances, find your next great read anytime, anywhere. Discover new voices and timeless tales, all at your fingertips.</p>
                            </div>
                        </article>
                        <article className="ml-auto my-5 flex max-w-md flex-col rounded-2xl px-4 shadow md:max-w-5xl md:flex-row md:items-center">
                            <div className="py-4 sm:py-8">
                                <a href="#" className="mb-6 block text-2xl font-medium text-foreground-700">For Writers:</a>
                                <p className="mb-6 text-foreground-300 text-lg">Share your stories with the world. Upload your manuscripts to our platform, connect with a community of avid readers, and watch your fanbase grow. Gain valuable feedback and insights to refine your work. When your book captures the hearts of readers, you'll have the opportunity to publish and reach an even wider audience.</p>
                            </div>
                            <div className="shrink-0 my-4 md:ml-8 md:max-w-sm">
                                <img className="rounded-2xl h-40 object-contain" src="src/assets/writer.jpg" alt="" />
                            </div>
                        </article>
                    </div>
                </div>
                <div className={`min-w-full bg-gradient-to-r from-pink-${currentMode == 'dark' ? 900 : 200} to-fuchsia-${currentMode == 'dark' ? 800 : 300} flex items-center justify-center`}>
                    <div className="w-full px-10 flex flex-col md:flex-row items-center">
                        <div className="w-full md:w-3/5">
                            <div className="grid gap-1 sm:grid-cols-1 lg:grid-cols-3">
                                {images.map((img, ind) => (
                                    <div key={ind} className={`rounded-xl transform transition duration-500 hover:scale-105 mt-${ind * 4} `}>
                                        <a href="#">
                                            <div className="relative flex items-center justify-center overflow-hidden rounded-xl bg-fuchsia-300 h-80">
                                                <img className="object-fill w-full h-full" src={img} alt="Book Cover" />
                                            </div>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="w-full md:w-2/5 p-10">
                            <div className="justify-center items-center text-center">
                                <p className="text-lg">Whether you're looking for your next great read or just browsing, our selection of books has something for everyone. Discover your new favorite book today!</p>
                                <a href="/all-books" className="font-mono mt-4 inline-block px-6 py-3 bg-rose-400 text-stone-900 font-semibold rounded-lg shadow-md hover:bg-rose-500 transition hover:translate-y-1 hover:scale-105 duration-300">Browse Collection</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`min-w-full bg-gradient-to-r from-cyan-${currentMode == 'dark' ? 900 : 200} to-teal-${currentMode == 'dark' ? 800 : 300} flex items-center justify-center`}>
                    <div className="w-full max-w-screen-lg mx-auto p-8 text-white">
                        <div className="flex flex-col md:flex-row items-center">
                            <div className="w-full md:w-1/2 flex flex-col items-center text-center">
                                <span className="rounded-full bg-cyan-500 p-3 text-5xl text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="currentColor" fillRule="evenodd" d="M7.16 3.5C4.73 5.06 3.55 6.67 3.55 9.36c.16-.05.3-.05.44-.05c1.27 0 2.5.86 2.5 2.41c0 1.61-1.03 2.61-2.5 2.61c-1.9 0-2.99-1.52-2.99-4.25c0-3.8 1.75-6.53 5.02-8.42L7.16 3.5zm7 0c-2.43 1.56-3.61 3.17-3.61 5.86c.16-.05.3-.05.44-.05c1.27 0 2.5.86 2.5 2.41c0 1.61-1.03 2.61-2.5 2.61c-1.89 0-2.98-1.52-2.98-4.25c0-3.8 1.75-6.53 5.02-8.42l1.14 1.84h-.01z" clipRule="evenodd" /></svg>
                                </span>

                                <blockquote className="mt-8 flex-1">
                                    <p className="max-w-xl text-lg font-medium leading-relaxed text-foreground">Using insights from the story analytics dashboard and reader feedback, S.S. Sahoo completely rewrote her book  seven times before it was published. It has since earned over 70 million reads.</p>
                                </blockquote>
                            </div>
                            <div className="w-full md:w-1/2">
                                <img className="object-contain" src="src/assets/author.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`min-w-full bg-gradient-to-r from-purple-${currentMode == 'dark' ? 900 : 200} to-indigo-${currentMode == 'dark' ? 800 : 300} flex items-center justify-center`}>
                    <div className={`w-full px-10 text-${currentMode != 'dark' ? 'black' : 'white'}`}>
                        <div className="flex flex-col md:flex-row items-center">
                            <div className="w-full md:w-1/2">
                                Write page Screen shots here
                            </div>
                            <div className="relative w-full md:w-1/2 px-12">
                                <div className="absolute inset-0 w-20 border-dashed border-r-2 border-indigo-300"></div>
                                <div className="flex flex-col items-start space-y-2">
                                    <div className="flex items-center justify-center space-x-2">
                                        <div className="w-16  h-16 flex justify-center items-center bg-indigo-300 rounded-full"><DrawIcon /></div>
                                        <div>Share your own voice and creative tale on Scriptoria.</div>
                                    </div>
                                    <div className="flex items-center justify-center space-x-2">
                                        <div className="w-16  h-16 flex justify-center items-center bg-indigo-300 rounded-full"><Diversity2Icon /></div>
                                        <div>Build a community and  establish global fan base</div>
                                    </div>
                                    <div className="flex items-center justify-center space-x-2">
                                        <div className="w-16  h-16 flex justify-center items-center bg-indigo-300 rounded-full"><ConnectWithoutContactIcon /></div>
                                        <div>Connect with other authors who share your interests.</div>
                                    </div>
                                    <div className="flex items-center justify-center space-x-2">
                                        <div className="w-16  h-16 flex justify-center items-center bg-indigo-300 rounded-full"><PublishIcon /></div>
                                        <div>Gain popularity and have your work published</div>
                                    </div>
                                    <div className="flex items-center justify-center space-x-2">
                                        <div className="w-16  h-16 flex justify-center items-center bg-indigo-300 rounded-full"><CelebrationIcon /></div>
                                        <div>Witness your narrative blossom into a blockbuster.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute top-0 h-full w-full flex justify-between items-center text-white px-4 text-3xl">
                <button onClick={previousSlide} className="focus:outline-none">
                    <ArrowCircleLeftRoundedIcon />
                </button>
                <button onClick={nextSlide} className="focus:outline-none">
                    <ArrowCircleRightRoundedIcon />
                </button>
            </div>

            <div className="absolute bottom-0 py-4 flex justify-center gap-6 w-full items-center">
                {["About us", "Discover", "Success Stories", "How it works"].map((slide, index) => (
                    <div
                        key={"circle" + index}
                        onClick={() => setCurrent(index)}
                        className={`cursor-pointer ${index === current ? "text-white" : "text-gray-500"}`}
                    >
                        {slide}
                    </div>
                ))}
            </div>
        </div>
    );
}
