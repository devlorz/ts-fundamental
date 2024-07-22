const host = "api.frankfurter.app";

type Currency = "USD" | "JPY" | "THB";

interface CurrencyResult {
  amount: number;
  base: string;
  date: string;
  rates: { [a: string]: number };
}

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
