
import 'vite/modulepreload-polyfill';

import { RouterProvider } from 'react-router-dom';
import RouterConfig from './RouterConfig';


function App() {
  return (
    <RouterProvider router={RouterConfig()} />
  );
}

export default App;
