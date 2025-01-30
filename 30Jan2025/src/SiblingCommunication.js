import { useState } from "react";

function CommunicationModule() {
    const [message, setMessage] = useState("");
    return (
        <>
            <div id="sender">
                <h1>
                    Sender
                </h1>
                <Sender setMessage={setMessage}/>
            </div>
            <div id="receiver">
                <h1>
                    Receiver
                </h1>
                <Receiver received={message}/>
            </div>
        </>
    );
}

function Sender({setMessage}) {
    function sendMessage() {
        event.preventDefault();
        let message = document.getElementById("message").value;
        setMessage(message);
    }

    return (
        <>
            <form onSubmit={sendMessage}>
                <label for="message">Enter Message to Send to Receiver</label><br/>
                <input type="text" id="message"/>
                <button type="submit">Send</button>
            </form>
        </>
    );

}

function Receiver({received}){
    return (
        <>
            <p>
                {received}
            </p>
        </>
    );
}

module.exports = CommunicationModule;