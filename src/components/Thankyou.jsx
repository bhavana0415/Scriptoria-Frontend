import libraryImg from '/library.jpg';

const Thankyou = () => {
    return (
        <div className="flex h-screen items-center justify-center py-10">
            <div className="mx-auto max-w-md overflow-hidden rounded-3xl text-gray-700 shadow-md">
                <div className="h-40 bg-rose-500 pt-10 sm:h-56">
                    <img className="h-full w-full object-contain" src="https://componentland.com/images/thank-you-illustration.png" alt="" />
                </div>
                <div className="flex flex-col items-center bg-white px-4 py-10">
                    <h2 className="mb-2 text-3xl font-bold text-rose-500 sm:text-4xl">Thank you!</h2>
                    <p className="mb-8 font-medium text-gray-500">For supporting me with your donation</p>
                    <div className="flex items-center rounded-xl bg-rose-500 p-4">
                        <img className="h-12 w-12 rounded-full border-4 border-white object-cover" src={libraryImg} alt="" />
                        <div className="ml-4 w-56">
                            <p className="text-xs font-medium text-gray-100">From</p>
                            <p className="font-medium text-white">Emilia Anvil</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Thankyou
