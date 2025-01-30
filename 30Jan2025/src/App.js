import "./styles.css";
import { useState } from "react";
import CounterModule from "./CounterModule"
import CommunicationModule from "./SiblingCommunication"
import ListModule from "./ListRendering"
import FocusModule from "./FocusInput"
import UserDataModule from "./UserDataFetch"

function App(){
  /** Making render boolean variables for each module using useState */
  const [listRender, setListRender] = useState(false);
  const [counterRender, setCounterRender] = useState(false);
  const [communicationRender, setCommunicationRender] = useState(false);
  const [focusRender, setFocusRender] = useState(false);
  const [userDataRender, setUserDataRender] = useState(false);

  /** Making a function to toggle all modules except list to false */
  function getListElement(){
    setListRender(true);
    setCounterRender(false);
    setCommunicationRender(false);
    setFocusRender(false);
    setUserDataRender(false);
  }
  
  /** Making a function to toggle all modules except list to false */
  function getCounterElement(){
    setListRender(false);
    setCounterRender(true);
    setCommunicationRender(false);
    setFocusRender(false);
    setUserDataRender(false);
  }

  /** Making a function to toggle all modules except list to false */
  function getCommunicationElement(){
    setListRender(false);
    setCounterRender(false);
    setCommunicationRender(true);
    setFocusRender(false);
    setUserDataRender(false);
  }

  /** Making a function to toggle all modules except list to false */
  function getFocusElement(){
    setListRender(false);
    setCounterRender(false);
    setCommunicationRender(false);
    setFocusRender(true);
    setUserDataRender(false);
  }

  /** Making a function to toggle all modules except list to false */
  function getUserDataElement(){
    setListRender(false);
    setCounterRender(false);
    setCommunicationRender(false);
    setFocusRender(false);
    setUserDataRender(true);
  }

  /** Returning the componenets. On button click with the module name it toggles the module render boolean variable.
   *  Then using the boolean variables to conditionally render the various modules.
   */
  return (
    <>
      <button onClick={getListElement}>List</button>
      <button onClick={getCounterElement}>Counter</button>
      <button onClick={getCommunicationElement}>Communication</button>
      <button onClick={getFocusElement}>Focus</button>
      <button onClick={getUserDataElement}>User Data</button>
      <br/>
      {listRender ? <ListModule/> : null}
      {counterRender ? <CounterModule/> : null}
      {communicationRender ? <CommunicationModule/> : null}
      {focusRender ? <FocusModule/> : null}
      {userDataRender ? <UserDataModule/> : null}
    </>
  );
}

/** Exporting the app to render */
export default App;