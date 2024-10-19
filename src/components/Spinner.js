import React, { useEffect } from "react";
import { newtonsCradle } from "ldrs";

const Spinner = () => {
  useEffect(() => {
    newtonsCradle.register();
  }, []);

  return (
    <div style={styles.container}>
      <l-newtons-cradle size="78" speed="1.4" color="#02353C"></l-newtons-cradle>
      <p style={styles.message}>Just a moment...</p>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  message: {
    marginTop: "20px",
    fontSize: "18px",
    color: "#02353C",
  },
};

export default Spinner;
