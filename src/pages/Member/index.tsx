import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar/Navbar';
import { ClassModel } from '@/models/class';
import { useState } from 'react';
import { useAppDispatch } from '@/redux';
import { Typography, Divider, List, ListItem, ListItemText } from '@mui/material';
export default function Member() {

    const sampleData: ClassModel = {
        id: '12',
        className: '19PTUDWNC',
        creatorName: 'Nguyen Huy Khanh',
        subjectName: 'Phát triển ứng dụng web nâng cao',
    }

    const [classData, setClassData] = useState<ClassModel>(sampleData);
    const { classId } = useParams();

    //Get Class 

    const style = {
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
    };

    return (
        <>
            <Navbar classData={classData} />
            <Typography variant='h4'>
                Giáo viên
            </Typography>
            <Divider  color="#FDA228" />
            <List sx={style} component="nav" aria-label="mailbox folders">
                <ListItem button>
                    <ListItemText primary="Inbox" />
                </ListItem>
                <Divider/>
                <ListItem button divider>
                    <ListItemText primary="Drafts" />
                </ListItem>
                <ListItem button>
                    <ListItemText primary="Trash" />
                </ListItem>
                <Divider light />
                <ListItem button>
                    <ListItemText primary="Spam" />
                </ListItem>
            </List>
        </>
    );
}
