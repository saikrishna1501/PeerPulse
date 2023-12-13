import { Avatar, Button, Grid, Paper, TextareaAutosize ,Typography,styled } from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import { ObjectId } from "bson"
import { useState } from "react";

type Props = {
    authorName: string,
    commentId: string | ObjectId | undefined,
    content: string,
    avatarUrl: string,
    onCommentEdit: (content: string, commendId: string | ObjectId | undefined) => void,
    setEditable: () => void,
    unsetEditable: () => void
}

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
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
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

  const paperSx = {
    paddingLeft: 1,
    paddingRight: 1,
    paddingTop: 4,
    paddingBottom: 4,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.06)',
    marginBottom: 5
}

const avatarSx = { marginRight: 2 }

const CommentEditableCard = ({authorName, commentId, content, avatarUrl, onCommentEdit, setEditable, unsetEditable}: Props) => {
    const [textAreaContent, settextAreaContent] = useState(content);
    const handleChange = (event:  React.ChangeEvent<HTMLTextAreaElement>) => {
        settextAreaContent(event.target.value);
        setEditable();
    }

    const handleSaveClick = () => {
        console.log(commentId);
        onCommentEdit(textAreaContent, commentId)
        unsetEditable();
    }

    return (
        <>
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
                        value={textAreaContent}
                    />
                    {/* <Textarea placeholder="Type anything…" variant="outlined" /> */}
                </Grid>
                <Grid item xs={1}>
                </Grid>
                <Grid item xs={8}>
                </Grid>
                <Grid item xs={2}>
                    <Button onClick={unsetEditable} variant="contained" sx={{
        backgroundColor: "white",
        color: 'black', // Text color
        boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.1)', // Subtle box-shadow
        border: '0px 2px 8px rgba(0, 0, 0, 0.2)',
        transition: 'box-shadow 0.3s ease', // Add a transition for smooth hover effect
        '&:hover': {
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.2)', // Increase the box-shadow on hover
          background: "white"
        },
        width: 80,
        height: 35
      }}>Cancel</Button>
                </Grid>
                <Grid item xs={2}>
                    <Button onClick={handleSaveClick} color="success" variant="contained" sx={{width: 80, height: 35}} >Save</Button>
                </Grid>
            </Grid>
            
        </Paper>
        </>
    )
}

export default CommentEditableCard