import Header from "./components/Header";
import Main from "./components/Main";
import { useEffect, useReducer } from "react";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";

const initialState = {
  questions: [],
  status: "loading", // 'loading' , 'error' , 'ready' , 'active' , 'finished' all are a status the app could be m instead of making a separated use state for every one , we could use useReducer

  index: 0, // index of the current question, state -> render -> show new question

  answer: null,
  points: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataFaild":
      return { ...state, status: "error" };
    case "dataRecived":
      return { ...state, questions: action.payload, status: "ready" };
    case "start":
      return { ...state, status: "active" };
    case "newAnswer": {
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption // use stat.payload not state.answer in comparison, as answer here will be the older value (not render yet)
            ? state.points + question.points
            : state.points,
      };
    }
    default:
      throw new Error("Action unknown");
  }
}

export default function App() {
  const [{ questions, status, index, answer }, dispatch] = useReducer(
    reducer,
    initialState
  ); //destructing state into status & questions, easier than state.questions/status

  const numQuestions = questions.length;

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecived", payload: data }))
      .catch((err) => dispatch({ type: "dataFaild" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} /> //passed dispatch as a prop like what we have used to do with setState, to change state on click button
        )}
        {status === "active" && (
          <Question
            question={questions[index]}
            dispatch={dispatch}
            answer={answer}
          />
        )}
      </Main>
    </div>
  );
}
