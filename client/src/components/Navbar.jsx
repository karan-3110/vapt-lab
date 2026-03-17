import { Link } from "react-router-dom";

function Navbar() {
  const username = localStorage.getItem("username");

  return (
    <div style={{
  display: "flex",
  justifyContent: "space-between",
  padding: "15px 30px",
  backgroundColor: "white",
  borderBottom: "1px solid #e2e8f0"
}}>
  <h2 style={{ color: "#2563eb" }}>🛡️ VAPT LAB</h2>

  <div>
    <span style={{ marginRight: "20px" }}>👤 {username}</span>
    <Link to="/home" style={{ textDecoration: "none", color: "#2563eb" }}>
      Home
    </Link>
  </div>
</div>
  );
}

export default Navbar;