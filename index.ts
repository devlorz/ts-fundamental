interface CurrencyResult {
  amount: number;
  base: string;
  date: string;
  rates: { [a: string]: number };
}

class Currency<const Currencies> {
  host = "api.frankfurter.app";

  constructor(public currencies: Currencies) {}

  convert(
    from: Currencies[keyof Currencies],
    to: Currencies[keyof Currencies],
    amount: number
  ) {
    return fetch(
      `https://${this.host}/latest?amount=${amount}&from=${from}&to=${to}`
    ).then((x) => x.json() as any as CurrencyResult);
  }

  log(currencies: Currencies[keyof Currencies]) {
    console.log(currencies);
  }
}

const myCurrency = new Currency(["USD", "JPY", "THB"]);

myCurrency.convert("THB", "USD", 100).then(console.log);

myCurrency.log("JPY");

/*

const host = "api.frankfurter.app";

type Currency = "USD" | "JPY" | "THB";



const convertCurrent = ({
  amount,
  from,
  to,
}: {
  amount: number;
  from: Currency;
  to: Currency;
}) => {
  return fetch(
    `https://${host}/latest?amount=${amount}&from=${from}&to=${to}`
  ).then((x) => x.json() as any as CurrencyResult);
};

const main = async () => {
  const a = await convertCurrent({
    amount: 100,
    from: "THB",
    to: "USD",
  });
  console.log(a.rates);
};

main();
*/
