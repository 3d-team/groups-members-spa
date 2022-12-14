import React, { useState } from "react";
import {useAppSelector, useAppDispatch} from '@/redux';
import {dialogActions} from '@/redux/feature/dialog/slice';
import { Avatar, Button, Dialog, Slide, TextField } from "@mui/material";
import { TransitionProps } from '@mui/material/transitions';
import { Close } from "@mui/icons-material";
import "./style.css";
import ClassApi from "@/api/classApi";
import { useNavigate } from "react-router-dom";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  hideOnClick: () => void;
}

const JoinClass = ({hideOnClick}: Props) => {
  const navigate = useNavigate();
  const loggedInUser = useAppSelector(state => state.user.data);

  const [classCode, setClassCode] = useState<string>("");
  const [error, setError] = useState();

  const dispatcher = useAppDispatch();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await ClassApi.joinClass(classCode);
    navigate(`/class/${classCode}`);
    hideOnClick();
  };

  return (
    <div className="container">
        <div className="joinClass">
          <div className="joinClass__wrapper">
            <div className="joinClass__wraper2">
              <div className="joinClass__topHead">Join Class</div>
            </div>
            <Button
              className="joinClass__btn"
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Join
            </Button>
          </div>
          <div className="joinClass__form">
            <p className="joinClass__formText">
              You're currently signed in as {loggedInUser?.email}
            </p>
            <div className="joinClass__loginInfo">
              <div className="joinClass__classLeft">
                <Avatar src="" />
                <div className="joinClass__loginText">
                  <div className="joinClass__loginName">
                    {loggedInUser?.fullName}
                  </div>
                  <div className="joinClass__loginEmail">
                    {loggedInUser?.email}
                  </div>
                </div>
              </div>
              <Button variant="outlined" color="primary">
                Logout
              </Button>
            </div>
          </div>
          <div className="joinClass__form">
            <div
              style={{ fontSize: "1.25rem", color: "#3c4043" }}
              className="joinClass__formText"
            >
              Class Code
            </div>
            <div
              style={{ color: "#3c4043", marginTop: "-5px" }}
              className="joinClass__formText"
            >
              Ask your teacher for the class code, then enter it here.
            </div>
            <div className="joinClass__loginInfo">
              <TextField
                id="outlined-basic"
                label="Class Code"
                variant="outlined"
                value={classCode}
                onChange={(e) => setClassCode(e.target.value)}
                error={error}
                helperText={error && "No class was found"}
              />
            </div>
          </div>
        </div>
    </div>
  );
};
export default JoinClass;