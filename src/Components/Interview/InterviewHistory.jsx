import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./InterviewHistory.css"; // Import CSS file
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";
import { faHome } from "@fortawesome/free-solid-svg-icons";

function InterviewHistory() {
  const location = useLocation();

  useEffect(() => {
    document.body.classList.remove("loaded");
    setTimeout(() => {
      document.body.classList.add("loaded");
    }, 400);
  }, [location]);

  const [interviewHistory, setInterviewHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const dummyData = [
      {
        role: "Frontend Developer",
        interview_date: "2025-04-01",
        duration: "Full",
      },
      {
        role: "Backend Developer",
        interview_date: "2025-04-03",
        duration: "Quick",
      },
      {
        role: "Full-Stack Developer",
        interview_date: "2025-04-03",
        duration: "Quick",
      },
    ];
    setInterviewHistory(dummyData);
  }, []);

  return (
    <div className="WHOLE">
      <p className="Title2">Interview Coach</p>
      <Link to="/home">
        <FontAwesomeIcon icon={faHome} className="Home-logo2" />
      </Link>
      <h1 className="History-title">Revisit your past..</h1>
      <div className="table-wrapper">
        <table className="interview-table">
          <thead>
            <tr>
              <th>Interview Role</th>
              <th>Date Entered</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {interviewHistory.map((interview, index) => (
              <tr key={index} className="interview-row">
                <td>{interview.role}</td>
                <td>{interview.interview_date}</td>
                <td>{interview.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InterviewHistory;
