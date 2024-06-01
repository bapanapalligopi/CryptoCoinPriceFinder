import { createContext, useEffect, useState } from "react";

export const CoinContext = createContext();

const CoinContextProvider = (props) => {
  const [allCoins, setAllCoins] = useState([]);
  const [currency, setCurrency] = useState({ name: "usd", symbol: "$" });

  const fetchAllCoins = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-66Jn7TPL3auq1FFc4vededRx",
      },
    };

    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
      options
    )
      .then((response) => response.json())
      .then((response) => setAllCoins(response))
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    fetchAllCoins();
  }, [currency]);
  const ContextValue = {
    allCoins,
    setCurrency,
    currency,
  };
  return (
    <CoinContext.Provider value={ContextValue}>
      {props.children}
    </CoinContext.Provider>
  );
};
export default CoinContextProvider;
