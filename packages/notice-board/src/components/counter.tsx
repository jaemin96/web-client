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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h1>Counter</h1>
      <span>{`current value -- ${count}`}</span>
      <span>{`value * 2 -- ${doubleCount}`}</span>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button onClick={increase}>+</button>
        <button onClick={decrease}>-</button>
      </div>
    </div>
  );
};

export default Counter;
