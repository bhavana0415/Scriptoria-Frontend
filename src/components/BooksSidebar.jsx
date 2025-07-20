import { useState } from "react";
import PropTypes from "prop-types";

import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Checkbox from "@mui/material/Checkbox";
import { pink } from "@mui/material/colors";
import OpenWithIcon from "@mui/icons-material/OpenWith";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const BooksSidebar = ({ children, data, checked, setChecked }) => {
  const [openGenre, setOpenGenre] = useState([]);
  const [openSubGenre, setOpenSubGenre] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSvgClick = (index) => {
    if (openGenre.includes(index)) {
      setOpenGenre((prev) => prev.filter((ind) => ind !== index));
    } else {
      setOpenGenre((prev) => [...prev, index]);
    }
  };

  const handleSubSvgClick = (index) => {
    if (openSubGenre.includes(index)) {
      setOpenSubGenre((prev) => prev.filter((ind) => ind !== index));
    } else {
      setOpenSubGenre((prev) => [...prev, index]);
    }
  };

  const handleCheck = (value) => {
    setChecked((prev) => {
      if (prev && prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const checkMenuItemDisplay = (subMenuItems) => {
    if (!subMenuItems) return false;
    return true;
  };

  return (
    <div className="relative min-h-screen lg:flex">
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className={`absolute top-2 rounded-full p-2 lg:hidden`}
        aria-label="Toggle Menu">
        {!menuOpen && <OpenWithIcon />}
      </button>
      <aside
        className={`bg-background min-w-[225px] w-fit space-y-6 pt-2 px-0 absolute inset-y-0 left-0 transform lg:relative lg:translate-x-0 transition-transform duration-200 ease-in-out overflow-y-auto border border-r-2 border-slate-500  ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ zIndex: 9 }}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`w-full flex justify-end pt-2 pr-2`}
          aria-label="Toggle Menu">
          {menuOpen && <HighlightOffIcon />}
        </button>

        <div className="w-full flex flex-col">
          <div className="grow flex flex-col border-left">
            {data.map((genre, index) => (
              <div key={genre.genre}>
                {checkMenuItemDisplay(genre.genre) && (
                  <div>
                    <div className="flex items-center justify-between py-1 pl-2 border-g-bottom">
                      <div>
                        <div className="text-foreground pt-2 pb-2 font-bold text-md">
                          {genre.genre}
                        </div>
                      </div>
                      {genre.genre && (
                        <>
                          {openGenre.includes(index) ? (
                            <ArrowDropUpIcon
                              className="h-6 w-6"
                              onClick={() => handleSvgClick(index)}
                              aria-label="Close menu"
                              role="button"
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  handleSvgClick(index);
                                }
                              }}
                            />
                          ) : (
                            <ArrowDropDownIcon
                              className="h-6 w-6"
                              onClick={() => handleSvgClick(index)}
                              aria-label="Open menu"
                              role="button"
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  handleSvgClick(index);
                                }
                              }}
                            />
                          )}
                        </>
                      )}
                    </div>
                    {genre.genre && openGenre.includes(index) && (
                      <div className="border-g-bottom">
                        {genre.subGenres.map((subgenre, ind) => (
                          <div key={subgenre.name}>
                            <div className="flex items-center justify-between pl-4 border-g-bottom">
                              <div>
                                <div className="text-foreground italic pt-2 pb-2 text-md">
                                  {subgenre.name}
                                </div>
                              </div>
                              {subgenre.name && (
                                <>
                                  {openSubGenre.includes(index + " " + ind) ? (
                                    <ArrowDropUpIcon
                                      className="h-6 w-6"
                                      onClick={() =>
                                        handleSubSvgClick(index + " " + ind)
                                      }
                                      aria-label="Close sub menu"
                                      role="button"
                                      onKeyDown={(e) => {
                                        if (
                                          e.key === "Enter" ||
                                          e.key === " "
                                        ) {
                                          handleSubSvgClick(index + " " + ind);
                                        }
                                      }}
                                    />
                                  ) : (
                                    <ArrowDropDownIcon
                                      className="h-6 w-6"
                                      onClick={() =>
                                        handleSubSvgClick(index + " " + ind)
                                      }
                                      aria-label="Open sub menu"
                                      role="button"
                                      onKeyDown={(e) => {
                                        if (
                                          e.key === "Enter" ||
                                          e.key === " "
                                        ) {
                                          handleSubSvgClick(index + " " + ind);
                                        }
                                      }}
                                    />
                                  )}
                                </>
                              )}
                            </div>
                            {subgenre.name &&
                              openSubGenre.includes(index + " " + ind) && (
                                <div className="border-g-bottom">
                                  {subgenre.subSubGenres.map((subSubGenre) => (
                                    <div
                                      key={subSubGenre}
                                      className="flex items-center text-sm pl-4">
                                      <Checkbox
                                        onClick={() => handleCheck(subSubGenre)}
                                        checked={
                                          checked &&
                                          checked.includes(subSubGenre)
                                        }
                                        sx={{
                                          color: pink[800],
                                          "&.Mui-checked": {
                                            color: pink[600],
                                          },
                                        }}
                                      />
                                      <span>{subSubGenre}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
            <div className="w-full h-60"></div>
          </div>
        </div>
      </aside>
      <div className="w-full p-6">{children}</div>
    </div>
  );
};

BooksSidebar.propTypes = {
  children: PropTypes.node,
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  checked: PropTypes.arrayOf(PropTypes.string).isRequired,
  setChecked: PropTypes.func.isRequired,
};

export default BooksSidebar;
