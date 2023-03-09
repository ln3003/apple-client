import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Footer.module.css";
import FooterItem from "./FooterItem";
//==============DATA OF FOOTER=================

export default function Footer() {
  const [footer, setFooter] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios(process.env.REACT_APP_HOSTX + "/footer", { withCredentials: true })
      .then((value) => {
        setFooter(value.data);
      })
      .catch((reason) => {
        console.log(reason);
        navigate("/error");
      });
  }, [navigate]);
  return (
    <div className={styles.footer}>
      <div className={styles["footer-center"]}>
        {footer.map((x) => {
          return <FooterItem key={x.title} item={x} />;
        })}
      </div>
    </div>
  );
}
