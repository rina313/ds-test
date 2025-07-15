import { useState, type ChangeEvent, type KeyboardEvent, type ReactElement } from 'react';

import { clsx } from 'clsx';

import { IconButton } from '@/components/Button';
import { Icon } from '@/components/Icon';

import style from './SearchInput.module.scss';
import type { SearchInputProps, SearchInputSize } from './SearchInput.types';

/** Form > SearchInput 컴포넌트
 * @description 콘텐츠를 검색할 때 사용합니다.
 */
export default function SearchInput({
  value,
  onChange,
  onEnter,
  disabled = false,
  trailingContent,
  backButton,
  closeButton,
  size = 'l',
  leadingBtnHandler,
  ...props
}: SearchInputProps): ReactElement {
  const [searchValue, setSearchValue] = useState(value || '');
  /** 내부 `input` 핸들러 입니다. */
  const handleOnChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const input = target.value;
    setSearchValue(input);
    onChange?.(input);
  };

  /** 내부 `input` enter 입력 시 실행되는 핸들러 입니다. */
  const handleKeyDown = (e: KeyboardEvent) => {
    const target = e.target as HTMLInputElement;
    const input = target.value;
    if (e.key === 'Enter') {
      e.preventDefault();
      setSearchValue(input);
      onEnter?.(input);
    }
  };

  const handleClear = () => {
    setSearchValue('');
    onChange?.('');
  };

  function convertButtonSize(inputSize: SearchInputSize) {
    type ButtonSize = 'm' | 'l' | 'xl';
    const sizeMap: Record<SearchInputSize, ButtonSize> = {
      s: 'm',
      m: 'l',
      l: 'xl',
    };
    return sizeMap[inputSize];
  }
  return (
    <div className={clsx(style['search-input-container'], size && style[`size-${size}`])}>
      {backButton && (
        <IconButton
          variants='secondary'
          className={style['icon-button']}
          onClick={backButton}
          size={convertButtonSize(size)}
          icon={{ iconName: 'chevron-left' }}
        />
      )}
      <div className={clsx(style['search-input-wrapper'], disabled ? style.disabled : style.state)}>
        <IconButton
          variants='secondary'
          className={style['icon-box']}
          onClick={leadingBtnHandler}
          size={size}
          icon={{ iconName: 'search' }}
        />
        <input
          {...props}
          value={searchValue}
          onChange={handleOnChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
        />
        {!!searchValue && (
          <IconButton
            className={style['icon-box']}
            onClick={handleClear}
            icon={{ iconName: 'circle-xmark' }}
          />
        )}
        {trailingContent && (
          <div
            data-testid='search-input-trailing-content'
            data-icon-name={trailingContent.iconName}
          >
            <Icon className={style['icon-box']} {...trailingContent} size='s' />
          </div>
        )}
      </div>
      {closeButton && (
        <IconButton
          variants='secondary'
          className={style['icon-button']}
          onClick={closeButton}
          size={convertButtonSize(size)}
          icon={{ iconName: 'xmark' }}
        />
      )}
    </div>
  );
}
