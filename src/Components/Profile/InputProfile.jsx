import React from "react";

// Updated UserInput.jsx
function InputProfile({ className, label, value, isEditable, onChange }) {
  return (
    <div className={`input-field ${className}`}>
      <label>{label}</label>
      <input
        type="text"
        value={value}
        readOnly={!isEditable}
        onChange={onChange} // Fires when typing
      />
    </div>
  );
}

export default InputProfile;
