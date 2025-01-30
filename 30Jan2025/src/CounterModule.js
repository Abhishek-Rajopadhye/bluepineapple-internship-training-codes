import { useState } from "react";

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

function Counter({onPress}){
  return (
      <button onClick={onPress}>Press Here to Increase Count</button>
  );
}

module.exports = CounterModule;