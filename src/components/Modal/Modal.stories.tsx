import type { ReactElement } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { ModalProvider, useModal } from '@/contexts/modal';

import Modal from './Modal';
import { ModalDefaultMetaData } from './Modal.meta';
import type { ModalProps } from './Modal.types';
import { SolidButton } from '../Button';

const meta: Meta<typeof Modal> = {
  title: 'Components/Feedback/Modal',
  component: Modal,
  ...ModalDefaultMetaData,
};

export default meta;

type ModalStoryProps = ModalProps & {
  activeOnPrev: boolean;
  disabledActionArea: boolean;
};

export const AllVariants = ({
  activeOnPrev: _,
  disabledActionArea: __,
  ...modalProps
}: ModalStoryProps): ReactElement => {
  const { actionArea, ...rest } = modalProps;
  return (
    <div
      className='flex-column'
      style={{ backgroundColor: '#f0f0f0', padding: '20px', width: '100%', height: '100vh' }}
    >
      <Modal
        {...rest}
        actionArea={
          actionArea && (
            <div style={{ display: 'flex', gap: '10px' }}>
              <SolidButton variants='secondary' style={{ width: '100%' }}>
                자세히
              </SolidButton>
              <SolidButton style={{ width: '100%' }}>결제하기</SolidButton>
            </div>
          )
        }
      />
      <Modal
        {...rest}
        size='l'
        actionArea={
          actionArea && (
            <div style={{ display: 'flex', gap: '10px' }}>
              <SolidButton variants='secondary'>자세히</SolidButton>
              <SolidButton variants='secondary' style={{ margin: '0 0 0 auto' }}>
                새로고침
              </SolidButton>
              <SolidButton>결제하기</SolidButton>
            </div>
          )
        }
      />
    </div>
  );
};

type Story = StoryObj<ModalStoryProps>;
const loremChildren = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nunc lacus, posuere a accumsan et, semper quis urna. Praesent pharetra nibh varius lectus iaculis, ac convallis velit varius. In auctor erat felis, sit amet lobortis est euismod sed. Nulla vitae posuere justo, id egestas neque. Curabitur dignissim libero tempus lectus efficitur, vitae consequat massa tempor. Maecenas sagittis non nisi malesuada laoreet. Nullam vestibulum porttitor sem at bibendum. Mauris nec lobortis sapien. Ut euismod lectus purus, vel posuere erat cursus at. Vestibulum et pulvinar augue. Nulla pellentesque pharetra nulla, quis condimentum massa imperdiet in. Aliquam sem magna, venenatis non nisl nec, suscipit porta arcu. Curabitur sollicitudin lacinia finibus. Sed accumsan finibus elit sed volutpat. Vestibulum maximus pellentesque varius. Aliquam suscipit rhoncus dictum. Pellentesque ligula tellus, varius a feugiat sit amet, mollis sed dolor. Cras fermentum quam enim, non hendrerit enim consequat ut. Phasellus eget magna urna. Phasellus interdum ligula et arcu venenatis volutpat. Ut nulla lectus, tincidunt a erat non, efficitur cursus tellus. Fusce ullamcorper enim sed hendrerit accumsan. Nam posuere sed risus at tincidunt. Mauris feugiat placerat bibendum. Mauris eget tortor quis ex eleifend sollicitudin. Nunc accumsan mi lectus, eu posuere augue mollis eu. Sed a nisi at libero tristique cursus non sed enim. Etiam tristique tincidunt erat. Proin elementum odio malesuada leo pretium condimentum. Sed dignissim laoreet magna, sed tristique urna suscipit sit amet. Cras iaculis sapien dolor, quis sollicitudin elit posuere vitae. Sed erat lectus, blandit sit amet lorem ut, posuere vulputate justo. Vivamus arcu erat, pretium a dapibus sed, auctor id tellus. Ut nec lacinia ex. Donec facilisis magna et elit sagittis, non sollicitudin elit ultricies. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed sit amet ullamcorper lacus. Fusce a lectus sit amet neque tristique vestibulum non semper massa. In porttitor sed enim vitae ultrices. Sed massa nulla, sagittis in nibh a, condimentum efficitur leo. Aenean mauris felis, pulvinar congue enim sed, ultrices vulputate leo. Phasellus nec ante egestas, fermentum massa id, porta dui. Aenean sed sem vehicula, efficitur nunc nec, dictum ipsum. In rhoncus lacus sit amet dolor sagittis feugiat. Maecenas dui metus, convallis ac gravida a, molestie quis est. Donec id tempus lectus. Phasellus id maximus mauris, vitae viverra mauris. Aenean nec risus a nisi mattis varius. Donec accumsan consectetur turpis ut scelerisque. Vestibulum condimentum magna id ultrices rutrum. Aliquam posuere lacinia nisl, quis efficitur sem facilisis eget. Curabitur auctor porttitor malesuada. Sed congue, mauris ac lobortis maximus, lectus risus laoreet orci, eget tempus magna nisi eu lectus. Mauris eros orci, cursus quis est ut, efficitur dictum orci. Nunc eu accumsan dui. Fusce vitae ligula maximus, tempus urna eu, fringilla dui. Nunc porttitor quam urna, eget rutrum metus tincidunt eget. Phasellus vitae odio a ipsum tempus elementum. Nam eu neque eget mauris ultricies vestibulum. Suspendisse eget ultrices metus, in malesuada enim. Nullam facilisis mi a fermentum finibus. Cras neque dolor, volutpat a urna pellentesque, condimentum lacinia augue. Aenean at ligula a lacus tristique egestas a nec ex. Duis accumsan commodo sem, at convallis justo pellentesque sit amet. Aliquam non sagittis purus. Praesent tempus eget orci vel varius. Aenean lorem tellus, iaculis id porttitor eget, pretium sit amet quam. Nullam non finibus elit, non ornare dolor. Nulla posuere condimentum enim, vel iaculis lacus sagittis et. Ut auctor nulla eu nisi ullamcorper, eget aliquet purus hendrerit. Aliquam aliquam, purus gravida tristique convallis, lectus dui bibendum mi, et tempor nisl nisi in libero. Sed eget risus sit amet enim fringilla varius a vitae felis. Integer nec felis purus. Etiam accumsan imperdiet elit, at imperdiet urna vestibulum eu. Sed commodo augue id interdum porta. Phasellus imperdiet tortor at interdum imperdiet. Duis sollicitudin finibus tincidunt.`;
export const LongText: Story = {
  args: {
    title: '모달 제목',
    children: loremChildren,
    size: 'm',
    actionArea: (
      <div style={{ display: 'flex', gap: '10px' }}>
        <SolidButton variants='secondary' style={{ width: '100%' }}>
          자세히
        </SolidButton>
        <SolidButton style={{ width: '100%' }}>결제하기</SolidButton>
      </div>
    ),
  },
  render: ({ activeOnPrev: _, disabledActionArea: __, ...modalProps }) => {
    const { actionArea, size, ...rest } = modalProps;
    return (
      <div
        style={{
          backgroundColor: '#f0f0f0',
          padding: '20px',
          width: '100%',
          height: 'calc(100vh - 35px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Modal
          {...rest}
          size={size}
          actionArea={
            actionArea && size ? (
              <div style={{ display: 'flex', gap: '10px' }}>
                <SolidButton variants='secondary' style={{ width: '100%' }}>
                  자세히
                </SolidButton>
                <SolidButton style={{ width: '100%' }}>결제하기</SolidButton>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '10px' }}>
                <SolidButton variants='secondary'>자세히</SolidButton>
                <SolidButton variants='secondary' style={{ margin: '0 0 0 auto' }}>
                  새로고침
                </SolidButton>
                <SolidButton>결제하기</SolidButton>
              </div>
            )
          }
        />
      </div>
    );
  },
};

const ModalWithProvider = () => {
  const { openModal, closeModal } = useModal();
  const handleClose = () => {
    console.log('모달 닫힘');
  };

  const handleOpenDefault = () => {
    openModal({
      title: '기본 모달',
      children: '이것은 기본 모달입니다.',
      size: 'm',
      actionArea: <SolidButton style={{ width: '100%' }}>확인</SolidButton>,
      onClose: handleClose,
    });
  };

  const handleOpenLarge = () => {
    openModal({
      title: '큰 모달',
      children: '사이즈가 큰 모달입니다.',
      size: 'l',
      actionArea: (
        <div style={{ display: 'flex', gap: '10px' }}>
          <SolidButton variants='secondary'>자세히</SolidButton>
          <SolidButton variants='secondary' style={{ margin: '0 0 0 auto' }}>
            새로고침
          </SolidButton>
          <SolidButton>결제하기</SolidButton>
        </div>
      ),
      onClose: handleClose,
    });
  };

  const handleOpenNoHeader = () => {
    openModal({
      disabledHeader: true,
      children: '헤더가 없는 모달입니다.',
      size: 'm',
      actionArea: (
        <SolidButton style={{ width: '100%' }} onClick={closeModal}>
          닫기
        </SolidButton>
      ),
    });
  };

  const handleOpenLongContent = () => {
    openModal({
      title: '스크롤 모달',
      children: loremChildren,
      size: 'm',
      actionArea: <SolidButton style={{ width: '100%' }}>확인</SolidButton>,
    });
  };

  const handleOpenPrev = () => {
    openModal({
      title: '이전 버튼 모달',
      onPrev: () => alert('이전 클릭!'),
      children: '이전 버튼이 활성화된 모달입니다.',
      size: 'm',
      actionArea: <SolidButton style={{ width: '100%' }}>확인</SolidButton>,
    });
  };

  const handleOpenNoCloseOnOverlay = () => {
    openModal({
      title: '외부 영역 클릭 닫기 비활성화',
      children: '이 모달은 외부 영역을 눌러도 닫히지 않습니다.',
      size: 'm',
      closeOnOverlayClick: false,
      actionArea: <SolidButton style={{ width: '100%' }}>확인</SolidButton>,
    });
  };

  return (
    <div className='flex-column' style={{ padding: '20px', width: '100%', gap: 12 }}>
      <SolidButton onClick={handleOpenDefault}>기본 모달</SolidButton>
      <SolidButton onClick={handleOpenLarge}>큰 모달</SolidButton>
      <SolidButton onClick={handleOpenNoHeader}>헤더 없는 모달</SolidButton>
      <SolidButton onClick={handleOpenLongContent}>스크롤 모달</SolidButton>
      <SolidButton onClick={handleOpenPrev}>이전 버튼 모달</SolidButton>
      <SolidButton onClick={handleOpenNoCloseOnOverlay}>
        외부 영역 클릭 닫기 비활성화 모달
      </SolidButton>
    </div>
  );
};
export const withProvider = (): ReactElement => {
  return (
    <ModalProvider>
      <ModalWithProvider />
    </ModalProvider>
  );
};
