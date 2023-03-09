import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Banner from "./banner/Banner";
import Categories from "./categories/Categories";
import OtherInformation from "./other-information/OtherInformation";
import Products from "./Products/Products";

export default function HomePage() {
  const [homeData, setHomeData] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_HOSTX + "/home", { withCredentials: true })
      .then((value) => {
        setHomeData(value.data[0]);
      })
      .catch((reason) => {
        console.log(reason);
        navigate("/error");
      });
  }, [navigate]);
  return (
    <div>
      <Banner value={homeData} />
      <Categories value={homeData} />
      <Products />
      <OtherInformation value={homeData} />
    </div>
  );
}
