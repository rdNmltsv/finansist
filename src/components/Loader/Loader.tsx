import React from "react";
import styles from "./Loader.module.scss";

const Loader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}>
        {Array.from(Array(12).keys()).map((item) => (
          <div key={item}></div>
        ))}
      </div>
    </div>
  );
};

export default Loader;
