// components/ReduxProvider.js

'use client'; // Ensure this is a client-side component

import { Provider } from 'react-redux';
import store from '../store/store'; // Path to your Redux store

const ReduxProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
