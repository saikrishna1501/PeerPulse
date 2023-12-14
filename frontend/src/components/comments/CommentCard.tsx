import { Avatar, Grid, IconButton, ListItemText, Menu, MenuItem, Paper, Typography } from "@mui/material";
import { padding, textAlign } from "@mui/system";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import React, { ReactNode, useState } from "react";
import { useSelector } from "react-redux";
import { ObjectId } from "bson";
import CommentNonEditableCard from "./CommentNonEditableCard";
import CommentEditableCard from "./CommentEditableCard";


type Props = {
    authorName: string,
    authorId: string | ObjectId | undefined,
    commentId: string | ObjectId | undefined,
    content: string,
    avatarUrl: string,
    onCommentEdit: (content: string, commendId: string | ObjectId | undefined) => void,
    onCommentDelete: (commentId: string | ObjectId | undefined) => void
}

const CommentCard = ({ authorName, content, avatarUrl, authorId, onCommentEdit, commentId, onCommentDelete }: Props) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const [isEdit, setIsEdit] = useState<boolean>(false);

    const user = useSelector((state: any) => state.auth.user);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }
    
    const handleMenuClose = () => {
        setAnchorEl(null)
    }

    const onEditHandler = () => {

    }

    const onDeleteHandler = () => {

    }

    const setEditable = () => {
        setIsEdit(true);
    }

    const unsetEditable = () => {
        setIsEdit(false);
    }

    return (
        <>
        {
        isEdit ? <CommentEditableCard authorName={authorName} commentId={commentId} content={content} avatarUrl={avatarUrl} setEditable={setEditable} unsetEditable={unsetEditable} onCommentEdit={onCommentEdit}/>
         : <CommentNonEditableCard authorName={authorName} authorId={authorId} content={content} avatarUrl={avatarUrl} setEditable={setEditable} onCommentDelete={onCommentDelete} commentId={commentId}/>}
        </>
    )
}

export default CommentCard;