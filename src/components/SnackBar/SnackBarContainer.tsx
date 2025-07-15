import type { ReactElement } from 'react';

import SnackBar from './SnackBar';
import style from './SnackBar.module.scss';
import type { SnackBarItem } from './SnackBar.types';

/**
 * 화면의 왼쪽 하단에 위치하며,
 * SnackBar가 여러개 있을 때, 겹치지 않도록 배치하는 컨테이너 컴포넌트입니다.
 */
const SnackBarContainer = ({ snackBars }: { snackBars: SnackBarItem[] }): ReactElement => {
  return (
    <>
      {snackBars.length > 0 && (
        <div className={style.container}>
          {snackBars.map((snackBar) => (
            <SnackBar key={snackBar.id} {...snackBar} />
          ))}
        </div>
      )}
    </>
  );
};

export default SnackBarContainer;
