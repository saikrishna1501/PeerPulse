import { ObjectId } from 'mongodb'; // Assuming you are using MongoDB and ObjectId for IDs
import Comment from './comments';
import Upvote from './upvote';

class Blog {
  _id?: ObjectId | string; // Assuming you are using MongoDB ObjectId for the ID
  title!: string;
  content!: string;
  upvotes?: Upvote | any;
  downvotes?: number;
  comments?: Comment[];
  reported?: boolean;
  author?: ObjectId | any;
  createdAt?: Date | any;
  updatedAt?: Date | null;
  tag?: string[];

  constructor(
    _id: ObjectId,
    title: string,
    content: string,
    upvotes: { count: number; users: ObjectId[] },
    downvotes: number,
    comments: Comment[],
    reported: boolean,
    author: ObjectId,
    createdAt: Date,
    updatedAt: Date | null,
    tag: string[]
  ) {
    this._id = _id;
    this.title = title;
    this.content = content;
    this.upvotes = upvotes;
    this.downvotes = downvotes;
    this.comments = comments;
    this.reported = reported;
    this.author = author;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.tag = tag;
  }
}

export default Blog;
