import { Button, DialogActions, TextField } from '@mui/material';
import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from '@/redux';
import ClassApi from '@/api/classApi';
import {ClassActions} from '@/redux/feature/class/slice';
import "./style.css";

interface Props {
    hideOnClick: () => void;
}
const CreateClass = ({ hideOnClick }: Props) => {
    const [className, setClassName] = useState('');
    const [Section, setSection] = useState('');
    const [subjectName, setSubjectName] = useState('');

    const dispatcher = useAppDispatch();

    const addClass = async () => {
        const data = {
            name: className,
            section: Section,
            subject: subjectName,
        };
        ClassApi.addClass(data);
        dispatcher(ClassActions.addClass(data));
        hideOnClick();
    };

    return (
        <div className="container" >
            <div className="form">
                <p className="class__title">Create Class</p>

                <div className="form__inputs">
                    <TextField
                        id="filled-basic"
                        label="Class Name (required)"
                        className="form__input"
                        variant="filled"
                        value={className}
                        onChange={e => setClassName(e.target.value)}
                    />
                    <TextField id="filled-basic" label="Section" className="form__input" variant="filled" value={Section} onChange={e => setSection(e.target.value)} />
                    <TextField
                        id="filled-basic"
                        label="Subject"
                        className="form__input"
                        variant="filled"
                        value={subjectName}
                        onChange={e => setSubjectName(e.target.value)}
                    />
                </div>
                <DialogActions>
                    <Button onClick={addClass} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </div>
        </div>
    );
};

export default CreateClass;