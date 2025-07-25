import PropTypes from "prop-types";
import { useRef } from "react";
import { useDispatch } from "react-redux";

import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

import AutoTextarea from "./AutoTextarea";

import { setIsLoading } from "../store/Features/currentState/currentStateSlice";

const Item = ({
  item,
  index,
  dragHandleProps,
  removeContent,
  handleChange,
  handleTypeChange,
}) => {
  const { onMouseDown, onTouchStart } = dragHandleProps;
  const imageInputRef = useRef(null);
  const dispatch = useDispatch();

  const convertImage = async (file) => {
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "scriptoria");
    data.append("cloud_name", "dpmtu5hlx");

    try {
      dispatch(setIsLoading(true));
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dpmtu5hlx/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const uploadedImageURL = await res.json();
      handleChange(index, uploadedImageURL.secure_url);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const handleLabelClick = () => {
    imageInputRef.current?.click();
  };

  return (
    <div className="disable-select">
      {item.type === "Image" ? (
        <div className="w-[95%] mb-4 p-4 relative border border-cyan-500 rounded-md flex justify-center items-center">
          <div
            className="flex justify-end absolute -top-1 -right-6 cursor-pointer"
            onClick={() => removeContent(index)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") removeContent(index);
            }}>
            <CancelPresentationIcon />
          </div>

          <div
            className="disable-select dragHandle flex justify-end absolute top-6 -right-6 cursor-pointer"
            onTouchStart={(e) => {
              e.preventDefault();
              e.target.style.backgroundColor = "blue";
              document.body.style.overflow = "hidden";
              onTouchStart(e);
            }}
            onMouseDown={(e) => {
              document.body.style.overflow = "hidden";
              onMouseDown(e);
            }}
            onTouchEnd={(e) => {
              e.target.style.backgroundColor = "black";
              document.body.style.overflow = "visible";
            }}
            onMouseUp={() => {
              document.body.style.overflow = "visible";
            }}>
            <DragIndicatorIcon />
          </div>

          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files && convertImage(e.target.files[0])}
            style={{ display: "none" }}
          />

          {item.text === "" ? (
            <label
              onClick={handleLabelClick}
              className="custom-file-input-label w-36 h-8 border border-cyan-500 rounded-md flex items-center justify-center cursor-pointer">
              Choose file
            </label>
          ) : (
            <div className="relative w-fit">
              <img
                src={item.text}
                alt="Uploaded"
                className="rounded-lg border border-cyan-500 w-auto"
              />
              <button
                onClick={() => handleChange(index, "")}
                className="absolute top-0 right-0"
                aria-label="Remove Image">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="w-[95%] mb-4 relative">
          <div
            className="flex justify-end absolute -top-1 -right-6 cursor-pointer"
            onClick={() => removeContent(index)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") removeContent(index);
            }}>
            <CancelPresentationIcon />
          </div>

          <div
            className="disable-select dragHandle flex justify-end absolute top-6 -right-6 cursor-pointer"
            onTouchStart={(e) => {
              e.preventDefault();
              e.target.style.backgroundColor = "blue";
              document.body.style.overflow = "hidden";
              onTouchStart(e);
            }}
            onMouseDown={(e) => {
              document.body.style.overflow = "hidden";
              onMouseDown(e);
            }}
            onTouchEnd={(e) => {
              e.target.style.backgroundColor = "black";
              document.body.style.overflow = "visible";
            }}
            onMouseUp={() => {
              document.body.style.overflow = "visible";
            }}>
            <DragIndicatorIcon />
          </div>

          <AutoTextarea
            item={item}
            ind={index}
            handleChange={handleChange}
            changeType={handleTypeChange}
            className="overflow-scroll"
          />
        </div>
      )}
    </div>
  );
};

export default Item;

Item.propTypes = {
  item: PropTypes.shape({
    type: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    key: PropTypes.number,
  }).isRequired,
  index: PropTypes.number,
  dragHandleProps: PropTypes.shape({
    onMouseDown: PropTypes.func,
    onTouchStart: PropTypes.func,
  }).isRequired,
  removeContent: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleTypeChange: PropTypes.func.isRequired,
};
