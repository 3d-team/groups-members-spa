import styles from './styles.module.css';
import {Close} from '@mui/icons-material';
import {DialogRef, DialogType} from '../index.props';
import {forwardRef, Ref, useImperativeHandle, useState} from 'react';
import clsx from 'clsx';

interface Props {}

const DialogContainer = forwardRef<DialogRef, Props>((_, ref) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [dialog, setDialog] = useState<DialogType | undefined>('create_new_class');

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
        return <div>Create new class</div>;
      case 'create_new_presentation':
        return <div>Create new presentation</div>;
      default:
        return <></>;
    }
  };

  return (
    <div className={clsx(styles.container, isShow && styles.showDialog)}>
      <button className={styles.closeIcon} onClick={hide}>
        <Close sx={{fontSize: 40}} />
      </button>
      <div>{renderContent(dialog)}</div>
    </div>
  );
});

export default DialogContainer;
