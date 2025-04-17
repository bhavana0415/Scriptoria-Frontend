import { useRef, useState } from "react";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import AutoTextarea from "../../components/AutoTextarea";
import PreviewDialog from "../../components/PreviewDialog";
import { Tooltip } from "@mui/material";
import { setIsLoading } from "../../store/Features/currentState/currentStateSlice";

const Write = ({ bookContent, book_id, bookDetails, setEditingBook }) => {
  const [content, setContent] = useState(bookContent);

  const [previewOpen, setPreviewOpen] = useState(false);
  const imageInputRef = useRef(null);

  const handleChange = (index, value) => {
    let newContent = [...content];
    newContent[index] = {
      ...newContent[index],
      text: value,
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

  const convertImage = async (file, index) => {
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "scriptoria");
    data.append("cloud_name", "dpmtu5hlx");

    const url = "https://api.cloudinary.com/v1_1/dpmtu5hlx/image/upload";
    try {
      setIsLoading(true);
      const res = await fetch(url, {
        method: "POST",
        body: data,
      });

      const uploadedImageURL = await res.json();
      handleChange(index, uploadedImageURL.secure_url);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLabelClick = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  return (
    <div>
      <div className="w-full h-20 bg-background-500"></div>
      <div className="flex flex-row">
        <div className="w-1/3 md:w-1/6 px-2 ">
          {["Chapter", "Heading", "Subheading", "Paragraph", "Image"].map(
            (item) => (
              <div
                key={item}
                className="border-2 border-pink-600 rounded-lg m-2 cursor-pointer"
                onClick={() => handleSelectButton(item)}>
                <button className="cursor-pointer m-2">Add {item}</button>
              </div>
            )
          )}
        </div>
        <div className="w-2/3 md:w-5/6 m-2 min-h-screen">
          <div className="w-full flex justify-end">
            <button
              disabled={content.length == 0}
              className={`bg-pink-500 mr-2 ${
                content.length == 0 ? "" : "hover:bg-pink-700"
              } text-white font-bold py-2 px-4 rounded-full`}
              onClick={() => setPreviewOpen(true)}>
              Preview
            </button>
            <Tooltip
              title="Publish feature currently unavailable"
              placement="top">
              <span>
                <button
                  className="bg-pink-500 mr-2 text-white font-bold py-2 px-4 rounded-full"
                  disabled={true}>
                  Publish
                </button>
              </span>
            </Tooltip>
          </div>
          <div className="mx-auto max-w-screen-lg justify-center px-2 py-4">
            {content.map((item, index) => {
              if (item.type === "Image") {
                return (
                  <div
                    key={item}
                    className="w-[95%] mb-4 p-4 relative border border-cyan-500 rounded-md flex justify-center items-center">
                    <div
                      className="flex justify-end absolute -top-1 -right-6 cursor-pointer"
                      onClick={() => removeContent(index)}>
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
                        <button onClick={() => handleChange(index, "")}>
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
                  <div key={item} className="w-[95%] mb-4 relative">
                    <div
                      className="flex justify-end absolute -top-1 -right-6 cursor-pointer"
                      onClick={() => removeContent(index)}>
                      <CancelPresentationIcon />
                    </div>
                    <AutoTextarea
                      item={item}
                      ind={index}
                      handleChange={handleChange}
                    />
                  </div>
                );
              }
            })}
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
    </div>
  );
};

export default Write;
