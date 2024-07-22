interface CurrencyResult<T extends string> {
  amount: number;
  base: string;
  date: string;
  rates: Record<T, number>;
}

function cache(method: Function, context: any) {
  return async function (
    this: Currency,
    from: string,
    to: string,
    amount: number
  ) {
    const key = `${from}${to}`;

    if (this.caches[key]) return this.caches[key] * amount;

    const result = await method.call(this, from, to, amount);

    const rate = result.rates[to];
    this.caches[key] = rate / result.amount;

    return rate;
  };
}

class Currency<
  const Currencies extends readonly string[] = [],
  Values extends string = Extract<Currencies[keyof Currencies], string>
> {
  host = "api.frankfurter.app";
  caches: Record<string, number> = {};

  constructor(public currencies: Currencies) {}

  @cache
  async convert<To extends Values>(from: Values, to: To, amount: number) {
    return fetch(
      `https://${this.host}/latest?amount=${amount}&from=${from}&to=${to}`
    ).then((x) => x.json() as unknown as CurrencyResult<To>);
  }

  get latest() {
    return fetch(`https://${this.host}/latest`).then((x) => x.json());
  }
}

const myCurrency = new Currency(["USD", "JPY", "THB"]);

const a = async () => {
  await myCurrency.convert("THB", "USD", 100).then(console.log);
  await myCurrency.convert("THB", "USD", 100).then(console.log);
  await myCurrency.convert("THB", "USD", 100).then(console.log);
};

a();

// myCurrency.latest.then(console.log);
