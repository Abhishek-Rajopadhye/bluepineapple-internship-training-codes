import { useState } from "react";


/** Using useState to make a count variable. Sending the function to set the variable to child function */
function CounterModule(){
  const [count, setCount] = useState(0);

  function increaseCount(){
      setCount(count + 1);
  }
  return (
      <>
          <p>
              {count}
          </p>
          <Counter onPress={increaseCount} />
      </>
  );
}

/** Module return the button element that on press calls the function to increment count */
function Counter({onPress}){
  return (
      <button onClick={onPress}>Press Here to Increase Count</button>
  );
}

module.exports = CounterModule;