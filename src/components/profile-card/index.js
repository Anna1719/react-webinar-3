import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import useTranslate from '../../hooks/use-translate';
import './style.css';

function ProfileCard(props) {
  const { t } = useTranslate();
  const cn = bem('ProfileCard');
  return (
    <div className={cn()}>
      <h2 className={cn('title')}>{t('profile.title')}</h2>
      <div className={cn('data')}>
        <div className={cn('label')}>{t('profile.name')}:</div>
        <div className={cn('value')}>{props.data?.profile?.name}</div>
      </div>
      <div className={cn('data')}>
        <div className={cn('label')}>{t('profile.phone')}:</div>
        <div className={cn('value')}>{props.data?.profile?.phone}</div>
      </div>
      <div className={cn('data')}>
        <div className={cn('label')}>{t('profile.email')}:</div>
        <div className={cn('value')}>{props.data?.email}</div>
      </div>
    </div>
  );
}

export default memo(ProfileCard);
