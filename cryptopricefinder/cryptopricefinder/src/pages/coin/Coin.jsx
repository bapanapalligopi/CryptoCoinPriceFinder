import React, { useContext, useEffect, useState } from "react";
import "./Coin.css";
import { useParams } from "react-router-dom";
import { CoinContext } from "../../context/CoinContext";
import LineChart from "../../components/LineChart";

const Coin = () => {
  const { id } = useParams();
  const { currency } = useContext(CoinContext);
  const [coinData, setCoinData] = useState(null);
  const [chat, setChat] = useState(null);

  const fetchCoinData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-66Jn7TPL3auq1FFc4vededRx",
      },
    };

    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}`,
        options
      );
      const data = await response.json();
      setCoinData(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchGraph = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-66Jn7TPL3auq1FFc4vededRx",
      },
    };

    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`,
        options
      );
      const data = await response.json();
      setChat(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (id && currency) {
      fetchCoinData();
      fetchGraph();
    }
  }, [id, currency]);

  if (coinData) {
    return (
      <div className="coin">
        <div className="coin-name">
          <img src={coinData.image.large} alt={`${coinData.name} logo`} />
          <p>
            <b>
              {coinData.name} ({coinData.symbol.toUpperCase()})
            </b>
          </p>
        </div>
        <div className="chart">{chat && <LineChart chat={chat} />}</div>
        <div className="info">
          <ul>
            <li>Crypto Market Rank</li>
            <li>{coinData.market_cap_rank}</li>
          </ul>
          <ul>
            <li>Crypto Market Price</li>
            <li>
              {currency.symbol}
              {coinData.market_data.current_price[
                currency.name
              ].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>Market Cap</li>
            <li>
              {currency.symbol}
              {coinData.market_data.market_cap[currency.name].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>24 Hour High</li>
            <li>
              {currency.symbol}
              {coinData.market_data.high_24h[currency.name].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>24 Hour Low</li>
            <li>
              {currency.symbol}
              {coinData.market_data.low_24h[currency.name].toLocaleString()}
            </li>
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div className="spinner">
        <div className="spin"></div>
      </div>
    );
  }
};

export default Coin;
