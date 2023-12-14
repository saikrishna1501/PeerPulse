import { ObjectId } from 'mongodb'; // Assuming you are using MongoDB and ObjectId for IDs
import Comment from './comments';

class Upvote {
  _id?: ObjectId | string; // Assuming you are using MongoDB ObjectId for the ID
  count!: number; 
  users!: ObjectId[];

  constructor(
    _id: ObjectId,
    count: number,
    users: ObjectId[],
  ) {
    this._id = _id;
    this.count = count;
    this.users = users;
  }
}

export default Upvote;
