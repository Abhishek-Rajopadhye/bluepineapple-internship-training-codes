import { useRef } from "react";

/** Using useRef to create inputRef variable. Then using inputRef.current.focus setting the focus onto the input field */
function FocusModule() {
    const inputRef = useRef(null);

    const handleClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };
    /** Returning the input field and button */
    return (
        <div>
            <input type="text" ref={inputRef} />
            <button onClick={handleClick}>Focus Input</button>
        </div>
    );
}

module.exports = FocusModule;