import { memo, useCallback } from 'react';
import SideLayout from '../../components/side-layout';
import { Link, useNavigate } from 'react-router-dom';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';

function UpperPage() {
  const { t } = useTranslate();
  const navigate = useNavigate();
  const store = useStore();

  const select = useSelector(state => ({
    user: state.user.userData,
    auth: state.user.auth,
  }));

  const callbacks = {
    onSignIn: useCallback(() => {
      navigate('/login');
    }),

    onSignOut: useCallback(() => {
      store.actions.user.logOut();
    }, []),
  };

  return (
    <SideLayout side="end" padding="small_underline">
      {select.auth ? <Link to="/profile">{select.user.name}</Link> : ''}
      {select.auth ? (
        <button onClick={callbacks.onSignOut}>{t('user.signOut')}</button>
      ) : (
        <button onClick={callbacks.onSignIn}>{t('user.signIn')}</button>
      )}
    </SideLayout>
  );
}

export default memo(UpperPage);
