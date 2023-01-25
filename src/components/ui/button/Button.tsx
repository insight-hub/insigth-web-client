import classNames from 'classnames';
import React from 'react';

import './Button.scss';

type ButtonVariant = 'primary' | 'danger' | 'secondary';

type Props = {
  title: string;
  active?: boolean;
  onClick?: () => void;
  variant?: ButtonVariant;
};

export const Button: React.FC<Props> = ({ active = true, ...props }) => {
  const buttonClasses = classNames([
    'btn',
    `btn--${props.variant ?? 'primary'}`,
    `${active && 'active'}`,
  ]);

  return (
    <button onClick={props.onClick} className={buttonClasses}>
      {props.title}
    </button>
  );
};
