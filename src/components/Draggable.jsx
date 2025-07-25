import { useEffect, useRef, useState } from "react";
import DraggableList from "react-draggable-list";
import PropTypes from "prop-types";

import Item from "./DraggableItem";

export default function Draggable({
  content,
  setContent,
  removeContent,
  handleChange,
  handleTypeChange,
}) {
  const [list, setList] = useState([]);
  const containerRef = useRef();

  useEffect(() => {
    // Add temporary key for drag tracking
    setList(content.map((item, index) => ({ ...item, _tempKey: index })));
  }, [content]);

  const _onListChange = (newList) => {
    setList(newList);
    // eslint-disable-next-line no-unused-vars
    const cleanedList = newList.map(({ _tempKey, ...rest }) => rest);
    setContent(cleanedList);
  };

  // eslint-disable-next-line react/prop-types
  const ItemTemplate = ({ item, dragHandleProps, itemIndex }) => (
    <Item
      item={item}
      index={itemIndex}
      dragHandleProps={dragHandleProps}
      handleTypeChange={handleTypeChange}
      removeContent={removeContent}
      handleChange={handleChange}
    />
  );

  return (
    <div>
      <div ref={containerRef} style={{ touchAction: "pan-y" }}>
        <DraggableList
          itemKey="_tempKey"
          template={ItemTemplate}
          list={list}
          onMoveEnd={_onListChange}
          container={() => containerRef.current}
        />
      </div>
    </div>
  );
}

Draggable.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
  setContent: PropTypes.func.isRequired,
  removeContent: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleTypeChange: PropTypes.func.isRequired,
};

// import PropTypes from "prop-types";
// import DraggableList from "react-draggable-list";
// import { useEffect, useRef, useState } from "react";

// import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
// import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

// import AutoTextarea from "./AutoTextarea";
// import { useDispatch } from "react-redux";
// import { setIsLoading } from "../store/Features/currentState/currentStateSlice";

// const Item = ({
//   item,
//   dragHandleProps,
//   removeContent,
//   handleChange,
//   handleTypeChange,
// }) => {
//   const { onMouseDown, onTouchStart } = dragHandleProps;

//   const imageInputRef = useRef(null);
//   const dispatch = useDispatch();

//   const convertImage = async (file, index) => {
//     if (!file) return;

//     const data = new FormData();
//     data.append("file", file);
//     data.append("upload_preset", "scriptoria");
//     data.append("cloud_name", "dpmtu5hlx");

//     const url = "https://api.cloudinary.com/v1_1/dpmtu5hlx/image/upload";
//     try {
//       dispatch(setIsLoading(true));
//       const res = await fetch(url, {
//         method: "POST",
//         body: data,
//       });

//       const uploadedImageURL = await res.json();
//       handleChange(index, uploadedImageURL.secure_url);
//     } catch (error) {
//       console.error("Error uploading image:", error);
//     } finally {
//       dispatch(setIsLoading(false));
//     }
//   };

//   const handleLabelClick = () => {
//     if (imageInputRef.current) {
//       imageInputRef.current.click();
//     }
//   };

//   return (
//     <div className="disable-select">
//       {item.type === "Image" ? (
//         <div
//           key={item.type + item.key}
//           className="w-[95%] mb-4 p-4 relative border border-cyan-500 rounded-md flex justify-center items-center">
//           <div
//             className="flex justify-end absolute -top-1 -right-6 cursor-pointer"
//             onClick={() => removeContent(item.key)}
//             aria-label="Remove Content"
//             role="button"
//             onKeyDown={(e) => {
//               if (e.key === "Enter" || e.key === " ") {
//                 removeContent(item.key);
//               }
//             }}>
//             <CancelPresentationIcon />
//           </div>
//           <div
//             className="disable-select dragHandle flex justify-end absolute top-6 -right-6 cursor-pointer"
//             onTouchStart={(e) => {
//               e.preventDefault();
//               e.target.style.backgroundColor = "blue";
//               document.body.style.overflow = "hidden";
//               onTouchStart(e);
//             }}
//             onMouseDown={(e) => {
//               document.body.style.overflow = "hidden";
//               onMouseDown(e);
//             }}
//             onTouchEnd={(e) => {
//               e.target.style.backgroundColor = "black";
//               document.body.style.overflow = "visible";
//             }}
//             onMouseUp={() => {
//               document.body.style.overflow = "visible";
//             }}>
//             <DragIndicatorIcon />
//           </div>
//           <input
//             ref={imageInputRef}
//             type="file"
//             accept="image/*"
//             onChange={(e) =>
//               e.target.files && convertImage(e.target.files[0], item.key)
//             }
//             style={{
//               display: "none",
//             }}
//           />
//           {item.text === "" && (
//             <label
//               onClick={handleLabelClick}
//               className="custom-file-input-label w-36 h-8 border border-cyan-500 rounded-md flex items-center justify-center cursor-pointer"
//               htmlFor="customFile">
//               Choose file
//             </label>
//           )}
//           {item.text !== "" && (
//             <div className="relative w-fit">
//               <div style={{ display: "inline-block" }}>
//                 <img
//                   src={item.text}
//                   alt="Uploaded"
//                   className="rounded-lg border border-cyan-500 w-auto"
//                 />
//               </div>
//               <button
//                 onClick={() => handleChange(item.key, "")}
//                 aria-label="Handle Change"
//                 role="button"
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter" || e.key === " ") {
//                     handleChange(item.key, "");
//                   }
//                 }}>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth="1.5"
//                   stroke="currentColor"
//                   className="w-6 h-6 absolute top-0 right-0">
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
//                   />
//                 </svg>
//               </button>
//             </div>
//           )}
//         </div>
//       ) : (
//         <div key={item.type + item.key} className="w-[95%] mb-4 relative">
//           <div
//             className="flex justify-end absolute -top-1 -right-6 cursor-pointer"
//             onClick={() => removeContent(item.key)}
//             aria-label="Remove Content"
//             role="button"
//             onKeyDown={(e) => {
//               if (e.key === "Enter" || e.key === " ") {
//                 removeContent(item.key);
//               }
//             }}>
//             <CancelPresentationIcon />
//           </div>
//           <div
//             className="disable-select dragHandle flex justify-end absolute top-6 -right-6 cursor-pointer"
//             onTouchStart={(e) => {
//               e.preventDefault();
//               e.target.style.backgroundColor = "blue";
//               document.body.style.overflow = "hidden";
//               onTouchStart(e);
//             }}
//             onMouseDown={(e) => {
//               document.body.style.overflow = "hidden";
//               onMouseDown(e);
//             }}
//             onTouchEnd={(e) => {
//               e.target.style.backgroundColor = "black";
//               document.body.style.overflow = "visible";
//             }}
//             onMouseUp={() => {
//               document.body.style.overflow = "visible";
//             }}>
//             <DragIndicatorIcon />
//           </div>
//           <AutoTextarea
//             item={item}
//             ind={item.key}
//             handleChange={handleChange}
//             changeType={handleTypeChange}
//             className="overflow-scroll"
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// Item.propTypes = {
//   item: PropTypes.shape({
//     type: PropTypes.string.isRequired,
//     text: PropTypes.string.isRequired,
//     key: PropTypes.number,
//   }).isRequired,
//   dragHandleProps: PropTypes.shape({
//     onMouseDown: PropTypes.func,
//     onTouchStart: PropTypes.func,
//   }).isRequired,
//   removeContent: PropTypes.func.isRequired,
//   handleChange: PropTypes.func.isRequired,
//   handleTypeChange: PropTypes.func.isRequired,
// };

// export default function Draggable({
//   content,
//   setContent,
//   removeContent,
//   handleChange,
//   handleTypeChange,
// }) {
//   const [list, setList] = useState([]);

//   useEffect(() => {
//     setList(content.map((item, index) => ({ ...item, key: index })));
//   }, [content]);

//   const containerRef = useRef();

//   const _onListChange = (newList) => {
//     setList(newList);
//     setContent(newList);
//   };

//   const ItemTemplate = (props) => (
//     <Item
//       {...props}
//       handleTypeChange={handleTypeChange}
//       removeContent={removeContent}
//       handleChange={handleChange}
//     />
//   );

//   return (
//     <div>
//       <div ref={containerRef} style={{ touchAction: "pan-y" }}>
//         <DraggableList
//           itemKey={list.length}
//           template={ItemTemplate}
//           list={list}
//           onMoveEnd={_onListChange}
//           container={() => containerRef.current}
//         />
//       </div>
//     </div>
//   );
// }

// Draggable.propTypes = {
//   content: PropTypes.arrayOf(
//     PropTypes.shape({
//       type: PropTypes.string.isRequired,
//       text: PropTypes.string.isRequired,
//     })
//   ).isRequired,
//   setContent: PropTypes.func.isRequired,
//   removeContent: PropTypes.func.isRequired,
//   handleChange: PropTypes.func.isRequired,
//   handleTypeChange: PropTypes.func.isRequired,
// };
