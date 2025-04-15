import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { listen, speek } from "../../utils/speechapi";
import "./interview.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ListeningAnimation from "./ListeningAnimation";

function Interview() {
  const { role } = useParams();
  // const [questionsState, setQuestionsState] = useState([]);
  let interviewQuestions = useRef([]);
  let interviewID = useRef(null);

  const [questionIndex, setQuestionIndex] = useState(0);
  const [difficultyIndex, setDifficultyIndex] = useState(0);
  const [askedQuestions, setAskedQuestions] = useState([]);
  const [answer, setAnswer] = useState("");
  const [currentlyInterviewing, setCurrentlyInterviewing] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  useEffect(function () {
    // console.log("role", role);

    async function fetchQuestions() {
      try {
        const res = await fetch(
          `http://localhost:8080/question?role=${role}&duration=quick`,
          {
            credentials: "include",
          }
        );

        const { interviewId, questions } = await res.json();

        // console.log("interviewId ",interviewId);
        console.log(questions);

        interviewQuestions.current = questions;
        interviewID.current = interviewId;

        setAskedQuestions([questions[0][0]]);
        speek(questions[0][0].question, () => {
          listen(setAnswer, setIsListening);
        });
      } catch (err) {
        console.log("error occured ", err);
      }
    }
    fetchQuestions();
  }, []);

  function getNextQuestion() {
    // adaptive
    if (
      questionIndex ===
      interviewQuestions.current[difficultyIndex].length - 1
    ) {
      if (difficultyIndex == interviewQuestions.current.length - 1) {
        setCurrentlyInterviewing(false);
      } else {
        setDifficultyIndex(difficultyIndex + 1);
        setQuestionIndex(0);
        setAskedQuestions((prev) => [
          ...prev,
          interviewQuestions.current[difficultyIndex + 1][0],
        ]);
        const question =
          interviewQuestions.current[difficultyIndex + 1][0].question;
        speek(question, () => {
          listen(setAnswer, setIsListening);
        });
      }

      return;
    }
    // console.log(interviewQuestions);
    const question =
      interviewQuestions.current[difficultyIndex][questionIndex + 1]?.question;
    speek(question, () => {
      listen(setAnswer, setIsListening);
    });
    setAskedQuestions((prev) => [
      ...prev,
      interviewQuestions.current[difficultyIndex][questionIndex + 1],
    ]);
    // console.log(
    //   "asked question ",
    //   interviewQuestions.current[questionIndex + 1]
    // );
    // console.log("questionIndex ", questionIndex);
    setQuestionIndex(questionIndex + 1);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // console.log("answer sent");
    // console.log();
    // const currentQuestionIndex = questionIndex * 2;
    console.log(interviewQuestions.current[difficultyIndex][questionIndex]?.id);
    // console.log("askedQuestions ",askedQuestions);
    // return;
    let data = {
      interviewId: interviewID.current,
      qId: interviewQuestions.current[difficultyIndex][questionIndex]?.id,
      answer,
    };
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:8080/interview/answer", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const result = await res.json();
      console.log(result);
    } catch (err) {
      console.log("error occured", err);
    }

    setIsLoading(false);

    // to add answer to chat stream
    setAskedQuestions((prev) => [
      ...prev,
      { question: answer, id: new Date().getTime() },
    ]);

    getNextQuestion();
    setAnswer("");
  }
  return (
    <div className="interview-page">
      <p className="site-name">Interview Coach</p>
      <Link to="/home">
        <FontAwesomeIcon icon={faHome} className="Home-logo-second" />
      </Link>
      <div className="interview-container">
        <div className="chat-container">
          {askedQuestions.map((question, index) => {
            return (
              <div
                key={question?.id}
                className={`message ${
                  index % 2 === 0 ? "bot-message" : "user-message"
                }`}
              >
                <div className="message-content">{question?.question}</div>
              </div>
            );
            // return <h1 key={question?.id}>{question?.question}</h1>;
          })}
        </div>
        <div className="Answer-Section">
          {isLoading && <h1>Loading ...</h1>}
          {/* {isListening && <h1>Listening ...</h1>} */}
          {isListening && <ListeningAnimation />}
          {currentlyInterviewing && (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
              <button type="submit">Submit</button>
              <button type="button" onClick={()=>{
                setAnswer("");
                listen(setAnswer,setIsListening)
              }}>re-answer</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Interview;
