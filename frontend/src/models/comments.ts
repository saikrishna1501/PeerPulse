import { ObjectId } from 'mongodb';

class Comment {
  _id!: string; 
  comment!: string;
  author!: ObjectId;
  blog!: ObjectId;

  constructor(id: string, comment: string, author: ObjectId, blog: ObjectId) {
    this._id = id;
    this.comment = comment;
    this.author = author;
    this.blog = blog;
  }
}

export default Comment;
