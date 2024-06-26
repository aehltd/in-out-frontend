import { useState } from "react";

const useMode = (initialMode) => {
  const [mode, setMode] = useState(initialMode);

  const handleModeChange = (type) => {
    setMode(type);
  };

  const amIDisabled = (type) => {
    return mode === type;
  };

  return {
    mode,
    handleModeChange,
    amIDisabled,
  };
};

export default useMode;
