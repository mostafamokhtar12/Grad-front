import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function InterviewDetails() {
  const { interviewId } = useParams();
  const [interviewDetails, setInterviewDetails] = useState([]);
  useEffect(function () {
    async function FetchInterviewDetails() {
      try {
        const res = await fetch(
          `http://localhost:8080/interview/${interviewId}`,
          {
            credentials: "include",
          }
        );
        const data = await res.json();
        console.log("interview details ", data);
        setInterviewDetails(data);
      } catch (err) {
        console.log("error occured ", err);
      }
    }
    FetchInterviewDetails();
  }, []);
  return (
    <div>
      <h1>interview details of {interviewId}</h1>
      {interviewDetails.map((interviewDetail,index) => {
        return <div key={index}>
            <h2>{interviewDetail.question}</h2>
            <h2>{interviewDetail.answer}</h2>
            {/* <h2>{interviewDetail.feedback}</h2> */}
        </div>;
      })}
    </div>
  );
}

export default InterviewDetails;
