import { useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Difficulty() {
    const { type } = useParams();
    const [level, setLevel] = useState("learn");
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: "center" }}>
            <h1>{type.toUpperCase()} Lab</h1>

            <h3>Select Difficulty</h3>

            {/* Slider */}
            <input
                type="range"
                min="0"
                max="3"
                value={["learn", "easy", "medium", "hard"].indexOf(level)}
                onChange={(e) => {
                    const levels = ["learn", "easy", "medium", "hard"];
                    setLevel(levels[e.target.value]);
                }}
            />

            <p><b>{level.toUpperCase()}</b></p>

            {/* Description */}
            {level === "learn" && <p>Step-by-step guidance</p>}
            {level === "easy" && <p>Hints for mistakes</p>}
            {level === "medium" && <p>Feedback after completion</p>}
            {level === "hard" && <p>No help 😈</p>}
            <button onClick={() => navigate(`/lab/${type}/${level}`)}>
                Start Lab
            </button>
        </div>
    );
}

export default Difficulty;