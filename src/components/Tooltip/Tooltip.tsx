import type { ReactElement } from 'react';
import { useEffect, useState } from 'react';

import { clsx } from 'clsx';

import style from './Tooltip.module.scss';
import type { TooltipProps } from './Tooltip.types';

function Tooltip({
  children,
  variants = 'bk',
  size = 's',
  arrow = true,
  placement = 'down-left',
  label,
  trailingButton,
  actionButton,
  open,
  onOpen,
  onClose,
  arrowDistance = 4,
}: TooltipProps): ReactElement {
  const [isHovered, setIsHovered] = useState(false);
  const currentIsHover = open !== undefined ? open : isHovered;
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  useEffect(() => {
    if (currentIsHover) onOpen?.();
    else onClose?.();
  }, [onOpen, onClose, currentIsHover]);
  return (
    <div
      className={style.wrapper}
      style={
        {
          '--arrow-distance': `${arrowDistance}px`,
        } as React.CSSProperties
      }
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={style.target}>
        <div>{children}</div>
        {currentIsHover && label && (
          <div
            className={clsx(
              style.tooltip,
              style[variants],
              style[size],
              style[placement],
              arrow && style['arrow-wrapper'],
            )}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className={style.labelRow}>
              <span className={style.label}>{label}</span>
              {trailingButton && <div className={style.trailing}>{trailingButton}</div>}
            </div>
            {actionButton && <div className={style.action}>{actionButton}</div>}
            {arrow && (
              <div className={style.arrow}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='12'
                  height='9'
                  viewBox='0 0 12 9'
                  fill='none'
                >
                  <path d='M0 9 L5 2 Q6 0.8, 7 2 L12 9 Z' fill='#2A2A2A' />
                </svg>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Tooltip;
