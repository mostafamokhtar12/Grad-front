import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function InterviewHistory()
{
    const [interviewHistory, setInterviewHistory] = useState([]);
    const Navigate = useNavigate();
    useEffect(function(){
        async function FetchInterviewHistory()
        {
            try{
                const res = await fetch("http://localhost:8080/interview",{
                    credentials: "include",
                });
                const data = await res.json();
                console.log("interview history", data);
                setInterviewHistory(data);
            }catch(err)
            {
                console.log('error occurred: ',err);
            }
        }
        FetchInterviewHistory();
    },[])
    return <div>
        <h1> interview History</h1>
        {interviewHistory.map((interview)=>{
            return <div key={interview.interview_id} onClick={()=> Navigate(`${interview.interview_id}`)}>
                <h2>{interview.role}</h2>
                <h2>{interview.interview_date}</h2>
                <h2>{interview.duration}</h2>
            </div>
        })}
    </div>
}

export default InterviewHistory;