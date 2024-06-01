import React, { useContext, useEffect, useState } from "react";
import "../Home/Home.css";
import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";
const Home = () => {
  const [input, setInput] = useState("");
  const handleInput = (e) => {
    setInput(e.target.value);
    if (e.target.value === "") {
      setDisplayCOin(allCoins);
    }
  };
  const { allCoins, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCOin] = useState([]);
  useEffect(() => {
    setDisplayCOin(allCoins);
  }, [allCoins]);

  const searchHandler = async (e) => {
    e.preventDefault();
    const coins = await allCoins.filter((item, index) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });
    setDisplayCOin(coins);
  };
  return (
    <div className="home">
      <div className="hero">
        <h1>
          Largest <br /> Crypto MarketPlace
        </h1>
        <form onSubmit={searchHandler}>
          <input
            type="text"
            placeholder="Search Crypto Coins..."
            onChange={handleInput}
            required
            value={input}
            list="coinlist"
          />
          <datalist id="coinlist">
            {allCoins.map((item, index) => (
              <option key={index} value={item.name} />
            ))}
          </datalist>
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="coins-table">
        <div className="layout">
          <p className="rank">#</p>
          <p>Coins</p>
          <p className="price">Price</p>
          <p style={{ textAlign: "center" }} className="pricechnage">
            24 hours change
          </p>
          <p className="marketcap">Market cap</p>
        </div>
        {displayCoin.slice(0, 20).map((item, index) => (
          <Link to={`/coin/${item.id}`} className="layout" key={index}>
            <p className="rank">{item.market_cap_rank}</p>
            <div className="coin">
              <img src={item.image} alt="" />
              <p>{item.name + " - " + item.symbol}</p>
            </div>
            <p className="price">
              {currency.symbol} {item.current_price.toLocaleString()}
            </p>
            <p className={item.price_change_24h > 0 ? "green" : "red"}>
              {Math.floor(item.price_change_24h * 100) / 100}
            </p>
            <p className="marketcap ">
              {currency.symbol} {item.market_cap.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
