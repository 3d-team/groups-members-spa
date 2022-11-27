export interface ClassModel {
    id: string;
    className: string;
    creatorName: string;
    subjectName: string;
}

export interface ClassState {
    data: ClassModel;
    status: 'loading' | 'failed' | 'idle';
}