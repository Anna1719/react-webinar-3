import React, { memo, useCallback, useEffect } from 'react';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import { useNavigate } from 'react-router-dom';
import UpperPage from '../../containers/upper-page';
import ProfileCard from '../../components/profile-card';

function Profile() {
  const navigate = useNavigate();
  let store = useStore();
  const { t } = useTranslate();

  const select = useSelector(state => ({
    token: state.user.token,
    user: state.user.userData,
  }));

  
  const callbacks = {
    getUser: useCallback(() => store.actions.user.getUser(), [store]),
  };


  console.log(select.token);

  useEffect(() => {
    callbacks.getUser();
  }, []);

  return (
    <PageLayout>
      <UpperPage />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
        <ProfileCard data={select.user} />
    </PageLayout>
  );
}

export default memo(Profile);
