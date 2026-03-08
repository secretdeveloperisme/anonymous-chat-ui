import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './routes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={<route.layout>{route.element}</route.layout>} />
        ))}
        {privateRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={<route.layout>{route.element}</route.layout>} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
