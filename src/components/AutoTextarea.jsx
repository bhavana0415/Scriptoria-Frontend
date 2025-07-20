import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const AutoTextarea = ({ item, ind, handleChange, changeType }) => {
  const textAreaRef = useRef(null);

  useEffect(() => {
    textAreaRef.current.style.height = "auto";
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
  }, [item.text]);

  return (
    <div className="relative w-full">
      <textarea
        value={item.text}
        onChange={(e) => handleChange(ind, e.target.value)}
        className="w-full rounded-[7px] border border-cyan-500 border-t-transparent bg-transparent px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-cyan-500 focus:border-t-transparent focus:outline-none disabled:border-0"
        rows="1"
        placeholder=""
        ref={textAreaRef}
        style={{ overflow: "hidden" }}
      />
      <label className="absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-foreground transition-all pointer-events-none before:content[' '] after:content[' '] before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-cyan-500 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-cyan-500 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-cyan-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-foreground peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-cyan-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-cyan-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-foreground">
        {`${item.type}`}
      </label>
      <div className="absolute -top-3 w-full h-fit flex flex-row-reverse gap-1 sm:gap-2">
        {["Chapter", "Heading", "Subheading", "Paragraph"].map((type) => (
          <button key={type} onClick={() => changeType(ind, type)}>
            <p className="rounded-full w-6 h-6 border-2 border-pink-900 bg-pink-100 text-pink-900 cursor-pointer flex justify-center items-center">
              {type.charAt(0)}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

AutoTextarea.propTypes = {
  item: PropTypes.any.isRequired,
  ind: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  changeType: PropTypes.func.isRequired,
};

export default AutoTextarea;
