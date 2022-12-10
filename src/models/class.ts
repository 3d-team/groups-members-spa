export interface ClassModel {
  uuid: string;
  name: string;
  ownerId: string;
  subject: string;
  description: string;
  coOwnerIds: string[];
  memberIds: string[];
  room: string;
  section: string;
}

export interface ClassState {
  data: ClassModel;
  status: 'loading' | 'failed' | 'idle';
  classList: any[];
}
