import styles from "./OtherInformation.module.css";

export default function OtherInformation({ value }) {
  return (
    <div className={styles["other-information"]}>
      <div className={styles["other-information-top"]}>
        <div>
          <p className={styles.text1}>{value.infoLabel1}</p>
          <p>{value.infoText1}</p>
        </div>
        <div>
          <p className={styles.text1}>{value.infoLabel2}</p>
          <p>{value.infoText2}</p>
        </div>
        <div>
          <p className={styles.text1}>{value.infoLabel3}</p>
          <p>{value.infoText3}</p>
        </div>
      </div>
      <div className={styles["other-information-bottom"]}>
        <div>
          <p className={styles.text1}>{value.infoLabel4}</p>
          <p>{value.infoText4}</p>
        </div>
        <div>
          <input type="email" placeholder="Enter your email address" />
          <button>Subscribe</button>
        </div>
      </div>
    </div>
  );
}
