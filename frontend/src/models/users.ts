class User {
    _id!: string;
    email!: string;
    firstName!: string;
    lastName?: string;
    phoneNumber?: string;
    profilePic!: string;
    savedEvents!: string[];
    role!: 'admin' | 'moderator' | 'student';
    isValid!: boolean;
  
    constructor(
      _id: string,
      email: string,
      firstName: string,
      lastName?: string,
      phoneNumber?: string,
      profilePic: string = '',
      savedEvents: string[] = [],
      role: 'admin' | 'moderator' | 'student' = 'student',
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
    }
  }
  
  export default User;
  