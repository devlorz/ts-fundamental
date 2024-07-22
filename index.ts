interface CurrencyResult<T extends string> {
  amount: number;
  base: string;
  date: string;
  rates: Record<T, number>;
}

class Currency<const Currencies extends string[]> {
  host = "api.frankfurter.app";
  private caches: Record<string, number> = {};

  constructor(public currencies: Currencies) {}

  async convert<To extends Currencies[keyof Currencies]>(
    from: Currencies[keyof Currencies],
    to: To,
    amount: number
  ) {
    const key = `${from}{to}` as To extends string ? To : never;

    if (this.caches[key]) {
      return this.caches[key];
    }

    const result = await fetch(
      `https://${this.host}/latest?amount=${amount}&from=${from}&to=${to}`
    ).then(
      (x) => x.json() as any as CurrencyResult<To extends string ? To : never>
    );

    const rate = result.rates[to as To extends string ? To : never];

    this.caches[key] = rate;

    return rate;
  }

  get latest() {
    return fetch(`https://${this.host}/latest`).then((x) => x.json());
  }
}

const myCurrency = new Currency(["USD", "JPY", "THB"]);

myCurrency.convert("THB", "USD", 100).then(console.log);

// myCurrency.latest.then(console.log);
