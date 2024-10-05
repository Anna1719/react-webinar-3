import { Routes, Route } from 'react-router-dom';
import useSelector from '../hooks/use-selector';
import Main from './main';
import Basket from './basket';
import Article from './article';
import Login from './login';
import Profile from './profile';
import { Navigate, useLocation } from "react-router-dom";
import useStore from '../hooks/use-store';
import useInit from '../hooks/use-init';
import ProtectedRoute from '../containers/protectedRoute';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);

  const store = useStore();

  useInit(async () => {
    await store.actions.user.getUser();
  })

  return (
    <>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route path={'/login'} element={<Login />} />
        <Route
          path={'/profile'}
          element={
             <ProtectedRoute path={'/login'}>
              <Profile />
             </ProtectedRoute> 
          }
        />
      </Routes>

      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
