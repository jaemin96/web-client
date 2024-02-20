import { RecoilRoot } from 'recoil';
import Counter from './components/counter';

const App = () => {
  return (
    <>
      <h1>hello, world</h1>
      <RecoilRoot>
        <Counter />
      </RecoilRoot>
    </>
  );
};

export default App;
