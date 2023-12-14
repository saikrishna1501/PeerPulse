import { ObjectId } from 'mongodb'; // Assuming you are using MongoDB and ObjectId for IDs
class User {
    _id!: string;
    email!: string;
    firstName!: string;
    lastName?: string;
    phoneNumber?: string;
    profilePic!: string;
    savedEvents!: string[];
    upcomingEvents!: ObjectId[] | string[];
    role!: 'admin' | 'student';
    isValid!: boolean;
  
    constructor(
      _id: string,
      email: string,
      firstName: string,
      lastName?: string,
      phoneNumber?: string,
      profilePic: string = '',
      savedEvents: string[] = [],
      upcomingEvents: ObjectId[] | string[] = [],
      role: 'admin'  | 'student' = 'student',
      isValid: boolean = false
    ) {
      this._id = _id;
      this.email = email;
      this.firstName = firstName;
      this.lastName = lastName;
      this.phoneNumber = phoneNumber;
      this.profilePic = profilePic;
      this.savedEvents = savedEvents;
      this.role = role;
      this.isValid = isValid;
      this.upcomingEvents = upcomingEvents;
    }
  }
  
  export default User;