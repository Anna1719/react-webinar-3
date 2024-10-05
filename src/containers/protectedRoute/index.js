import { memo } from 'react';
import { Navigate, useLocation } from "react-router-dom";
import useSelector from "../../hooks/use-selector";

/*
/ ProtectedRoute: Для удобства проверки авторизации пользователя при переходе на страницу профиля.
/ В нем проводится проверка на авторизацию (и на ожидание, тк используются async функции в большом количестве)
/ Если пользователь авторизован, его пускает к странице профиля. Если нет - перенаправляет на страницу авторизации
/ В качестве параметров передаются чилдрены (рут страницы профиля) и путь к альтернативной странице (/login).
*/

function ProtectedRoute ({ children, path }) {
    const select = useSelector(state => ({
      auth: state.user.auth,
      wait: state.user.wait,
    }));

    const location = useLocation();

    if (!select.auth && !select.wait) {
      console.log(location.pathname);
      return <Navigate to={path} state={{ from: location.pathname }} replace />;
    }
    return children;
  };

  export default memo(ProtectedRoute);