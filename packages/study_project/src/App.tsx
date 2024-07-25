import { useDispatch, useSelector } from 'react-redux';
import { Increase, Decrease } from './redux/modules/counter';
import { RootState } from './redux/modules/index';

const App = () => {
  const dispatch = useDispatch();
  const { num } = useSelector((state: RootState) => state.counter);

  return (
    <>
      <div className="App">
        <h1>Hello, world!</h1>
        <span>hello</span>
      </div>
      <hr />
      <div>
        <div>
          <h1>State management</h1>
          <span>current value : {num}</span>
        </div>
        <button className="increase-btn" onClick={() => dispatch(Increase())}>
          +
        </button>
        <button className="decrease-btn" onClick={() => dispatch(Decrease())}>
          -
        </button>
      </div>
    </>
  );
};

export default App;
