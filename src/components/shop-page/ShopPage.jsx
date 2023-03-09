import { useState } from "react";
import ProductsList from "./ProductsList";
import styles from "./ShopPage.module.css";
export default function ShopPage() {
  const [category, setCategory] = useState("");
  return (
    <div className={styles["shop-page"]}>
      <div className={styles["shop-page-banner"]}>
        <h2>SHOP</h2>
        <p>SHOP</p>
      </div>
      <div className={styles["shop-page-content"]}>
        <div className={styles["content-left"]}>
          <h3>CATEGORIES</h3>
          <div>
            <h4 className={styles["apple-background"]}>APPLE</h4>
            <p
              className={category === "" ? styles.active : ""}
              onClick={() => {
                setCategory("");
              }}
            >
              All
            </p>
            <h4>IPHONE & MAC</h4>
            <p
              className={category === "iphone" ? styles.active : ""}
              onClick={() => {
                setCategory("iphone");
              }}
            >
              iPhone
            </p>
            <p
              className={category === "ipad" ? styles.active : ""}
              onClick={() => {
                setCategory("ipad");
              }}
            >
              iPad
            </p>
            <p>Macbook</p>
            <h4>WIRELESS</h4>
            <p
              className={category === "airpod" ? styles.active : ""}
              onClick={() => {
                setCategory("airpod");
              }}
            >
              Airpod
            </p>
            <p
              className={category === "watch" ? styles.active : ""}
              onClick={() => {
                setCategory("watch");
              }}
            >
              Watch
            </p>
            <h4>OTHER</h4>
            <p>Mouse</p>
            <p>Keyboard</p>
            <p>Other</p>
          </div>
        </div>
        <div className={styles["content-right"]}>
          <div className={styles["content-right-search"]}>
            <input
              className={styles.search}
              type="text"
              placeholder="Enter Search Here"
            />
            <select>
              <option value="">Default Sorting</option>
            </select>
          </div>
          <ProductsList category={category} />
          <div className={styles["page-btn"]}>
            <div>
              <span>&#171;</span>
              <span className={styles["page-number"]}>1</span>
              <span>&#187;</span>
            </div>
            <p>Showing 1-9 of 9 results</p>
          </div>
        </div>
      </div>
    </div>
  );
}
