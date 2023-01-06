import {createRef} from 'react';

export type NavigationOptionType = 'classes' | 'presentation' | 'account';

export interface NavItemModel {
  type: NavigationOptionType;
  displayName: string;
  link: string;
}

export const NAV_OPTIONS: NavItemModel[] = [
  {
    type: 'classes',
    displayName: 'Class',
    link: '/',
  },
  {
    type: 'presentation',
    displayName: 'Presentation',
    link: '/presentation',
  },
  {
    type: 'account',
    displayName: 'Account',
    link: '/myprofile',
  },
];

export type DialogType = 'create_new_class' | 'create_new_presentation' | 'join_class';
export interface DialogRef {
  hide: () => void;
  show: (key: DialogType) => void;
}

export const dialogRef = createRef<DialogRef>();

export const showDialog: DialogRef['show'] = (key: DialogType) => {
  dialogRef.current?.show(key);
};

export const hideDialog: DialogRef['hide'] = () => {
  dialogRef.current?.hide();
};
