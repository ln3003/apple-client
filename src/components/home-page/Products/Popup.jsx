import styles from "./Popup.module.css";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { hidePopup } from "../../../store/store";
import { useNavigate } from "react-router-dom";
//===============GET DOM PORTAL================
const popup = document.getElementById("popup");
//==============ADD ICON TO LIBRARY=================
library.add(faCartShopping);

export default function Popup(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //===============CLOSE POPUP HANDLE================
  const closeHandle = (e) => {
    if (e.target.id === "popupBackground" || e.target.id === "popupClose")
      dispatch(hidePopup());
  };
  //==============PUT DOT TO PRICE=================
  const price = props.value.price
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  //===============PRODUCT DETAIL HANDLE================
  const buttonHandle = () => {
    return navigate(`/detail/${props.value._id}`);
  };
  return createPortal(
    <div
      id="popupBackground"
      onClick={closeHandle}
      className={styles.background}
    >
      <div className={styles.centerbox}>
        <span id="popupClose" onClick={closeHandle} className={styles.close}>
          x
        </span>
        <img src={props.value.img1} alt={props.value.name} />
        <div className={styles.infomation}>
          <p className={styles["infomation-name"]}>{props.value.name}</p>
          <p className={styles["infomation-price"]}>{price} VND</p>
          <p className={styles["infomation-desc"]}>{props.value.short_desc}</p>
          <button onClick={buttonHandle}>
            <FontAwesomeIcon icon={["fas", "cart-shopping"]} /> View Detail
          </button>
        </div>
      </div>
    </div>,
    popup
  );
}
