import React, { useState } from "react";
import { FaUser, FaLock, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";

const InputField = ({ type, name, value, onChange, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);

  const renderIcon = () => {
    if (name === "name") return <FaUser />;
    if (name === "email") return <FaEnvelope />;
    if (name === "password") return <FaLock />;
    return null;
  };

  const isPassword = name === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="relative flex items-center border border-gray-300 rounded-lg px-4 py-2 mb-4 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 bg-white">
      <span className="text-gray-500 mr-2">{renderIcon()}</span>
      <input
        type={inputType}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full outline-none text-gray-500 text-sm bg-transparent"
        required
      />
      {isPassword && (
        <span
          className="cursor-pointer text-gray-500 ml-2"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      )}
    </div>
  );
};

export default InputField;
