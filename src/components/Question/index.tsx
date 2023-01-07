import { Button, DialogActions, TextField, Box, FormControl,
        IconButton, MenuItem, InputLabel } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from '@/redux';
import "./style.css";
import { QuestionModel } from '@/models/question';
import Select, { SelectChangeEvent } from '@mui/material/Select';

// interface Props {
//     hideOnClick: () => void;
// }
const Question = () => {
    const sampleQuestion : QuestionModel = {
        uuid: "12",
        tittle: 'Vì sao ReactJS ngày càng trở nên thông dụng?',
        content: 'zxczxc',
        status: 'NEW',
        voterIds: ['1','2','3'],
        answers: [],
        groupId: '1',
    };

    const sampleQuestion2 : QuestionModel = {
        uuid: "13",
        tittle: 'ReactJS ra đời khi nào?',
        content: 'zxczxc',
        status: 'NEW',
        voterIds: ['1'],
        answers: [],
        groupId: '1',
    };

    const sampleData: QuestionModel[] = [sampleQuestion, sampleQuestion2];

    const [question, setQuestion] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [buttonAnswerText, setButtonAnswerText] = useState('Mark as answered');
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
    };

    const handleClickMarkAsAnswer = () => {
        setButtonAnswerText('Answered');
    }

    const handleChangeSort = (event: SelectChangeEvent) => {
        setSortBy(event.target.value);

        //sort listQuestions
      };

    return (
        <div className="container" >
            <div className="form">
                <p className="class__title">Questions from audience</p>

                <Box className='form__inputs'>
                    <FormControl sx={{ width: "95vh" }}>
                        <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
                        <Select
                            fullWidth
                            labelId="demo-simple-select-label"
                            id="sort-by"
                            value={sortBy}
                            label="Sort by"
                            onChange={handleChangeSort}
                        >
                            <MenuItem value='answered'>Unanswer/Answered</MenuItem>
                            <MenuItem value='time-asked'>Recent</MenuItem>
                            <MenuItem value='upvotes'>Top questions</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <div className='questions'>
                    {listQuestions.map((item: QuestionModel, index: number) => (
                        <div key={index} className='question'>
                            <div>
                            <p className='question__title'>{item.tittle}</p>
                            {ownerId == userId && (
                                <Button variant={buttonAnswerText == 'Answered' || item.status == 'ANSWERED' ? 'contained' : 'outlined'} size="small" onClick={handleClickMarkAsAnswer} disableRipple >
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
                </div>
                {ownerId != userId && (<>
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
                </>)}
            </div>
        </div>
    );
};

export default Question;