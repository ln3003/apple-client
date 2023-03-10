import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./DetailHistory.module.css";

export default function DetailHistory() {
  const location = useLocation();
  const navigate = useNavigate();
  const total = location.state.orderItem.reduce((sum, x) => {
    return sum + x.quantity * Number(x.item.price);
  }, 0);
  const totalWithDot = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const downloadHandle = () => {
    axios
      .post(
        process.env.REACT_APP_HOSTX + "/order/download-order",
        { id: location.state._id },
        {
          withCredentials: true,
          responseType: "blob",
        }
      )
      .then((value) => {
        const file = new Blob([value.data], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(file);
        link.download = "Invoice.pdf";
        link.click();
      })
      .catch((reason) => {
        console.log(reason);
        navigate("/error");
      });
  };
  return (
    <div className={styles.checkout}>
      <div className={styles["checkout-top"]}>
        <h2>INFOMATION ORDER</h2>
        <p>
          <span>HOME / HISTORY /</span> INFOMATION
        </p>
      </div>
      <h3>INFOMATION ORDER</h3>
      <p>ID User: {location.state.idUser._id}</p>
      <p>Full Name: {location.state.idUser.name}</p>
      <p>Phone: {location.state.idUser.tel}</p>
      <p>Address: {location.state.address}</p>
      <p>Total: {totalWithDot} VND</p>
      <button onClick={downloadHandle}>Download Invoice</button>
      <table>
        <thead>
          <tr>
            <th>ID PRODUCT</th>
            <th>IMAGE</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>COUNT</th>
          </tr>
        </thead>
        <tbody>
          {location.state.orderItem?.map((x) => {
            const price = x.item.price
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            return (
              <tr key={x.item._id}>
                <td>{x.item._id}</td>
                <td>
                  <img src={x.item.img1} alt={x.item.name} />
                </td>
                <td>{x.item.name}</td>
                <td>{price} VND</td>
                <td>{x.quantity}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
/*{
    "_id": "63ff174d86cf1b6fb79251fb",
    "idUser": {
        "_id": "63fdd1d4ebfc40b16a4e4cde",
        "name": "Nghia",
        "email": "nghsvn@gmail.com",
        "tel": "0901758165"
    },
    "address": "Ha Noi",
    "orderItem": [
        {
            "item": {
                "_id": "62ccdcc95eefc71539bb6b59",
                "category": "airpod",
                "img1": process.env.REACT_APP_HOSTX+"/images/img1_Apple_AirPods_3rd_gen.jpg",
                "img2": process.env.REACT_APP_HOSTX+"/images/img2_Apple_AirPods_3rd_gen.jpg",
                "img3": process.env.REACT_APP_HOSTX+"/images/img3_Apple_AirPods_3rd_gen.jpg",
                "img4": process.env.REACT_APP_HOSTX+"/images/img4_Apple_AirPods_3rd_gen.jpg",
                "long_desc": "?????c ??i???m n???i b???t\n- Ki???u d??ng hi???n ?????i, g???n ?????p, ??eo tho???i m??i ?????n b???t k??? n??i n??o. \n- ??m thanh v??m s???ng ?????ng c??ng Spatial audio v?? chip H1 m???nh m???.\n- K???t n???i kh??ng d??y Bluetooth 5.0 m?????t m?? xa ?????n 10 m. \n- ??i???u ch???nh ??m thanh ph?? h???p ???ng tai c???a b???n nh??? h??? tr??? Adaptive EQ.\n- Tai nghe cho th???i gian nghe nh???c 6 gi???, h???p s???c 24 gi???.\n- H??? tr??? s???c nhanh, cho th???i gian s??? d???ng 1 gi??? ch??? v???i 5 ph??t s???c.\n- H???p s???c h??? tr??? s???c kh??ng d??y chu???n Qi, ti???n l???i khi s???c l???i.\n- Trang b??? chu???n ch???ng n?????c IPX4, b???o v??? tai nghe an to??n d?????i m??a nh??? v?? m??? h??i.",
                "name": "Apple AirPods 3rd gen",
                "price": "4390000",
                "short_desc": "Thi???t k??? sang tr???ng, nhi???u thay ?????i so v???i th??? h??? tr?????c\nTai nghe AirPods 3 s??? h???u nhi???u thi???t k??? t????ng t??? v???i th??? h??? AirPods Pro tuy nhi??n kh??ng c?? ph???n n??t tai. Thi???t k??? n??y mang l???i c???m gi?? tho???i m??i khi s??? d???ng cho ng?????i d??ng, ph?? h???p v???i ??a s??? k??ch th?????c tai. ?????c bi???t, thi???t k??? n??y th??ch h???p v???i ng?????i d??ng th?????ng xuy??n ????? m??? h??i m?? kh??ng h??? g??y kh?? ch???u. Ph???n th??n tai c??ng ???????c l??m ng???n h??n, g???n nh??? h??n."
            },
            "quantity": 1,
            "_id": "63ff174d86cf1b6fb79251fc"
        }
    ],
    "orderTime": "2023-03-01T09:13:49.570Z",
    "delivery": "Waiting for progressing",
    "status": "Waiting for pay",
    "__v": 0
} */
