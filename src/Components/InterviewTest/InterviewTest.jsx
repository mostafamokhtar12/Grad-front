import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
function InterviewTest() {
  const { role } = useParams();
  const [questionsState, setQuestionsState] = useState([]);
  const [answer, setAnswer] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [difficultyIndex, setDifficultyIndex] = useState(1);
  let interviewID = null;
  useEffect(function () {
    console.log("role", role);

    async function fetchQuestions() {
      try {
        const res = await fetch(
          `http://localhost:8080/question?role=${role}&duration=Quick`,
          {
            credentials: "include",
          }
        );
        const { interviewId, questions } = await res.json();
        interviewID = interviewId;
        // console.log("role questions ",role);
        console.log(questions);

        setQuestionsState(questions);
      } catch (err) {
        console.log("error occured ", err);
      }
    }
    fetchQuestions();
  }, []);
  async function handleSubmit(e) {
    e.preventDefault();

    let data = {
      interviewId: interviewID,
      questionId: questionsState[difficultyIndex][questionIndex].id,
      answer,
    };

    try {
      const res = await fetch("http://localhost:8080/interview/answer", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await res.json();
      console.log(result);
    } catch (err) {
      console.log("error occured", err);
    }

    setAnswer("");
  }
  return (
    <div>
      {questionsState.map((questionSet) => {
        return questionSet.map((question) => {
          return <h1 key={question.id}>{question.question}</h1>;
        });
      })}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default InterviewTest;
