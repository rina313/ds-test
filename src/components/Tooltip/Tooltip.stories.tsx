import type { ReactElement } from 'react';

import type { Meta } from '@storybook/react';

import { Icon } from '@/components/Icon';

import Tooltip from './Tooltip';
import { TooltipDefaultMetaData } from './Tooltip.meta';
import { IconButton, TextButton } from '../Button';
import type { TooltipPlacement, TooltipProps } from './Tooltip.types';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Feedback/Tooltip',
  component: Tooltip,
  ...TooltipDefaultMetaData,
};

export default meta;

const placements: TooltipPlacement[] = [
  'up-left',
  'up-center',
  'up-right',
  'down-left',
  'down-center',
  'down-right',
  'left-up',
  'left-center',
  'left-down',
  'right-up',
  'right-center',
  'right-down',
];
const boxStyle: React.CSSProperties = {
  height: '300px',
  background: '#eee',
  display: 'flex', // 내부 중앙 정렬
  justifyContent: 'center', // 가로 중앙
  alignItems: 'center', // 세로 중앙
  fontSize: '18px',
  fontWeight: 'bold',
  position: 'relative',
};
export const AllVariants = (params: TooltipProps): ReactElement => {
  const { label, open, variants, size, arrow } = params;
  return (
    <div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '16px',
        }}
      >
        {placements.map((placement) => (
          <div style={boxStyle} key={placement}>
            <Tooltip
              open={open}
              label={label}
              placement={placement}
              {...{
                variants,
                size,
                arrow,
              }}
            >
              <button>{placement}</button>
            </Tooltip>
          </div>
        ))}
      </div>
    </div>
  );
};

const iconTooltipPosition: {
  placement: TooltipPlacement;
  arrowDistance?: number;
  iconSize: 's' | 'm' | 'l';
}[] = [
  {
    placement: 'up-left',
    arrowDistance: 2,
    iconSize: 's',
  },
  {
    placement: 'up-center',
    iconSize: 'm',
  },
  {
    placement: 'up-right',
    arrowDistance: 6,
    iconSize: 'l',
  },
  {
    placement: 'down-left',
    arrowDistance: 3,
    iconSize: 's',
  },
  {
    placement: 'down-center',
    iconSize: 'm',
  },
  {
    placement: 'down-right',
    arrowDistance: 6,
    iconSize: 'l',
  },
  {
    placement: 'left-up',
    arrowDistance: 10,
    iconSize: 's',
  },
  {
    placement: 'left-center',
    iconSize: 'm',
  },
  {
    placement: 'left-down',
    arrowDistance: 4,
    iconSize: 'l',
  },
  {
    placement: 'right-up',
    arrowDistance: 8,
    iconSize: 's',
  },
  {
    placement: 'right-center',
    iconSize: 'm',
  },
  {
    placement: 'right-down',
    arrowDistance: 10,
    iconSize: 'l',
  },
];
export const UseIcon = (params: TooltipProps): ReactElement => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '16px',
      }}
    >
      {iconTooltipPosition.map(({ placement, arrowDistance, iconSize }) => (
        <div style={boxStyle} key={placement}>
          <p
            style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              color: '#aaa',
              fontWeight: '400',
            }}
          >
            placement: {placement} <br />
            {arrowDistance && (
              <>
                arrowDistance: {arrowDistance}px <br />
              </>
            )}
            iconSize: {iconSize} <br />
          </p>
          <Tooltip {...params} placement={placement} arrowDistance={arrowDistance}>
            <Icon iconName='info-circle' size={iconSize} />
          </Tooltip>
        </div>
      ))}
    </div>
  );
};

export const UseText = (params: TooltipProps): ReactElement => {
  const { label, open, ...props } = params;
  return (
    <div style={{ ...boxStyle, padding: '20px' }}>
      <div>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
        been the standard dummy text ever since the 1500s, when an unknown printer took a galley of
        type and scrambled it to make a type specimen book. It has survived not only five centuries,
        but also the leap into electronic{' '}
        <Tooltip open={open} label={label || 'tooltip message'} {...props}>
          <span style={{ color: 'red', borderBottom: '1px solid red' }}>typesetting</span>
        </Tooltip>
        , remaining essentially unchanged. It was popularised in the 1960s with the release of
        Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
        software like Aldus PageMaker including versions of Lorem Ipsum.
      </div>
    </div>
  );
};

export const UseTrailingButton = (params: TooltipProps): ReactElement => {
  const { label, ...props } = params;
  return (
    <div style={boxStyle}>
      <Tooltip
        {...props}
        label={label || 'tooltip message'}
        trailingButton={
          <IconButton
            variants='secondary'
            style={{ color: '#ddd', padding: '0' }}
            icon={{
              iconName: 'close',
            }}
          />
        }
        onOpen={() => {
          console.log('open!');
        }}
        onClose={() => {
          console.log('close!');
        }}
      >
        <button>Use TrailingButton</button>
      </Tooltip>
    </div>
  );
};

export const UseActionButton = (params: TooltipProps): ReactElement => {
  const { label, ...props } = params;
  return (
    <div style={boxStyle}>
      <Tooltip
        {...props}
        label={label || 'tooltip message'}
        actionButton={
          <TextButton variants='secondary' onClick={() => console.log('call action button')}>
            Action
          </TextButton>
        }
      >
        <button>Use ActionButton</button>
      </Tooltip>
    </div>
  );
};
