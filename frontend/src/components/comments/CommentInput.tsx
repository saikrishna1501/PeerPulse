import { Avatar, Button, Grid, Paper, TextareaAutosize, Typography, styled } from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { width } from "@mui/system";
import React, { useState } from "react";
import { blue, grey } from "@mui/material/colors";


type Props = {
    authorName: string,
    avatarUrl: string,
    onCommentPost: (content: string) => Promise<void>
}

const paperSx = {
    paddingLeft: 1,
    paddingRight: 1,
    paddingTop: 4,
    paddingBottom: 4,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.06)',
    marginBottom: 5
}

const avatarSx = { marginRight: 2 }

// const blue = {
//     100: '#DAECFF',
//     200: '#b6daff',
//     400: '#3399FF',
//     500: '#007FFF',
//     600: '#0072E5',
//     900: '#003A75',
//   };

//   const grey = {
//     50: '#F3F6F9',
//     100: '#E5EAF2',
//     200: '#DAE2ED',
//     300: '#C7D0DD',
//     400: '#B0B8C4',
//     500: '#9DA8B7',
//     600: '#6B7A90',
//     700: '#434D5B',
//     800: '#303740',
//     900: '#1C2025',
//   };

const Textarea = styled(TextareaAutosize)(
    ({ theme }) => `
    width: 320px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
  );


const CommentInput = ({ authorName, avatarUrl, onCommentPost }: Props) => {
    const [content, setContent] = useState("");
    const handleChange = (event:  React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value);
    }

    const handleClick = () => {
        onCommentPost(content);
        setContent("");
        console.log("Successfully posted");
    }
    return (
        <Paper
            sx={paperSx}
            elevation={0}
        >
            <Grid container spacing={2}>
                <Grid item xs={1}>
                    <Avatar
                        src={avatarUrl}
                        alt={authorName}
                        sx={avatarSx}
                    />
                </Grid>
                <Grid item xs={10}>
                    <Typography variant="h6" mb={1}>
                        {authorName}
                    </Typography>
                    <Textarea
                        minRows={6}
                        maxRows={6}
                        style={{width: "100%"}}
                        placeholder="What are your thoughts?"
                        onChange={handleChange}
                        value={content}
                    />
                    {/* <Textarea placeholder="Type anything…" variant="outlined" /> */}
                </Grid>
                <Grid item xs={1}>
                </Grid>
                <Grid item xs={10}>
                </Grid>
                <Grid item xs={2}>
                    <Button onClick={handleClick} color="success" variant="contained" >Respond</Button>
                </Grid>
            </Grid>
            
        </Paper>
    );
}

export default CommentInput;