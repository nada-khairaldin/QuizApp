import { useEffect } from "react";

function Timer({ dispatch, secondsRemaining }) {
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  /*we declare useEffect here not in app component , to ensure it will render with game started (timer mounted) not when app mounted*/

  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);
      return () => clearInterval(id);
      /* even after finishing the quiz, the timer will keep running ! which appears when every new restart it becomes shorter and more faster , so we have to use clean up function to remove the timer after every render -> every interval has a unique id which we could use it to delete the timer */
    },
    [dispatch]
  );

  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins} : {seconds < 10 && "0"}
      {seconds}
    </div>
  );
}

export default Timer;
