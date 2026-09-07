import {
  lazy,
  Suspense,
  useState,
} from 'react';
import { Route, Routes } from 'react-router-dom';
import LazyLoad from './LazyLoad';

const Layout = lazy(() => import('./components/Layouts/index'));
const Home = lazy(() => import('./pages/Home/Home'));

function AppRoutes() {
  const [headerState, setHeaderState] = useState(false);
  return (
    <Suspense fallback={<LazyLoad />}>
      <Routes>
        <Route path='/' element={<Layout headerState={headerState} />}>
          <Route index element={<Home setHeaderState={setHeaderState} />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
export default AppRoutes;
