import { useEffect, useState } from 'react';
import UserCard from '../../components/UserCard/UserCard';
import PaginationContainer from '../../components/PaginationContainer/PaginationContainer';
import { useDispatch } from 'react-redux';
import { deleteUser, loadUsers } from '../../store/users';
import { useSelector } from 'react-redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import {RootState} from '../../store/reducer';
import { AnyAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const ManageUsersPage = () => {
    // const [listOfUsers,setListOfUsers] = useState<User[]>([]);
    const pageSize = 2;
    const [currentPage, setCurrentPage] = useState(1);
    // const [noOfPages, setTotalNoOfPages] = useState(1);
    const dispatch = useDispatch();
    const users = useSelector((state : any)=>state.entities.users.list);
    const noOfPages = useSelector((state : any)=>state.entities.users.numberOfPages);

    useEffect(() => {
        // setListOfUsers(users.users);
        dispatch(loadUsers(currentPage,pageSize));
        // setTotalNoOfPages(users.numberOfPages);
    },[]);

    const onPageChange = (clickedPage: number) => {
        // const newUsers = [...listOfUsers, {
        //     _id: "656a9421c56c68861c127ac",
        //     email: "gaddam.sai@northeastern.edu",
        //     firstName: "Dummy",
        //     lastName: "User",
        //     role: "student"
        // }]
        // setListOfUsers(newUsers);
        dispatch(loadUsers(clickedPage,pageSize));
        setCurrentPage(clickedPage);
        // setTotalNoOfPages(users.numberOfPages);
    }

    const onUserDelete = async (userId: string) => {
            try {
              dispatch(deleteUser(userId));
              setTimeout(() => dispatch(loadUsers(currentPage,pageSize)), 300);
              //dispatch(deleteUser(userId));
              // Optional: Additional logic to execute after successful deletion
              toast.success('User deleted successfully!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
            } catch (error) {
              // Handle errors, if any
              toast.error('Error Deleting User. Please try again', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
            }
        // dispatch(loadUsers(currentPage,pageSize));
        // setTimeout(() => dispatch(loadUsers(currentPage,pageSize)), 2000);
    }

    const usersList = () => {
        console.log("users", users)
        return users.map((item: any,index: any) => {
            return <UserCard key={item._id} userId={item._id} email={item.email} firstName={item.firstName} lastName={item.lastName} role={item.role} onUserDelete={onUserDelete}/>
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