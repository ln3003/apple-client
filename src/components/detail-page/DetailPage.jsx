import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./DetailPage.module.css";
import ProductItem from "./ProductItem";
import { addCart, updateCart } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

export default function DetailPage() {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const params = useParams();
  const [productsArray, setProductsArray] = useState([]);
  const [item, setItem] = useState({});
  const navigate = useNavigate();
  //==============GET STATE FROM THE STORE=================
  const cart = useSelector((state) => {
    return state.cart.cart;
  });
  //===============GET CART ARRAY FROM LOCAL STORAGE================
  useEffect(() => {
    if (localStorage.getItem("cartArray")) {
      const cartArray = JSON.parse(localStorage.getItem("cartArray"));
      dispatch(updateCart(cartArray));
    } else {
      localStorage.setItem("cartArray", JSON.stringify([]));
    }
    //==============GET PRODUCTS FROM API=================
    const sendRequest = async () => {
      try {
        const response = await fetch(
          process.env.REACT_APP_HOSTX + "/product/get-product",
          { credentials: "include" }
        );
        const data = await response.json();
        setProductsArray(data);
        const p = data.find((x) => {
          return x._id === params.productId;
        });
        setItem(p);
      } catch (e) {
        console.log(e.message);
        navigate("/error");
      }
    };
    sendRequest();
  }, [params.productId, dispatch, navigate]);
  //==============HANDLE ADD CART=================
  const addHandle = () => {
    if (item.remaining > 0) {
      dispatch(addCart({ item, quantity }));
      axios
        .patch(
          process.env.REACT_APP_HOSTX + "/product/update-remaining",
          { id: item._id, quantity },
          { withCredentials: true }
        )
        .then(() => {
          navigate("/cart");
        })
        .catch((reason) => {
          console.log(reason);
          navigate("/error");
        });
    } else {
      alert("This product is out of stock");
    }
  };
  //==============IF CART NOT NULL THEN SAVE CART TO LOCAL STOGARE=================
  if (cart.length > 0) {
    localStorage.setItem("cartArray", JSON.stringify(cart));
  }
  //==============PUT DOT TO PRICE=================
  const price = item.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return (
    <div>
      <div className={styles.centerbox}>
        <div className={styles.color}>
          <img src={item.img1} alt={item.name} />
          <img src={item.img2} alt={item.name} />
          <img src={item.img3} alt={item.name} />
          <img src={item.img4} alt={item.name} />
        </div>
        <img src={item.img1} alt={item.name} />
        <div className={styles.infomation}>
          <p className={styles["infomation-name"]}>{item.name}</p>
          <p className={styles["infomation-price"]}>{price} VND</p>
          <p className={styles["infomation-desc"]}>{item.short_desc}</p>
          <p className={styles["infomation-category"]}>
            CATEGORY: <span>{item.category} </span>
            REMAINING: <span>{item.remaining}</span>
          </p>
          <div className={styles.quantity}>
            <div className={styles.arrow}>
              <span
                onClick={() => {
                  setQuantity((state) => {
                    return state - 1;
                  });
                }}
              >
                &#9664;
              </span>
              <span>{quantity}</span>
              <span
                onClick={() => {
                  setQuantity((state) => {
                    return state + 1;
                  });
                }}
              >
                &#9654;
              </span>
            </div>
            <input
              type="number"
              placeholder="QUANTITY"
              value={quantity}
              onChange={() => {}}
            />
          </div>
          <button onClick={addHandle}>Add to cart</button>
        </div>
      </div>
      <div className={styles.description}>
        <p className={styles["description-title"]}>DESCRIPTION</p>
        <h2>PRODUCT DESCRIPTION</h2>
        <p className={styles["long-desc"]}>{item.long_desc}</p>
        <h2>RELATED PRODUCTS</h2>
        <div className={styles["related-products"]}>
          {productsArray.map((x) => {
            return (
              x.category === item.category &&
              x._id !== params.productId && (
                <ProductItem key={x.name} item={x} />
              )
            );
          })}
        </div>
      </div>
    </div>
  );
}
