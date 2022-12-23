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
