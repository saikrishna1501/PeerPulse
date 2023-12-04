import { ObjectId } from 'mongodb';

class Comment {
  id!: ObjectId; 
  comment!: string;
  author!: ObjectId;
  blog!: ObjectId;

  constructor(id: ObjectId, comment: string, author: ObjectId, blog: ObjectId) {
    this.id = id;
    this.comment = comment;
    this.author = author;
    this.blog = blog;
  }
}

export default Comment;
