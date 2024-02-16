import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';

const CounterState = atom({
  key: 'countState',
  default: 0,
});

const DoubleCount = selector({
  key: 'doubleCount',
  get: ({ get }) => {
    const count = get(CounterState);

    return count * 2;
  },
});

const Counter = () => {
  const [count, setCount] = useRecoilState(CounterState);

  const doubleCount = useRecoilValue(DoubleCount);

  const increase = () => {
    setCount((prev) => prev + 1);
  };
  const decrease = () => {
    setCount((prev) => prev - 1);
  };

  return (
    <div className="counter">
      <h1 className="counter-title">Counter</h1>
      <span className="counter-count">{count}</span>
      <span className="counter-double_count">{doubleCount}</span>
      <div className="counter-btn">
        <button className="increase-btn" onClick={increase}>
          +
        </button>
        <button className="decrease-btn" onClick={decrease}>
          -
        </button>
      </div>
    </div>
  );
};

export default Counter;
