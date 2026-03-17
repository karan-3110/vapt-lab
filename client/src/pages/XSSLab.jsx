import { useState } from "react";
import { useParams } from "react-router-dom";

function XSSLab() {
    const { level } = useParams();

    const [response, setResponse] = useState("");
    const [input, setInput] = useState("");
    const [result, setResult] = useState("");
    const [history, setHistory] = useState([]);
    const [mode, setMode] = useState("vulnerable");
    const [solved, setSolved] = useState(false);
    const [currentMistakes, setCurrentMistakes] = useState([]);
    const [allMistakes, setAllMistakes] = useState([]);

    // ✅ VALIDATION
    const isValidXSSPayload = (input) => {
        const value = input.toLowerCase();

        if (level === "easy") {
            return /["'].*on\w+=.*\(/i.test(value);
        }

        if (level === "medium") {
            // block basic payloads
            if (value.includes("<script") || value.includes("alert")) {
                return false;
            }

            // allow bypass techniques
            return /on\w+=.*\(/i.test(value);
        }

        if (level === "hard") {
            if (
                value.includes("<script") ||
                value.includes("alert") ||
                value.includes("onerror") ||
                value.includes("onload") ||
                value.includes("<img") ||
                value.includes("<svg")
            ) {
                return false;
            }

            // allow uncommon vector
            return /onmouseenter=.*\(/i.test(value);
        }

        // learn
        return (
            /<script>\s*alert\(.*?\)\s*<\/script>/i.test(value) ||
            /on\w+=.*\(/i.test(value)
        );
    };

    // ✅ MISTAKE ANALYSIS
    const analyzeMistake = (input, isValid) => {
        const value = input.toLowerCase();
        let issues = [];

        if (!value.includes("<") || !value.includes(">")) {
            issues.push("Missing HTML structure");
        }

        if (
            !value.includes("script") &&
            !value.includes("onerror") &&
            !value.includes("onload")
        ) {
            issues.push("No executable JavaScript");
        }

        if (!value.includes("alert") && !value.includes("confirm")) {
            issues.push("No visible execution");
        }

        if (value.length < 8) {
            issues.push("Payload too short");
        }

        if (!isValid) {
            issues.push("Invalid XSS payload");
        }

        return issues;
    };

    const escapeHTML = (str) => {
        return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    };

    const handleSubmit = () => {
        const isValid = isValidXSSPayload(input);

        setHistory((prev) => [...prev, input]);

        const issues = analyzeMistake(input, isValid);
        setCurrentMistakes(issues);

        if (!isValid) {
            setAllMistakes((prev) => [...prev, ...issues]);
        }

        if (isValid && mode === "vulnerable") {
            setResponse(input);   // allow execution
            setSolved(true);
            setCurrentMistakes([]);
        } else {
            setResponse("");      // block execution
            setSolved(false);
        }

        if (isValid && mode === "vulnerable") {
            setSolved(true);
            setCurrentMistakes([]);
        } else {
            setSolved(false);
        }

        // ✅ FEEDBACK (ONLY HERE)
        if (level === "learn") {
            setResult("");
        } else if (level === "easy") {
            setResult(
                isValid
                    ? "✅ Good! You escaped the attribute and executed JS."
                    : "❌ Try breaking out using quotes (\" ) and add event handler"
            );
        } else if (level === "medium") {
            setResult(
                isValid
                    ? "✅ Bypass successful!"
                    : "❌ Some keywords are filtered. Try alternative functions like confirm()"
            );
        } else {
            setResult("");
        }
    };

    return (
        <div
            style={{
                maxWidth: "700px",
                margin: "auto",
                marginTop: "40px",
                background: "white",
                padding: "30px",
                borderRadius: "12px",
            }}
        >
            <h1>XSS Lab ({level.toUpperCase()})</h1>

            <input
                type="text"
                placeholder="Enter payload..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />

            <button onClick={handleSubmit}>Submit</button>

            <br /><br />

            {/* LEARN */}
            {level === "learn" && (
                <div>
                    <h3>📘 What is XSS?</h3>
                    <p>XSS allows JavaScript injection into webpages.</p>

                    <ul>
                        <li>&lt;script&gt;alert(1)&lt;/script&gt;</li>
                        <li>&lt;img src=x onerror=alert(1)&gt;</li>
                    </ul>

                    <p>Learn more: OWASP, PortSwigger</p>
                </div>
            )}

            {/* MODE */}
            <button onClick={() => setMode("vulnerable")}>Vulnerable</button>
            <button onClick={() => setMode("safe")}>Safe</button>

            <p>Mode: {mode}</p>

            <hr />

            {/* RESPONSE */}
            <h3>Server Response</h3>
            <div style={{ border: "1px solid #ccc", padding: "10px" }}>
                {mode === "vulnerable" ? (
                    level === "easy" ? (
                        <div
                            dangerouslySetInnerHTML={{
                                __html: `<input value="${response}">`,
                            }}
                        />
                    ) : (
                        <div dangerouslySetInnerHTML={{ __html: response }} />
                    )
                ) : (
                    <div>{escapeHTML(response)}</div>
                )}
            </div>

            {/* MEDIUM HINT */}
            {level === "medium" && history.length >= 5 && !solved && (
                <p style={{ color: "blue" }}>
                    💡 Try bypassing filters using confirm() or different tags
                </p>
            )}

            {/* EASY FEEDBACK */}
            {level === "easy" && !solved && currentMistakes.length > 0 && (
                <div>
                    <ul>
                        {currentMistakes.map((m, i) => (
                            <li key={i}>{m}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* MEDIUM REPORT */}
            {level === "medium" && solved && (
                <div>
                    <h3>📊 Final Report</h3>
                    <p>Total Attempts: {history.length}</p>
                    <ul>
                        {[...new Set(allMistakes)].map((m, i) => (
                            <li key={i}>{m}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* SUCCESS */}
            {solved && <h2 style={{ color: "green" }}>🎉 XSS Successful</h2>}
        </div>
    );
}

export default XSSLab;