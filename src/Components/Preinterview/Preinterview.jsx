import React from "react";
import { useState, useRef, useEffect } from "react";
import ParticlesComponent from "./particles";
import Startbutton from "../Startbutton/Startbutton";
import Navbar from "../Navbar/Navbar";
import "./preInterview.css";

const MemoizeParticles = React.memo(ParticlesComponent);

export default function PreInterview() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setIsOpen(false);
  };

  return (
    <div className="preinterview-page">
      <MemoizeParticles id="particles" />
      <Navbar />

      <div className="dropdown-container">
        <h1 className="Choose">Choose your path</h1>

        <div className="role-dropdown" ref={dropdownRef}>
          <button
            className="dropdown-toggle"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
          >
            {selectedRole || "Role"}
          </button>

          {isOpen && (
            <div className="dropdown-options">
              {[
                "Front-end",
                "Back-end",
                "Full-stack",
                "DevOps",
                "Software Testing",
                "Machine Learning",
                "Cyber Security",
                "UI/UX",
              ].map((role) => (
                <button
                  key={role}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRoleSelect(role);
                  }}
                >
                  {role}
                </button>
              ))}
            </div>
          )}
        </div>

        <Startbutton selectedRole={selectedRole} />
      </div>
    </div>
  );
}
