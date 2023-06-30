import React, { useEffect, useState } from "react";
import "./widget.scss";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import AssuredWorkloadOutlinedIcon from '@mui/icons-material/AssuredWorkloadOutlined';
import { Link } from "react-router-dom";


const Widget = ({ type }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let endpoint = "";
      switch (type) {
        case "user":
          endpoint = "/users/count";
          break;
        case "hotel":
          endpoint = "/hotels/count";
          break;
        case "room":
          endpoint = "/rooms/count";
          break;
        default:
          break;
      }

      const response = await fetch(endpoint);
      const data = await response.json();
      setCount(data.count);
    } catch (error) {
      console.error("Error fetching count:", error);
    }
  };

  let data = {};

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: <Link to={"/users"}>See all users</Link> ,
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "hotel":
      
      data = {
        title: "HOTELS",
        isMoney: false,
        link: <Link to={"/hotels"}>View all hotels</Link>,
        icon: (
          <AssuredWorkloadOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "room":
      data = {
        title: "ROOMS",
        isMoney: false,
        link: <Link to={"/rooms"}>View all rooms</Link>,
        icon: (
          <BedOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">{count}</span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
