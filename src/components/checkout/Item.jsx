import styles from "./Item.module.css";

export default function Item(props) {
  //==============PUT DOT TO PRICE=================
  const price = props.item.item.price
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return (
    <div className={styles.item}>
      <p className={styles["item-name"]}>{props.item.item.name}</p>
      <p>
        {price} VND x {props.item.quantity}
      </p>
    </div>
  );
}
