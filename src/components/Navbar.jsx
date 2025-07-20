import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";

import Loader from "./Loader";
import logoImg from "/logo.webp";

import {
  setCheckedItems,
  setCurrentMode,
} from "../store/Features/currentState/currentStateSlice";
import { fetchBooksAsync } from "../store/Features/fetchData/fetchDataSlice";
import { logoutAsync } from "../store/Features/auth/authSlice";

const pages = ["Library", "InkWell", "Treasures"];

function Navbar() {
  const currentMode = useSelector((state) => state.currentState.currentMode);
  const isLoading = useSelector((state) => state.currentState.isLoading);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const changeMode = () => {
    dispatch(setCurrentMode());
  };

  const handleClickEnter = (e) => {
    e.preventDefault();
    dispatch(setCheckedItems([searchValue]));
    dispatch(fetchBooksAsync([searchValue]));
    setSearchValue("");
    window.location.href = "/library";
  };

  const logout = () => {
    dispatch(logoutAsync());
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <header className="w-full h-fit text-slate-700 fixed top-0 z-50 flex flex-col lg:flex-row shadow-b bg-background border-b-2 border-slate-500">
        <a
          href="/"
          aria-label="Navigate to landing page"
          className="flex items-center whitespace-nowrap text-2xl font-black justify-center my-2 mx-4">
          <p className="font-customFont italic text-foreground">
            SCRIPTORIA&nbsp;&nbsp;
          </p>
        </a>
        <input type="checkbox" className="peer hidden" id="navbar-open" />
        <label
          className="absolute top-4 right-4 cursor-pointer lg:hidden"
          htmlFor="navbar-open">
          <svg
            className="h-7 w-7 text-foreground"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </label>
        <nav
          aria-label="Header Navigation"
          className="py-0 peer-checked:max-h-fit flex max-h-0 w-full flex-col items-center overflow-hidden transition duration-500 lg:ml-24 lg:max-h-full lg:flex-row justify-center">
          <ul className="flex w-full items-center m-2 flex-row justify-center">
            {pages.map((item, index) => (
              <li key={index} className="mx-2">
                <a
                  className="text-foreground font-serif"
                  href={`/${item.replace(/\s+/g, "").toLowerCase()}`}>
                  {item === "Library" ? (
                    <span className="flex flex-row">
                      <LibraryBooksIcon />
                      <p className="hidden lg:flex">{item}</p>
                    </span>
                  ) : item === "InkWell" ? (
                    <span className="flex flex-row items-center">
                      <WaterDropIcon />
                      <p className="hidden lg:flex">{item}</p>
                    </span>
                  ) : (
                    <span className="flex flex-row">
                      <FavoriteIcon />
                      <p className="hidden lg:flex">{item}</p>
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
          <div className="w-full mx-4">
            <form
              onSubmit={handleClickEnter}
              className="relative h-10 w-full rounded-full my-2 flex items-center">
              <SearchRoundedIcon className="absolute left-4 text-foregroundReverse" />
              <input
                type="text"
                placeholder="Search Book..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="h-full w-full pl-12 pr-4 rounded-full focus:outline-none bg-backgroundReverse text-foregroundReverse"
              />
            </form>
          </div>
          <div className="flex flex-row my-2">
            {user == null ? (
              <div className="my-4 flex items-center lg:my-0 lg:ml-auto lg:space-x-2 lg:space-y-0">
                <a
                  href="#"
                  title=""
                  className="whitespace-nowrap p-1 border-2 border-foreground rounded font-medium my-0 mx-1 text-foreground">
                  {" "}
                  Login{" "}
                </a>
              </div>
            ) : (
              <div>
                <Avatar
                  alt="Remy Sharp"
                  src={user.image}
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  aria-label="Handle click"
                  role="button"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleClick();
                    }
                  }}
                />
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  disableScrollLock
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  sx={{
                    padding: 0,
                    "& .MuiPaper-root": {
                      borderRadius: 2,
                      padding: 0,
                      minWidth: 50,
                    },
                    "& .MuiMenu-list": {
                      padding: 0,
                    },
                  }}>
                  <MenuItem
                    onClick={logout}
                    aria-label="Logout"
                    role="button"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        logout();
                      }
                    }}
                    sx={{
                      // padding: "0",
                      padding: "0.5rem",
                      color: "red",
                      backgroundColor: "white",
                      "&:hover": {
                        backgroundColor: "#ffebee",
                      },
                    }}>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      Logout
                    </Typography>
                  </MenuItem>
                </Menu>
              </div>
            )}
            {/* 
          <div className="m-4">
            <a
              href="#"
              title=""
              className="whitespace-nowrap rounded-xl bg-backgroundReverse px-5 py-3 font-medium text-foregroundReverse transition-all duration-200 hover:bg-cyan-600">
              Try Premium
              <AutoAwesomeIcon className="text-foregroundReverse" />
            </a>
          </div> */}
            <button
              onClick={changeMode}
              aria-label="Change mode"
              role="button"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  changeMode();
                }
              }}>
              {currentMode ? (
                <LightModeIcon className="text-foreground mx-2" />
              ) : (
                <DarkModeIcon className="text-foreground" />
              )}
            </button>
          </div>
        </nav>
      </header>
      <Outlet />
      <footer className="relative mt-20 bg-gray-900 px-4 pt-20">
        <div className="absolute -top-8 left-1/2 h-20 w-20 -translate-x-1/2 rounded-full border-2 border-cyan-100 bg-white">
          <img
            className="h-full object-contain rounded-full"
            src={logoImg}
            alt="logo image"
          />
        </div>
        <nav
          aria-label="Footer Navigation"
          className="mx-auto mb-0 flex max-w-lg flex-col gap-2 sm:gap-10 text-center sm:flex-row sm:text-left">
          <a
            aria-label="Navigate to home page"
            href="/"
            className="font-medium text-white">
            Home
          </a>
          <a
            aria-label="Navigate to support page"
            href="#"
            className="font-medium text-white">
            Support
          </a>
          <a
            aria-label="Navigate to privacy page"
            href="#"
            className="font-medium text-white">
            Privacy Policy
          </a>
          <a
            aria-label="Navigate to terms and conditions page"
            href="#"
            className="font-medium text-white">
            Terms & Conditions
          </a>
        </nav>
        <p className="py-2 text-center text-gray-300">
          © 2024 Scriptoria | All Rights Reserved
        </p>
      </footer>
      <Loader isLoading={isLoading} />
    </>
  );
}
export default Navbar;
