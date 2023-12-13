import { Avatar, Grid, IconButton, ListItemText, Menu, MenuItem, Paper, Typography } from "@mui/material";
import { padding, textAlign } from "@mui/system";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import React from "react";
import { useSelector } from "react-redux";
import { ObjectId } from "bson";


type Props = {
    authorName: string,
    authorId: string | ObjectId | undefined,
    commentId: string | ObjectId | undefined,
    content: string,
    avatarUrl: string,
    setEditable: () => void,
    onCommentDelete:(commentId: string | ObjectId | undefined) => void
}

const paperSx = {
    paddingLeft: 1,
    paddingRight: 1,
    paddingTop: 4,
    paddingBottom: 4,
}

const avatarSx = { 
    marginRight: 2
 }

const listItemPadding = {
    paddingLeft: 2, 
    paddingRight: 2
}




const CommentNonEditableCard = ({ authorName, content, avatarUrl, authorId, setEditable, onCommentDelete, commentId }: Props) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const user = useSelector((state: any) => state.auth.user);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }
    
    const handleMenuClose = () => {
        setAnchorEl(null)
    }

    const onEditButtonClick = () => {
        setEditable()
    }

    const onDeleteButtonClick = () => {
        onCommentDelete(commentId)
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
                <Grid item xs={10} >
                    <Typography variant="h6" gutterBottom>
                        {authorName}
                    </Typography>
                    <Typography variant="body1">{content}</Typography>
                </Grid>
                <Grid item xs={1}>
                {user._id === authorId ? (<IconButton
                    size="large"
                    edge="end"
                    aria-label="more options"
                    aria-controls="more-options-menu"
                    aria-haspopup="true"
                    onClick={handleMenuOpen}
                    color="inherit"
                    >
                <MoreHorizIcon sx={{cursor: "pointer"}}/>
                </IconButton>) : null}
                <Menu
                    id="more-options-menu"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    >
                    <MenuItem onClick={onEditButtonClick}><ListItemText sx={listItemPadding}>Edit</ListItemText></MenuItem>
                    <MenuItem onClick={onDeleteButtonClick}><ListItemText sx={listItemPadding}>Delete</ListItemText></MenuItem>
                </Menu>
                </Grid>
            </Grid>  
        </Paper>
    );
}

export default CommentNonEditableCard;