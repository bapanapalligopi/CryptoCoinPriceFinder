import React, { useContext } from "react";
import "./Navbar.css";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import arrow from "../assets/arrow_icon.png";
import { CoinContext } from "../context/CoinContext";
const Navbar = () => {
  const { setCurrency } = useContext(CoinContext);
  const changeCUrrency = (e) => {
    switch (e.target.value) {
      case "Usd": {
        setCurrency({ name: "usd", symbol: "$" });
        break;
      }
      case "Inr": {
        setCurrency({ name: "inr", symbol: "₹" });
        break;
      }
      case "Eur": {
        setCurrency({ name: "eur", symbol: "€" });
        break;
      }
      default: {
        setCurrency({ name: "usd", symbol: "$" });
        break;
      }
    }
  };
  return (
    <div className="navbar">
      <Link to="/">
        <img src={logo} alt="Logo" className="logo" />
      </Link>
      <ul>
        <Link to="/">
          <li>Home</li>
        </Link>
      </ul>
      <div className="nav-right">
        <select onChange={changeCUrrency}>
          <option value="Usd">USD</option>
          <option value="Eur">EUR</option>
          <option value="Inr">INR</option>
        </select>
      </div>
    </div>
  );
};

export default Navbar;
