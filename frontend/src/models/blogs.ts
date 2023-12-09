import { ObjectId } from 'mongodb'; // Assuming you are using MongoDB and ObjectId for IDs
import Comment from './comments';

class Blog {
  id?: ObjectId | string; // Assuming you are using MongoDB ObjectId for the ID
  title!: string;
  content!: string;
  upvotes?: number;
  downvotes?: number;
  comments?: Comment[];
  reported?: boolean;
  author?: ObjectId | any;
  createdAt?: Date | any;
  updatedAt?: Date | null;
  tag?: string[];

  constructor(
    id: ObjectId,
    title: string,
    content: string,
    upvotes: number,
    downvotes: number,
    comments: Comment[],
    reported: boolean,
    author: ObjectId,
    createdAt: Date,
    updatedAt: Date | null,
    tag: string[]
  ) {
    this.id = id;
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
