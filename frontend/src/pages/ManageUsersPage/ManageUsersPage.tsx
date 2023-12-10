import { useEffect, useState } from 'react';
import UserCard from '../../components/UserCard/UserCard';
import {users,UserRoles} from '../../services/UserService';
import User from "../../models/UserModel";
import PaginationContainer from '../../components/PaginationContainer/PaginationContainer';
const ManageUsersPage = () => {
    const [listOfUsers,setListOfUsers] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [noOfPages, setTotalNoOfPages] = useState(1);

    useEffect(() => {
        setListOfUsers(users.users);
        setTotalNoOfPages(users.numberOfPages);
    },[]);

    const onPageChange = (clickedPage: number) => {
        const newUsers = [...listOfUsers, {
            _id: "656a9421c56c68861c127ac",
            email: "gaddam.sai@northeastern.edu",
            firstName: "Dummy",
            lastName: "User",
            role: "student"
        }]
        setListOfUsers(newUsers);
        setCurrentPage(clickedPage);
        setTotalNoOfPages(users.numberOfPages);
    }

    const usersList = () => {
        return listOfUsers.map((item,index) => {
            return <UserCard key={item._id} userId={item._id} email={item.email} firstName={item.firstName} lastName={item.lastName} role={item.role}/>
        })
    }

    return (
        <>
        {usersList()}
        <PaginationContainer onPageChange={onPageChange} currentPage={currentPage} noOfPages={noOfPages}></PaginationContainer>
        </>
        // <UserCard userId="1234" email='saikrishna1501@gmail.com' firstName='sai' lastName='gaddam' role='admin'/>
    )
}

export default ManageUsersPage;