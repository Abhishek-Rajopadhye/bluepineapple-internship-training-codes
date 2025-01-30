import { useState } from "react";

function CommunicationModule() {
    /** Declaring the message variable using useState and savingh the setMessage function */
    const [message, setMessage] = useState("");

    /** 
     * Returns the fragment of both the sender and receiver children modules/components.
     * The sender is given the setMessage function as prop while the receiver gets the message as a prop.
     * A separate div is given to show the different children components.
     */

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
        /** 
         * preventDefault to stop the button from refreshing.
         * Getting the message/input text from the input tag.
         * Using given setMessage function to set the state variable. 
         */
        event.preventDefault();
        let message = document.getElementById("message").value;
        setMessage(message);
    }
    /**
     * Returning a fragment with a form to enter a message, and a button to call the function to set state variable.
     */
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
    /** Returning the received state variable */
    return (
        <>
            <p>
                {received}
            </p>
        </>
    );
}

module.exports = CommunicationModule;