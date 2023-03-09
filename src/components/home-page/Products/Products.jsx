import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Popup from "./Popup";
import ProductItem from "./ProductItem";
import styles from "./Products.module.css";

export default function Products() {
  //==============GET STATE FROM STORE=================
  const showPopup = useSelector((state) => {
    return state.popup.popup;
  });
  const popupValue = useSelector((state) => {
    return state.popup.value;
  });
  const [productsArray, setProductsArray] = useState([]);
  const navigate = useNavigate();
  //==============GET PRODUCT FROM LIBRARY=================
  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch(
          process.env.REACT_APP_HOSTX + "/product/get-product",
          { credentials: "include" }
        );
        const data = await response.json();
        setProductsArray(data);
      } catch (e) {
        console.log(e.message);
        navigate("/error");
      }
    };
    sendRequest();
  }, [navigate]);
  return (
    <div className={styles.products}>
      {showPopup && <Popup value={popupValue} />}
      <p>MADE THE HARD WAY</p>
      <h2>TOP TRENDING PRODUCTS</h2>
      <div className={styles["product-container"]}>
        {productsArray.map((x) => {
          return <ProductItem key={x._id} item={x} />;
        })}
      </div>
    </div>
  );
}
