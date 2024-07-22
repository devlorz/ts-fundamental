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

  get latest() {
    return fetch(`https://${this.host}/latest`).then((x) => x.json());
  }
}

const myCurrency = new Currency(["USD", "JPY", "THB"]);

myCurrency.convert("THB", "USD", 100).then(console.log);

myCurrency.latest.then(console.log);
