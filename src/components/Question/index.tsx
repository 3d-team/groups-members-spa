import { Button, DialogActions, TextField, Box, FormControl,
        IconButton, MenuItem, InputLabel } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from '@/redux';
import "./style.css";
import { QuestionModel } from '@/models/question';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import QuestionApi from '@/api/questionApi';
import { useParams } from 'react-router-dom';
import PresentationApi from '@/api/presentationApi';

// interface Props {
//     hideOnClick: () => void;
// }
const Question = () => {
    const {presentationId} = useParams();
    const [question, setQuestion] = useState("");
    const [questions, setQuestions] = useState<any>([]);
    const [sortBy, setSortBy] = useState('');
    const [buttonAnswerText, setButtonAnswerText] = useState('Mark as answered');
    const [presentation, setPresentation] = useState<any>({});
    const userId = useAppSelector(state => state.user.data.uuid);

    const dispatcher = useAppDispatch();

    const fetchData = async () => {
        const present = await PresentationApi.findById(String(presentationId));
        console.log(present);
        setPresentation(present);

        const response = await QuestionApi.all(String(presentationId));
        console.log(response);
        setQuestions(response);
    };

    useEffect(() => {
        setTimeout(() => fetchData());
    }, []);

    const askNewQuestion = async () => {
        const data = {
            title: question,
            content: question,
            presentationId: presentation.uuid
        };
        const response = await QuestionApi.sendNewQuestion(data);
        setQuestions((prev: any) => {
            return [
                ...prev,
                response
            ];
        });
        setQuestion("");
    };

    const handleClickMarkAsAnswer = async (id: string) => {
        setButtonAnswerText('Answered');
        const response = await QuestionApi.markAnswered(id);
        console.log(response);
    }

    const handleChangeSort = (event: SelectChangeEvent) => {
        setSortBy(event.target.value);

        console.log(questions);
    };

    const upVote = async (item: any) => {
        const response = await QuestionApi.upVote(item.uuid);
        console.log(response);
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
                    {questions.map((item: any, index: number) => (
                        <div key={index} className='question'>
                            <div>
                                <p className='question__title'>{item.content}</p>
                                {presentation.hostId == userId && (
                                    <Button 
                                            variant={buttonAnswerText == 'Answered' || item.status == 'ANSWERED' ? 'contained' : 'outlined'} 
                                            size="small" 
                                            onClick={() => handleClickMarkAsAnswer(item.uuid)} disableRipple >
                                        {buttonAnswerText}
                                    </Button>
                                )}
                            </div>
                        <div className='question__like'>
                            <IconButton
                                onClick={() => upVote(item)}
                                color='inherit'
                                sx={{
                                    backgroundColor: "#c4c3c2",
                                    ":hover": { backgroundColor: "primary.light" }
                                }}>
                                <ThumbUpIcon />
                            </IconButton>
                            <p>{item.voterIds.length}</p>
                        </div>
                        </div>
                    ))}
                </div>
                {presentation.hostId != userId && (<>
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