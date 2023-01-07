import { Button, DialogActions, TextField, IconButton } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from '@/redux';
import "./style.css";
import { QuestionModel } from '@/models/question';

interface Props {
    hideOnClick: () => void;
}
const Question = ({ hideOnClick }: Props) => {
    const sampleData: QuestionModel = {
        uuid: "12",
        tittle: 'zxczxc',
        content: 'zxczxc',
        status: 'NEW',
        voterIds: [],
        answers: [],
        groupId: '1',
      };

    const [question, setQuestion] = useState('');
    const [buttonAnswerText, setButtonAnswerText] = useState('ark as answered');
    const [listQuestions, setListQuestions] = useState<any>(sampleData);

    const presentation = useAppSelector(state => state.presentation.data.uuid);
    const ownerId = useAppSelector(state => state.presentation.data.hostId);
    const userId = useAppSelector(state => state.user.data.uuid);

    const dispatcher = useAppDispatch();

    const fetchQuestions = async () => {
        //Backend
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

    const askNewQuestion = async () => {
        const data = {
            question: question,
        };
        //Call Backend

        hideOnClick();
    };

    const handleClickMarkAsAnswer = () => {
        setButtonAnswerText('Answered');
    }

    return (
        <div className="container" >
            <div className="form">
                <p className="class__title">Questions from audience</p>
                <div className='questions'>
                    {listQuestions.map((item: any, index: number) => (
                        <div key={index} className='question'>
                            <div>
                            <p className='question__title'>{item.tittle}</p>
                            {ownerId == userId && (
                                <Button variant={buttonAnswerText == 'Answered' ? 'contained' : 'outlined'} size="small" onClick={handleClickMarkAsAnswer} disableRipple >
                                    {buttonAnswerText}
                                </Button>
                            )}
                        </div>
                        <div className='question__like'>
                            <IconButton
                                color='inherit'
                                sx={{
                                    backgroundColor: "#c4c3c2",
                                    ":hover": { backgroundColor: "primary.light" }
                                }}
                            >
                                <ThumbUpIcon />
                            </IconButton>
                            <p>{item.voterIds.length}</p>
                        </div>
                        </div>
                    ))}
                    <div className='question'>

                        <div>
                            <p className='question__title'>Từ ... có nghĩa là gì vậy?</p>
                            {ownerId == userId && (
                                <Button variant={buttonAnswerText == 'Answered' ? 'contained' : 'outlined'} size="small" onClick={handleClickMarkAsAnswer} disableRipple >
                                    {buttonAnswerText}
                                </Button>
                            )}
                        </div>
                        <div className='question__like'>
                            <IconButton
                                color='inherit'
                                sx={{
                                    backgroundColor: "#c4c3c2",
                                    ":hover": { backgroundColor: "primary.light" }
                                }}
                            >
                                <ThumbUpIcon />
                            </IconButton>
                            <p>2</p>
                        </div>
                    </div>
                    <div className='question'>
                        <div>
                            <p className='question__title'>Từ ... có nghĩa là gì vậy?</p>
                            <Button variant={buttonAnswerText == 'Answered' ? 'contained' : 'outlined'} size="small" onClick={handleClickMarkAsAnswer} disableRipple >
                                {buttonAnswerText}
                            </Button>
                        </div>
                        <div className='question__like'>
                            <IconButton
                                color='inherit'
                                sx={{
                                    backgroundColor: "#c4c3c2",
                                    ":hover": { backgroundColor: "primary.light" }
                                }}
                            >
                                <ThumbUpIcon />
                            </IconButton>
                            <p>2</p>
                        </div>
                    </div>
                </div>
                <div className="form__inputs">
                    <TextField
                        id="filled-basic"
                        label="Write your question here..."
                        className="form__input"
                        variant="filled"
                        value={question}
                        onChange={e => setQuestion(e.target.value)}
                    />
                </div>
                <DialogActions>
                    <Button onClick={askNewQuestion} variant="contained" color="primary">
                        Ask new question
                    </Button>
                </DialogActions>
            </div>
        </div>
    );
};

export default Question;