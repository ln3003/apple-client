import styles from "./CartItem.module.css";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteCart, increase, decrea } from "../../store/store";
import { useDispatch } from "react-redux";

library.add(faTrash);

export default function CartItem(props) {
  const dispatch = useDispatch();
  //===============DELETE CART ITEM HANDLE================
  const deleteHandle = () => {
    dispatch(deleteCart(props.item.item));
  };
  //===============INCREASE QUANLITY HANDLE================
  const increaseHandle = () => {
    dispatch(increase(props.item.item._id));
  };
  //===============DECREA QUANLITY HANDLE================
  const decreaHandle = () => {
    dispatch(decrea(props.item.item._id));
  };
  //==============PUT DOT TO PRICE=================
  const price = props.item.item.price
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  //=============PUT DOT TO TOTAL PRICE==================
  const total = (props.item.item.price * props.item.quantity)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return (
    <tr className={styles["table-row"]}>
      <td>
        <img src={props.item.item.img1} alt={props.item.item.name} />
      </td>
      <td className={styles["table-row-name"]}>{props.item.item.name}</td>
      <td>{price} VND</td>
      <td>
        <div className={styles.arrow}>
          <span onClick={decreaHandle}>&#9664;</span>
          <span>{props.item.quantity}</span>
          <span onClick={increaseHandle}>&#9654;</span>
        </div>
      </td>
      <td>{total} VND</td>
      <td>
        <FontAwesomeIcon onClick={deleteHandle} icon={["fas", "trash"]} />
      </td>
    </tr>
  );
}
