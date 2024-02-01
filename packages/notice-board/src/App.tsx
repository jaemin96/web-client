import { RecoilRoot } from 'recoil';
import Counter from './components/counter';

const App = () => {
  return (
    <RecoilRoot>
      <Counter />
    </RecoilRoot>
  );
};

export default App;
