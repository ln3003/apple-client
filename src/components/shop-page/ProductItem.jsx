import { useNavigate } from "react-router-dom";
import styles from "./ProductItem.module.css";

export default function ProductItem(props) {
  const navigate = useNavigate();
  //==============HANDLE PRODUCT DETAIL=================
  const handle = () => {
    navigate(`/detail/${props.item._id}`);
  };
  //==============PUT DOT INTO PRICE=================
  const price = props.item.price
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return (
    <div onClick={handle} className={styles["product-item"]}>
      <img src={props.item.img1} alt={props.item.name} />
      <p className={styles["product-item-name"]}>{props.item.name}</p>
      <p className={styles["product-item-price"]}>{price} VND</p>
    </div>
  );
}
