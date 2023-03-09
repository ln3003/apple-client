import styles from "./Banner.module.css";
import { useNavigate } from "react-router-dom";

export default function Banner({ value }) {
  const navigate = useNavigate();
  return (
    <div className={styles.banner}>
      <img src={value.bannerImage} alt="banner" />
      <div className={styles.text}>
        <p className={styles.p1}>{value.bannerText1}</p>
        <p className={styles.p2}>{value.bannerText2}</p>
        <button
          onClick={() => {
            navigate("/shop");
          }}
        >
          Browse collections
        </button>
      </div>
    </div>
  );
}
