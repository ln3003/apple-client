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
                "long_desc": "Đặc điểm nổi bật\n- Kiểu dáng hiện đại, gọn đẹp, đeo thoải mái đến bất kỳ nơi nào. \n- Âm thanh vòm sống động cùng Spatial audio và chip H1 mạnh mẽ.\n- Kết nối không dây Bluetooth 5.0 mượt mà xa đến 10 m. \n- Điều chỉnh âm thanh phù hợp ống tai của bạn nhờ hỗ trợ Adaptive EQ.\n- Tai nghe cho thời gian nghe nhạc 6 giờ, hộp sạc 24 giờ.\n- Hỗ trợ sạc nhanh, cho thời gian sử dụng 1 giờ chỉ với 5 phút sạc.\n- Hộp sạc hỗ trợ sạc không dây chuẩn Qi, tiện lợi khi sạc lại.\n- Trang bị chuẩn chống nước IPX4, bảo vệ tai nghe an toàn dưới mưa nhỏ và mồ hôi.",
                "name": "Apple AirPods 3rd gen",
                "price": "4390000",
                "short_desc": "Thiết kế sang trọng, nhiều thay đổi so với thế hệ trước\nTai nghe AirPods 3 sở hữu nhiều thiết kế tương tự với thế hệ AirPods Pro tuy nhiên không có phần nút tai. Thiết kế này mang lại cảm giá thoải mái khi sử dụng cho người dùng, phù hợp với đa số kích thước tai. Đặc biệt, thiết kế này thích hợp với người dùng thường xuyên đổ mồ hôi mà không hề gây khó chịu. Phần thân tai cũng được làm ngắn hơn, gọn nhẹ hơn."
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
