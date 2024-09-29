import { memo } from 'react';
import { Link } from 'react-router-dom';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function MainMenu({ name }) {
  const cn = bem('Menu');

  return (
    <div className={cn()}>
      <Link to="/" className={cn('home')}>
        {name}
      </Link>
    </div>
  );
}

export default memo(MainMenu);
