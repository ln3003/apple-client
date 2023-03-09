import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import styles from "./ProductsList.module.css";

export default function ProductsList(props) {
  const [productsArray, setProductsArray] = useState([]);
  //==============GET PRODUCTS FROM API=================
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
      }
    };
    sendRequest();
  }, []);
  return (
    <div className={styles.products}>
      <div className={styles["product-container"]}>
        {productsArray.map((x) => {
          return x.category === props.category || props.category === "" ? (
            <ProductItem key={x._id} item={x} />
          ) : (
            ""
          );
        })}
      </div>
    </div>
  );
}
