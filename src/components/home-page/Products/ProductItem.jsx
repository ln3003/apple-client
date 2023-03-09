import { useDispatch } from "react-redux";
import styles from "./ProductItem.module.css";
import { showPopup } from "../../../store/store";

export default function ProductItem(props) {
  const dispatch = useDispatch();
  //===============SHOW POPUP HANDLE================
  const itemHandle = () => {
    dispatch(showPopup(props.item));
  };
  //===============PUT DOT TO PRICE NUMBER================
  const price = props.item.price
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return (
    <div onClick={itemHandle} className={styles["product-item"]}>
      <img src={props.item.img1} alt={props.item.name} />
      <p className={styles["product-item-name"]}>{props.item.name}</p>
      <p className={styles["product-item-price"]}>{price} VND</p>
    </div>
  );
}
