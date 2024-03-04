import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

const Counter = lazy(() => import('./components/counter'));

const App = () => {
  return (
    <RecoilRoot>
      <Router>
        <Suspense fallback={<div>...loading</div>}>
          <Routes>
            <Route path="/counter" element={<Counter />} />
          </Routes>
        </Suspense>
      </Router>
    </RecoilRoot>
  );
};

export default App;
