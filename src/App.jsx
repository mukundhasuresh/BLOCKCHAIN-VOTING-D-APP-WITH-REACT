import React, { useState, useEffect } from "react";

function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [votes, setVotes] = useState({});
  const [status, setStatus] = useState("");

  const connectWalletHandler = async () => {
    // wallet for testing
    setWalletAddress("0xD193f530ebBD34CBcbaEAB280fFDc3b561D22291");
    setStatus("Connected to Wallet");
  };

  // candidate loader
  const loadCandidates = async () => {
    const dummyCandidates = ["Albert", "Christian", "Morris"];
    const dummyVotes = { Albert: 5, Christian: 3, Morris: 7 };

    setCandidates(dummyCandidates);
    setVotes(dummyVotes);
    setStatus("Testing.");
  };

  // Dummy vote handler
  const voteCandidate = (candidate) => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [candidate]: prevVotes[candidate] + 1,
    }));
    setStatus(`You voted for ${candidate}!`);
  };

  useEffect(() => {
    loadCandidates();
  }, []);

  // Calculate total votes
  const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>VoteChain DApp</h1>

      <div style={styles.walletSection}>
        <p>
          Connected wallet:{" "}
          <span style={{ fontWeight: "bold" }}>
            {walletAddress ? walletAddress : "Not connected"}
          </span>
        </p>
        <button style={styles.connectBtn} onClick={connectWalletHandler}>
          Connect Wallet
        </button>
      </div>

      <h2 style={styles.subtitle}>Candidates</h2>
      {candidates.length === 0 && <p>Loading candidates...</p>}

      <div style={styles.candidateList}>
        {candidates.map((candidate) => {
          const votePercentage = totalVotes
            ? ((votes[candidate] / totalVotes) * 100).toFixed(1)
            : 0;

          return (
            <div key={candidate} style={styles.candidateCard}>
              <div style={{ flex: 1 }}>
                <span style={styles.candidateName}>{candidate}</span>
                <div style={styles.voteBarContainer}>
                  <div
                    style={{
                      ...styles.voteBar,
                      width: `${votePercentage}%`,
                    }}
                  ></div>
                </div>
                <span style={styles.voteCount}>
                  {votes[candidate]} votes ({votePercentage}%)
                </span>
              </div>
              <button
                style={styles.voteBtn}
                onClick={() => voteCandidate(candidate)}
              >
                Vote
              </button>
            </div>
          );
        })}
      </div>

      <p style={styles.status}>{status}</p>
    </div>
  );
}

// Inline styles
const styles = {
  container: {
    fontFamily: "Anton, sans-serif",
    padding: "2rem",
    backgroundColor: "#f0f8ff",
    minHeight: "100vh",
  },
  title: {
    fontSize: "3rem",
    textAlign: "center",
    marginBottom: "1rem",
    color: "#333",
  },
  walletSection: {
    textAlign: "center",
    marginBottom: "2rem",
  },
  connectBtn: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "0.5rem",
    transition: "0.3s",
  },
  subtitle: {
    fontSize: "2rem",
    textAlign: "center",
    marginBottom: "1rem",
    color: "#444",
  },
  candidateList: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    maxWidth: "600px",
    margin: "0 auto",
  },
  candidateCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem",
    borderRadius: "8px",
    backgroundColor: "#ffe4b5",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  },
  candidateName: {
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  voteCount: {
    fontSize: "0.9rem",
    color: "#333",
  },
  voteBtn: {
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "0.3s",
    marginLeft: "1rem",
  },
  voteBarContainer: {
    height: "10px",
    width: "100%",
    backgroundColor: "#ddd",
    borderRadius: "5px",
    margin: "5px 0",
    overflow: "hidden",
  },
  voteBar: {
    height: "100%",
    backgroundColor: "#28a745",
    borderRadius: "5px",
    transition: "width 0.5s ease-in-out",
  },
  status: {
    textAlign: "center",
    marginTop: "2rem",
    color: "#555",
  },
};

export default App;
