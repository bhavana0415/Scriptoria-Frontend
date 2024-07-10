import NorthEastIcon from '@mui/icons-material/NorthEast';

export function Welcome() {
    return (
        <div className='h-screen'>
            <div className="w-full h-20 bg-background-500"></div>
        <div className="flex flex-col lg:flex-row">
            <section className="mt-[50px] py-16 lg:w-3/5">
                <div className="relative mx-auto flex w-full flex-col items-center justify-center sm:max-w-screen-sm md:max-w-screen-md lg:flex-row">
                    <div className="text-center relative z-10">
                        <h2 className="bg-clip-text text-3xl font-extrabold text-gray-500 sm:text-5xl">Get Your OWN Collection</h2>
                        <p className="bg-gradient-to-r from-pink-500 to-indigo-500 bg-clip-text text-4xl font-extrabold text-transparent sm:text-6xl">Find & Download books Online for free!!!</p>
                        <p className="bg-gradient-to-r from-pink-700 to-indigo-700 bg-clip-text text-4xl font-extrabold text-transparent sm:text-6xl">Wide range of books available</p>
                        <a href="#" className="shadow-pink-600/30 mt-10 mx-2 inline-flex h-12 items-center rounded-full bg-pink-500 px-6 py-3 text-xl font-light text-white shadow-md transition hover:translate-y-1 hover:scale-105 hover:bg-pink-600 hover:shadow-lg">Start Reading <NorthEastIcon /></a>
                        <a href="#" className="shadow-pink-600/30 mt-10 mx-2 inline-flex h-12 items-center rounded-full bg-indigo-500 px-6 py-3 text-xl font-light text-white shadow-md transition hover:translate-y-1 hover:scale-105 hover:bg-indigo-600 hover:shadow-lg">Start Writing <NorthEastIcon /></a>
                    </div>
                </div>
            </section>
            <section className="relative flex justify-center items-center">
                <div className='absolute top-40 left-0 h-96 w-96 bg-cyan-300 rounded-full z-0 mix-blend-multiply filter blur-3xl opacity-20'></div>
                <div className='absolute top-40 -right-4 h-96 w-96 bg-teal-300 rounded-full z-0 mix-blend-multiply filter blur-3xl opacity-20'></div>
                <div className='absolute top-10 left-0 h-96 w-96 bg-purple-300 rounded-full z-0 mix-blend-multiply filter blur-3xl opacity-20'></div>
                <div className='absolute top-10 -right-4 h-96 w-96 bg-rose-300 rounded-full z-0 mix-blend-multiply filter blur-3xl opacity-20'></div>
                <img
                    src="src/assets/ebook.png"
                    alt=""
                    className="w-5/6 h-5/6"
                />
            </section>
        </div>
        </div>
    )
}