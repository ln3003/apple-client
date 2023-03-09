import styles from "./Categories.module.css";
import { useNavigate } from "react-router-dom";

export default function Categories({ value }) {
  const navigate = useNavigate();
  const imgHandle = () => {
    navigate("/shop");
  };
  return (
    <div className={styles.categories}>
      <p>{value.cateText1}</p>
      <h2>{value.cateText2}</h2>
      <div className={styles.images}>
        <img onClick={imgHandle} src={value.cateImage1} alt="product 1" />
        <img onClick={imgHandle} src={value.cateImage2} alt="product 2" />
        <img onClick={imgHandle} src={value.cateImage3} alt="product 3" />
        <img onClick={imgHandle} src={value.cateImage4} alt="product 4" />
        <img onClick={imgHandle} src={value.cateImage5} alt="product 5" />
      </div>
    </div>
  );
}
