import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useEffect } from "react";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setCurrentMode } from '../store/Features/currentState/currentStateSlice';

const pages = ['Browse', 'Books', 'Write'];

function Navbar() {

    const currentMode = useSelector((state)=>state.currentState.currentMode)

    const dispatch = useDispatch()

    useEffect(() => {
        if (currentMode=='dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [currentMode]);

    const changeMode = () => {
        dispatch(setCurrentMode(currentMode=='dark' ? 'light' : 'dark'))
    }


    return (
        <>
            <header className="w-full text-slate-700 fixed top-0 z-50 flex flex-col lg:flex-row shadow-b bg-background border-b-2 border-slate-500">
                <a href="#" className="flex items-center whitespace-nowrap text-2xl font-black justify-center m-4">
                    <p className="font-customFont italic text-foreground">SCRIPTORIA&nbsp;&nbsp;</p>
                </a>
                <input type="checkbox" className="peer hidden" id="navbar-open" />
                <label className="absolute top-4 right-4 cursor-pointer lg:hidden" htmlFor="navbar-open">
                    <svg className="h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </label>
                <nav aria-label="Header Navigation" className="py-2 peer-checked:max-h-fit flex max-h-0 w-full flex-col items-center overflow-hidden transition-all lg:ml-24 lg:max-h-full lg:flex-row justify-center bg-background">
                    <ul className="flex w-full flex-col items-center space-y-2 lg:flex-row lg:justify-center lg:space-y-0">
                        {pages.map((item, ind) => (
                            <>
                                <li key={ind} className="lg:mr-6"><a className="rounded text-foreground font-serif text-lg" href="#">{item}</a></li>
                            </>
                        ))}
                    </ul>

                    <div className='relative h-10 w-1/2 rounded-full mx-4 flex items-center'>
                        <SearchRoundedIcon className='absolute left-4 text-foregroundReverse' />
                        <input
                            type='text'
                            placeholder='Search...'
                            className='h-full w-full pl-12 pr-4 rounded-full focus:outline-none bg-customColorFour text-foregroundReverse'
                        />
                    </div>
                    <div className="my-4 flex items-center lg:my-0 lg:ml-auto lg:space-x-2 lg:space-y-0">
                        <a href="#" title="" className="whitespace-nowrap rounded font-medium my-0 mx-1 text-foreground"> Sign In </a>
                        <a href="#" title="" className="whitespace-nowrap rounded font-medium my-0 mx-1 text-foreground"> Sign Up </a>
                    </div>
                    <div className='m-4'>
                        <a href="#" title="" className="whitespace-nowrap rounded-xl bg-backgroundReverse px-5 py-3 font-medium text-foregroundReverse transition-all duration-200 hover:bg-cyan-600">Try Premium<AutoAwesomeIcon className='text-foregroundReverse' /></a>
                    </div>
                    <button onClick={changeMode}>
                        {currentMode ? (<LightModeIcon className='text-foreground mx-2' />) : (<DarkModeIcon className='text-foreground' />)}
                    </button>
                </nav>
            </header>
            <Outlet />
        </>
    );
}
export default Navbar;