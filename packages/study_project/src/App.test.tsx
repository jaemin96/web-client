import { render, screen } from '@testing-library/react';
import App from './App';

import rootReducer from './redux/modules';
import { legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';

const store = createStore(rootReducer);

test('renders learn react link', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const linkElement = screen.getByText('hello');

  expect(linkElement).toBeInTheDocument();
});
