import type { HTMLAttributes } from 'react';
import { forwardRef, useEffect, useRef, useState } from 'react';

import { clsx } from 'clsx';

import style from './Modal.module.scss';
import { IconButton } from '../Button';
import type { ModalProps } from './Modal.types';

/**
 * Modal 컴포넌트
 * - 모달의 레이아웃, 헤더, 내용, 액션 영역을 렌더링
 * - 스크롤 여부에 따라 스타일을 동적으로 적용
 * - ref 전달 가능 (forwardRef) : 모달 외부 영역클릭시 닫기 이벤트를 위한 값
 */
const Modal = forwardRef<HTMLDivElement, ModalProps & HTMLAttributes<HTMLDivElement>>(
  function Modal(
    {
      disabledHeader = false,
      title,
      onPrev,
      onClose,
      children,
      size = 'm',
      actionArea,
      className,
      ...rest
    },
    ref,
  ) {
    const contentWrapperRef = useRef<HTMLDivElement>(null);
    const [hasScroll, setHasScroll] = useState(false);

    useEffect(() => {
      const el = contentWrapperRef.current;
      if (!el) return;
      const checkScroll = () => {
        setHasScroll(el.scrollHeight > el.clientHeight);
      };
      checkScroll();
      el.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      return () => {
        el.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }, [children]);

    return (
      <div
        {...rest}
        ref={ref}
        className={clsx(style.wrapper, style[size], hasScroll && style['scroll-modal'], className)}
      >
        {!disabledHeader && (
          <div className={style.header}>
            {onPrev && (
              <IconButton
                variants='secondary'
                className={style['prev-icon-button']}
                size='l'
                icon={{ iconName: 'chevron-left', alt: '이전' }}
                onClick={onPrev}
              />
            )}
            {title && <h2 className={style.title}>{title}</h2>}
            <IconButton
              variants='secondary'
              className={style['close-icon-button']}
              size='xl'
              icon={{ iconName: 'close', alt: '닫기' }}
              onClick={() => onClose?.()}
            />
          </div>
        )}
        <div
          className={clsx(
            style['content-wrapper'],
            hasScroll && style['content-scroll'],
            disabledHeader && style['no-header'],
          )}
          ref={contentWrapperRef}
        >
          <div className={style.content}>{children}</div>
        </div>
        {actionArea && (
          <div className={clsx(style['action-area'], hasScroll && style['action-shadow'])}>
            {actionArea}
          </div>
        )}
      </div>
    );
  },
);

export default Modal;
