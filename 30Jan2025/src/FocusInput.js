import { useRef } from "react";

function FocusModule() {
    const inputRef = useRef(null);

    const handleClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <div>
            <input type="text" ref={inputRef} />
            <button onClick={handleClick}>Focus Input</button>
        </div>
    );
}

module.exports = FocusModule;