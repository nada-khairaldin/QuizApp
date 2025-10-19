import Header from "./components/Header";
import Main from "./components/Main";
import { useEffect, useReducer } from "react";

const initialState = {
  questions: [],
  status: "loading", // 'loading' , 'error' , 'ready' , 'active' , finished' all are a status the app could be m instead of making a separated use state for every one , we could use useReducer
};

function reducer(state, action) {
  switch (action.type) {
    case "dataFaild":
      return { ...state, status: "error" };
    case "dataRecived":
      return { ...state, questions: action.payload, status: "ready" };
    default:
      throw new Error("Action unknown");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecived", payload: data }))
      .catch(dispatch({ type: "dataFaild" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        <p>1/15</p>
        <p>Question?</p>
      </Main>
    </div>
  );
}
