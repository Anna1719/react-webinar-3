import React, { memo } from 'react';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import UpperPage from '../../containers/upper-page';
import ProfileCard from '../../components/profile-card';
import useInit from '../../hooks/use-init';

function Profile() {
  let store = useStore();
  const { t } = useTranslate();

  useInit(() => {
    store.actions.profile.load();
  }, [t]);

  const select = useSelector(state => ({
    profile: state.profile.data,
    wait: state.profile.wait,
  }));

  return (
    <PageLayout>
      <UpperPage />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
        <ProfileCard data={select.profile} />
    </PageLayout>
  );
}

export default memo(Profile);
