import React, { useState } from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Checkbox from "@mui/material/Checkbox";
import { pink } from "@mui/material/colors";

const BooksSidebar = ({ data, checked, setChecked }) => {
  const [openGenre, setOpenGenre] = useState([]);
  const [openSubGenre, setOpenSubGenre] = useState([]);

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
    <div className="w-60 flex flex-col">
      <div className="grow flex flex-col border-left">
        {data.map((genre, index) => (
          <div key={index}>
            {checkMenuItemDisplay(genre.genre) && (
              <div key={index}>
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
                        />
                      ) : (
                        <ArrowDropDownIcon
                          className="h-6 w-6"
                          onClick={() => handleSvgClick(index)}
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
                            <div className="text-foreground pt-2 pb-2 text-md">
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
                                />
                              ) : (
                                <ArrowDropDownIcon
                                  className="h-6 w-6"
                                  onClick={() =>
                                    handleSubSvgClick(index + " " + ind)
                                  }
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
                                    checked={checked && checked.includes(subSubGenre)}
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
  );
};

export default BooksSidebar;
