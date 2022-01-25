import React, { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function (newMode, replace = false) {
    if (!replace) {
      setHistory((prev) => [...prev, newMode]);
      console.log(history);
    }
    else {
      const newHistory = [...history];
      newHistory.pop()
      newHistory.push(newMode);
      setHistory(newHistory);
      console.log("replace = true",history)
    }
    setMode(newMode);
  }

  const back = function () {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop()
      setHistory(newHistory);
      setMode(newHistory[newHistory.length - 1])
      console.log("back",history)
    }
  }
  return { mode, transition, back };
}