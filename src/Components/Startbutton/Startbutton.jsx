import { useNavigate } from "react-router-dom";
import "./Startbutton.css";

export default function Startbutton({ selectedRole }) {
  const navigate = useNavigate();

  const handleStart = async () => {
    if (!selectedRole) {
      alert("Please select a role first!");
      return;
    }
    navigate(`/Interview/${selectedRole}`);
  };

  return (
    <button className="startButton" onClick={handleStart}>
      Start
    </button>
  );
}
