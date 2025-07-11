import { useState } from "react";
import PreviewDialog from "./PreviewDialog";

const MyCard = ({ bookDetails, bookContent, setEditingBook }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const handleClose = () => {
    setPreviewOpen(false);
  };

  return (
    <>
      <div className="justify-center items-center shadow-sm shadow-cyan-500 p-6 mb-4 rounded-lg h-full w-[250px]">
        <div className={`relative rounded-xl flex flex-col h-full`}>
          <div className="relative transform transition duration-500 hover:scale-105 flex items-center justify-center overflow-hidden rounded-xl bg-fuchsia-300 h-64">
            <img
              className="object-fill w-full h-full"
              src={bookDetails.image}
              alt="Book Cover"
              aria-label="Open Preview"
              role="button"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setPreviewOpen(true);
                }
              }}
              onClick={() => setPreviewOpen(true)}
            />
          </div>
          <h3 className="mt-1 text-lg font-mono">{bookDetails.bookName}</h3>
          <p className="my-1 text-sm font-mono">{bookDetails.description}</p>
        </div>
      </div>
      {previewOpen && (
        <PreviewDialog
          bookDetails={bookDetails}
          book_id={null}
          open={previewOpen}
          content={bookContent}
          handleClose={handleClose}
          isPreview={true}
          setEditingBook={setEditingBook}
        />
      )}
    </>
  );
};

export default MyCard;
