import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username) return alert("Enter username");
    localStorage.setItem("username", username);
    navigate("/home");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>VAPT LAB LOGIN</h1>

      <input
        type="text"
        placeholder="Enter Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <br /><br />

      <button onClick={handleLogin}>Enter Lab</button>
    </div>
  );
}

export default Login;