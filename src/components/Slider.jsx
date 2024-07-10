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
    "https://www.gutenberg.org/cache/epub/2701/pg2701.cover.medium.jpg",
    "https://www.gutenberg.org/cache/epub/145/pg145.cover.medium.jpg",
    "https://www.gutenberg.org/cache/epub/2641/pg2641.cover.medium.jpg",
    "https://www.gutenberg.org/cache/epub/100/pg100.cover.medium.jpg",
    "https://www.gutenberg.org/cache/epub/1342/pg1342.cover.medium.jpg",
    "https://www.gutenberg.org/cache/epub/16389/pg16389.cover.medium.jpg",
    "https://www.gutenberg.org/cache/epub/37106/pg37106.cover.medium.jpg",
]
// const slides = [
//     {
//         bgColor: "bg-gradient-to-r from-purple-900 to-indigo-800",
//         title: "Welcome to Book Haven",
//         heading: "Unleash Your Imagination",
//         content: "Dive into a world of endless possibilities with our extensive collection of eBooks. From thrilling adventures to heartwarming romances, find your next favorite story today.",
//         image: "https://i.pinimg.com/originals/51/82/ac/5182ac536727d576c78a9320ac62de30.jpg",
//     },
//     {
//         bgColor: "bg-gradient-to-r from-green-900 to-blue-800",
//         title: "Discover Hidden Gems",
//         heading: "Where New Authors Shine",
//         content: "Explore a curated selection of debut novels and hidden literary treasures. Support emerging writers and discover fresh, original content.",
//         image: "https://wallpapercave.com/wp/wp3386769.jpg",
//     },
//     {
//         bgColor: "bg-gradient-to-r from-pink-900 to-fuchsia-800",
//         title: "Author Success Stories",
//         heading: "Your Journey to Bestseller",
//         content: "Learn from successful authors who started just like you. Get inspired by their stories and embark on your path to becoming a best-selling novelist.",
//         image: "https://wallpaperaccess.com/full/809523.jpg",
//     },
//     {
//         bgColor: "bg-gradient-to-r from-cyan-900 to-teal-800",
//         title: "How It Works",
//         heading: "Write, Publish, Thrive",
//         content: "Join our community of writers. Create, publish, and share your stories with readers around the world. Our platform makes it easy for you to bring your stories to life.",
//         image: "https://getwallpapers.com/wallpaper/full/5/c/0/606489.jpg",
//     }
// ];

const slides = [
    {
        bgColor: "bg-gradient-to-r from-purple-200 to-indigo-300",
        title: "About Us",
    },
    {
        bgColor: "bg-gradient-to-r from-green-200 to-blue-300",
        title: "Discover",
    },
    {
        bgColor: "bg-gradient-to-r from-pink-200 to-fuchsia-300",
        title: "Author Success Stories",
    },
    {
        bgColor: "bg-gradient-to-r from-cyan-200 to-teal-300",
        title: "How It Works",
    }
];

export default function Slider() {
    const [current, setCurrent] = useState(0);
    const currentMode = useSelector((state) => state.currentState.currentMode)

    const previousSlide = () => {
        setCurrent((prev) => {
            if (prev == 0) {
                return slides.length - 1
            }
            return (prev - 1) % slides.length
        }
        );
    };

    const nextSlide = () => {
        setCurrent((prev) => {
            if (prev == slides.length - 1) {
                return 0;
            }
            return (prev + 1) % slides.length
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
                                <img className="rounded-2xl h-40" src="https://images.unsplash.com/photo-1663287695452-bf59337d8746?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=500&amp;q=60" alt="" />
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
                                <img className="rounded-2xl h-40" src="https://images.unsplash.com/photo-1663287695452-bf59337d8746?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=500&amp;q=60" alt="" />
                            </div>
                        </article>
                    </div>
                </div>
                <div className={`min-w-full h-screen bg-gradient-to-r from-pink-${currentMode == 'dark' ? 900 : 200} to-fuchsia-${currentMode == 'dark' ? 800 : 300} flex items-center justify-center`}>
                    <div className="w-full px-10">
                        <div className="w-full md:w-3/5">
                            <div className="grid gap-1 sm:grid-cols-2 lg:grid-cols-4">
                                {images.map((img, ind) => (
                                    <div key={ind} className="rounded-xl shadow-lg transform transition duration-500 hover:scale-105">
                                        <a href="#">
                                            <div className="relative flex items-center justify-center overflow-hidden rounded-xl bg-fuchsia-300" style={{ height: '250px' }}>
                                                <img className="object-fill w-full h-full" src={img} alt="Book Cover" />
                                            </div>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="w-full">
                            
                        </div>
                    </div>
                </div>
                <div className={`min-w-full h-screen bg-gradient-to-r from-cyan-${currentMode == 'dark' ? 900 : 200} to-teal-${currentMode == 'dark' ? 800 : 300} flex items-center justify-center`}>
                    <div className="w-full max-w-screen-lg mx-auto p-8 text-white">
                        <div className="flex flex-col md:flex-row items-center">
                            <div className="w-full md:w-1/2">
                                <img src={slides[3].image} className="object-cover w-full h-full" alt={slides[3].title} />
                            </div>
                            <div className="w-full md:w-1/2 px-4">
                                <h2 className="text-3xl font-bold">{slides[3].title}</h2>
                                <h3 className="text-xl">{slides[3].heading}</h3>
                                <p>{slides[3].content}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`min-w-full h-screen bg-gradient-to-r from-purple-${currentMode == 'dark' ? 900 : 200} to-indigo-${currentMode == 'dark' ? 800 : 300} flex items-center justify-center`}>
                    <div className="w-full px-10 text-white ">
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
