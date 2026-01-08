import { useState } from "react";
import CafeInfo from "./components/CafeInfo/CafeInfo";
import VoteOptions from "./components/VoteOptions/VoteOptions";
import VoteStats from "./components/VoteStats/VoteStats";
import Notification from "./components/Notification/Notification";
import type { Votes, VoteType } from "./types/votes";
import css from "./App.module.css";

function App() {
  const [votes, setVotes] = useState<Votes>({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const totalVotes = votes.good + votes.neutral + votes.bad;

  const positiveRate = totalVotes
    ? Math.round((votes.good / totalVotes) * 100)
    : 0;

  const handleVote = (voteType: VoteType) => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [voteType]: prevVotes[voteType] + 1,
    }));
  };

  const handleReset = () => {
    setVotes({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  };

  return (
    <div className={css.app}>
      <CafeInfo />

      <VoteOptions
        onVote={handleVote}
        onReset={handleReset}
        canReset={totalVotes > 0}
      />

      {totalVotes > 0 ? (
        <VoteStats
          votes={votes}
          totalVotes={totalVotes}
          positiveRate={positiveRate}
        />
      ) : (
        <Notification />
      )}
    </div>
  );
}

export default App;
