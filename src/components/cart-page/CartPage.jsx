import styles from "./CartPage.module.css";
import { faGift } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { updateCart } from "../../store/store";
import { useNavigate } from "react-router-dom";
//==============ADD ICON GIFT TO LIBRARY=================
library.add(faGift);

export default function CartPage() {
  const renderCounter = useRef(0);
  const navigate = useNavigate();
  //==============COUNT RENDER TIME=================
  renderCounter.current += 1;
  //==============GET CART STATE FROM REDUX STORE=================
  const cart = useSelector((state) => {
    return state.cart.cart;
  });
  const dispatch = useDispatch();
  //===============GET CART ARRAY FROM LOCAL STORAGE================
  useEffect(() => {
    if (localStorage.getItem("cartArray")) {
      const cartArray = JSON.parse(localStorage.getItem("cartArray"));
      dispatch(updateCart(cartArray));
    } else {
      localStorage.setItem("cartArray", JSON.stringify([]));
    }
  }, [dispatch]);
  //==============IF 2ND RENDER THEN SAVE CART TO LOCAL STORAGE=================
  if (renderCounter.current >= 2) {
    localStorage.setItem("cartArray", JSON.stringify(cart));
  }
  //==============CALCULATE TOTAL PRICE=================
  const total = cart.reduce((sum, x) => {
    return sum + x.quantity * x.item.price;
  }, 0);
  //==============PUT DOT INTO PRICE=================
  const totalWithDot = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return (
    <div className={styles["cart-page"]}>
      <div className={styles["cart-page-top"]}>
        <h2>CART</h2>
        <p>CART</p>
      </div>
      <h3>SHOPPING CART</h3>
      <div className={styles["cart-page-mid"]}>
        <div className={styles.table}>
          <table>
            <thead>
              <tr>
                <th>IMAGE</th>
                <th>PRODUCT</th>
                <th>PRICE</th>
                <th>QUANTITY</th>
                <th>TOTAL</th>
                <th>REMOVE</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((x) => {
                return <CartItem key={x.item._id} item={x} />;
              })}
            </tbody>
          </table>
          <div className={styles.checkout}>
            <p
              onClick={() => {
                navigate("/shop");
              }}
            >
              &#129064; Continue shopping
            </p>
            <p
              onClick={() => {
                navigate("/checkout");
              }}
              className={styles.btn}
            >
              Proceed checkout &#129066;
            </p>
          </div>
        </div>
        <div className={styles.sum}>
          <h3>CART TOTAL</h3>
          <div className={styles.subtotal}>
            <p>SUBTOTAL</p>
            <p className={styles.p2}>{totalWithDot} VND</p>
          </div>
          <div className={styles.total}>
            <p>TOTAL</p>
            <p className={styles.p2}>{totalWithDot} VND</p>
          </div>
          <div className={styles.coupon}>
            <input type="text" placeholder="Enter your coupon" />
            <button>
              <FontAwesomeIcon icon={["fas", "gift"]} /> Apply coupon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
