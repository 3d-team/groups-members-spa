import styles from './styles.module.css';
import { Close } from '@mui/icons-material';
import { DialogRef, DialogType } from '../index.props';
import { forwardRef, Ref, useImperativeHandle, useState } from 'react';
import clsx from 'clsx';
import CreatePresentation from '@/components/CreatePresentation/CreatePresentation';
import CreateClass from '@/components/CreateClass/CreateClass';
import JoinClass from '@/components/JoinClass/JoinClass';
import Question from '@/components/Question';

interface Props { }

const DialogContainer = forwardRef<DialogRef, Props>((_, ref) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [dialog, setDialog] = useState<DialogType | undefined>();

  const show = (key: DialogType) => {
    setIsShow(true);
    setDialog(key);
  };

  const hide = () => {
    setIsShow(false);
    setDialog(undefined);
  };

  useImperativeHandle(ref, () => {
    return {
      show,
      hide,
    };
  });

  const renderContent = (key: DialogType | undefined) => {
    switch (key) {
      case 'create_new_class':
        return (
          <CreateClass hideOnClick={() => {
            hide();
          }} />
        );
      case 'create_new_presentation':
        return (
          <CreatePresentation
            hideOnSubmit={() => {
              hide();
            }}
          />
        );
      case 'join_class':
        return (
          <JoinClass hideOnClick={() => {
            hide();
          }} />
        );
      case 'question':
        return (
          <Question/>
        );
      default:
        return <></>;
    }
  };

  return (
    <div className={clsx(styles.container, isShow && styles.showDialog)}>
      <button className={styles.closeIcon} onClick={hide}>
        <Close sx={{ fontSize: 40 }} />
      </button>
      <div>{renderContent(dialog)}</div>
    </div>
  );
});

export default DialogContainer;
