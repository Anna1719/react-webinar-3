import React, { memo, useCallback } from 'react';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import UpperPage from '../../containers/upper-page';
import SideLayout from '../../components/side-layout';
import Input from '../../components/input';
import FormFrame from '../../components/form-frame';

function Login() {
  const store = useStore();
  const { t } = useTranslate();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    error: state.user.error,
  }));

  const [info, setInfo] = useState({
    login: '',
    password: '',
  });

  const callbacks = {
    onChange: useCallback((value, name) => {
      setInfo(info => ({ ...info, [name]: value }));
    }, []),

    onSubmit: useCallback((e) => {
        e.preventDefault();
        store.actions.user.Login(info.login, info.password, navigate("/profile"))}, [info]),
  };

  return (
    <PageLayout>
      <UpperPage />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <SideLayout padding="medium">
        <form onSubmit={callbacks.onSubmit}>
          <h2>{t('auth.title')}</h2>
          <FormFrame name={t('auth.login')}>
            <Input
              type="text"
              name="login"
              value={info.login}
              onChange={callbacks.onChange}
            />
          </FormFrame>
          <FormFrame name={t('auth.password')}>
            <Input
              type="password"
              name="password"
              value={info.password}
              onChange={callbacks.onChange}
            />
          </FormFrame>
          <FormFrame notice={select.error}/>
          <FormFrame>
          <button type="submit">{t('auth.signIn')}</button>
          </FormFrame>
        </form>
      </SideLayout>
    </PageLayout>
  );
}

export default memo(Login);
