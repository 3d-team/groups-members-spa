import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    Typography
} from "@mui/material";
import React, { useState } from "react";
import {useAppSelector, useAppDispatch} from '@/redux';
import Form from "./Form";
import {dialogActions} from '@/redux/feature/dialog/slice';
import "./style.css";   

const CreateClass = () => {
    const createClassDialog = useAppSelector(state => state.dialog.createClassDialog);
    const [check, setChecked] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const dispatcher = useAppDispatch();

    const handleClose = () => {
        dispatcher(dialogActions.closeCreateClassDialog());
    };

    return (
        <div>
            <Dialog
                onClose={() => handleClose()}
                aria-labelledby="customized-dialog-title"
                open={createClassDialog}
                maxWidth={showForm ? "lg" : "xs"}
                className="form__dialog"
            >
                {showForm ? (
                    <Form />
                ) : (
                    <>
                        <div className="class__title">
                            Using Classroom at a school with students?
                        </div>
                        <DialogContent className="class__content">
                            <Typography component={'span'} className="class__text">
                                <p>If so, your school must sign up for a free</p>
                                <a href="/register" className="class__link">
                                    G Suite for Education
                                </a>
                                account before you can use Classroom
                                <a href="/learn" className="class__link2">
                                    Learn More.
                                </a>
                            </Typography>
                            <Typography component={'span'} >
                                G Suite for Education lets schools decide which Google services
                                their students can use, and provides additional
                                <a href="/privacy" className="class__link2 class__link">
                                    privacy and security
                                </a>
                                protections that are important in a school setting. Students
                                cannot use Google Classroom at a school with personal accounts.
                            </Typography>

                            <div className="class__checkboxWrapper">
                                <Checkbox color="primary" onChange={() => setChecked(!check)} />
                                <p>
                                    I've read and understand the above notice, and I'm not using
                                    Classroom at a school with students
                                </p>
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={() => handleClose()}>
                                Close
                            </Button>

                            <Button
                                autoFocus
                                color="primary"
                                disabled={!check}
                                onClick={() => setShowForm(true)}
                            >
                                Continue
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </div>
    );
};

export default CreateClass;