import { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

// import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import { Tooltip } from "@mui/material";

// import AutoTextarea from "../../components/AutoTextarea";
import PreviewDialog from "../../components/PreviewDialog";
import Draggable from "../../components/Draggable";

// import { setIsLoading } from "../../store/Features/currentState/currentStateSlice";
import { updateBookAsync } from "../../store/Features/writeContent/writeContentSlice";

const Write = ({ bookContent, book_id, bookDetails, setEditingBook }) => {
  const [content, setContent] = useState(bookContent);
  const dispatch = useDispatch();

  const [previewOpen, setPreviewOpen] = useState(false);

  const user = useSelector((state) => state.auth.user);

  const handleChange = (index, value) => {
    let newContent = [...content];
    newContent[index] = {
      ...newContent[index],
      text: value,
    };
    setContent(newContent);
  };

  const handleTypeChange = (index, type) => {
    let newContent = [...content];
    newContent[index] = {
      ...newContent[index],
      type,
    };
    setContent(newContent);
  };

  const handleSelectButton = (type) => {
    let newContent = [...content];
    newContent.push({ type: type, text: "" });
    setContent(newContent);
  };

  const handleClose = () => {
    setPreviewOpen(false);
  };

  const removeContent = (index) => {
    let newContent = [...content];
    newContent.splice(index, 1);
    setContent(newContent);
  };

  const saveBook = () => {
    const data = {
      data: {
        bookDetails: bookDetails,
        content,
      },
      bookId: book_id,
      user: user.userId,
    };
    dispatch(updateBookAsync({ ...data }));
  };

  return (
    <div>
      <div className="w-full h-20 bg-background-500"></div>
      <div className="flex flex-row">
        <div className="w-1/4 md:w-1/6 px-2 fixed">
          {["Chapter", "Heading", "Subheading", "Paragraph", "Image"].map(
            (item) => (
              <button
                key={item}
                className="w-full overflow-hidden text-ellipsis border-2 border-pink-600 rounded-lg m-2 cursor-pointer cursor-pointer p-2"
                onClick={() => handleSelectButton(item)}
                aria-label="Select Button"
                role="button"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleSelectButton(item);
                  }
                }}>
                Add {item}
              </button>
            )
          )}
        </div>
        <div className="w-1/4 md:w-1/6 px-2 "></div>
        <div className="w-3/4 md:w-5/6 m-2 min-h-screen">
          <div className="w-full flex justify-end">
            <button
              disabled={content.length == 0}
              className={`bg-pink-900 mr-2 ${
                content.length == 0 ? "" : "hover:bg-pink-800"
              } text-white font-bold py-2 px-4 rounded-full`}
              onClick={() => setPreviewOpen(true)}>
              Preview
            </button>
            <Tooltip
              title="Publish feature currently unavailable"
              placement="top">
              <span>
                <button
                  className="bg-pink-900 mr-2 text-white font-bold py-2 px-4 rounded-full"
                  disabled={true}>
                  Publish
                </button>
              </span>
            </Tooltip>
          </div>
          <div className="mx-auto max-w-screen-lg justify-center px-2 py-4">
            {/* {content.map((item, index) => {
              if (item.type === "Image") {
                return (
                  <div
                    key={item.type + index}
                    className="w-[95%] mb-4 p-4 relative border border-cyan-500 rounded-md flex justify-center items-center">
                    <div
                      className="flex justify-end absolute -top-1 -right-6 cursor-pointer"
                      onClick={() => removeContent(index)}
                      aria-label="Remove Content"
                      role="button"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          removeContent(index);
                        }
                      }}>
                      <CancelPresentationIcon />
                    </div>
                    <input
                      ref={imageInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        e.target.files && convertImage(e.target.files[0], index)
                      }
                      style={{
                        display: "none",
                      }}
                    />
                    {item.text === "" && (
                      <label
                        onClick={handleLabelClick}
                        className="custom-file-input-label w-36 h-8 border border-cyan-500 rounded-md flex items-center justify-center cursor-pointer"
                        htmlFor="customFile">
                        Choose file
                      </label>
                    )}
                    {item.text !== "" && (
                      <div className="relative w-fit">
                        <div style={{ display: "inline-block" }}>
                          <img
                            src={item.text}
                            alt="Uploaded"
                            className="rounded-lg border border-cyan-500 w-auto"
                          />
                        </div>
                        <button
                          onClick={() => handleChange(index, "")}
                          aria-label="Handle Change"
                          role="button"
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              handleChange(index, "");
                            }
                          }}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6 absolute top-0 right-0">
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
                );
              } else {
                return (
                  <div
                    key={item.type + index}
                    className="w-[95%] mb-4 relative">
                    <div
                      className="flex justify-end absolute -top-1 -right-6 cursor-pointer"
                      onClick={() => removeContent(index)}
                      aria-label="Remove Content"
                      role="button"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          removeContent(index);
                        }
                      }}>
                      <CancelPresentationIcon />
                    </div>
                    <AutoTextarea
                      item={item}
                      ind={index}
                      handleChange={handleChange}
                      changeType={handleTypeChange}
                      className="overflow-scroll"
                    />
                  </div>
                );
              }
            })} */}

            <Draggable
              content={content}
              setContent={setContent}
              removeContent={removeContent}
              handleChange={handleChange}
              handleTypeChange={handleTypeChange}
            />
          </div>
        </div>
      </div>
      {previewOpen && (
        <PreviewDialog
          setEditingBook={setEditingBook}
          bookDetails={bookDetails}
          book_id={book_id}
          open={previewOpen}
          content={content}
          handleClose={handleClose}
          isPreview={false}
        />
      )}
      {book_id && (
        <div className="w-full flex justify-end">
          <button
            disabled={content.length == 0}
            className={`bg-pink-500 mr-6 ${
              content.length == 0 ? "" : "hover:bg-pink-700"
            } text-white font-bold py-2 px-4 rounded-md`}
            onClick={saveBook}
            aria-label="Save Book"
            role="button"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                saveBook();
              }
            }}>
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

Write.propTypes = {
  bookContent: PropTypes.arrayOf(PropTypes.any).isRequired,
  book_id: PropTypes.string.isRequired,
  bookDetails: PropTypes.any.isRequired,
  setEditingBook: PropTypes.func.isRequired,
};

export default Write;
