import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./History.module.css";

export default function History() {
  const [dataOrder, setDataOrder] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_HOSTX + "/order/get-user-orders", {
        withCredentials: true,
      })
      .then((value) => {
        setDataOrder(value.data);
      })
      .catch((reason) => {
        console.log(reason);
        navigate("/error");
      });
  }, [navigate]);
  return (
    <div className={styles.checkout}>
      <div className={styles["checkout-top"]}>
        <h2>HISTORY</h2>
        <p>
          <span>HOME / USER /</span> HISTORY
        </p>
      </div>
      <h3>HISTORY DETAILS</h3>
      <table>
        <thead>
          <tr>
            <th>ID ORDER</th>
            <th>ID USER</th>
            <th>NAME</th>
            <th>PHONE</th>
            <th>ADDRESS</th>
            <th>TOTAL</th>
            <th>DELIVERY</th>
            <th>STATUS</th>
            <th>DETAIL</th>
          </tr>
        </thead>
        <tbody>
          {dataOrder?.map((x) => {
            const total = x.orderItem.reduce((sum, x) => {
              return sum + x.quantity * Number(x.item.price);
            }, 0);
            const totalWithDot = total
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            return (
              <tr key={x._id}>
                <td>{x._id}</td>
                <td>{x.idUser._id}</td>
                <td>{x.idUser.name}</td>
                <td>{x.idUser.tel}</td>
                <td>{x.address}</td>
                <td>{totalWithDot} VND</td>
                <td>{x.delivery}</td>
                <td>{x.status}</td>
                <td>
                  <button
                    onClick={() => {
                      navigate("/detail-history", { state: x });
                    }}
                  >
                    View &#10144;
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
