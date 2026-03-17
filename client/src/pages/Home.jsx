import VulnerabilityCard from "../components/VulnerabilityCard";

function Home() {
  const username = localStorage.getItem("username");

  return (
    <div style={{
  textAlign: "center",
  marginTop: "50px"
}}>
      <h1>Welcome, {username}</h1>
      <h2>Select a Vulnerability</h2>

      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        marginTop: "30px"
      }}>
        <VulnerabilityCard title="XSS" type="xss" />
        <VulnerabilityCard title="SQL Injection" type="sqli" />
        <VulnerabilityCard title="Privilege Escalation" type="privilege" />
      </div>
    </div>
  );
}

export default Home;