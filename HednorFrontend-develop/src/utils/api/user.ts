
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";
interface User {
    id: string;
    displayName: string;
    userRole: UserRole;
    avatarUrl: string | null;
    email: string;
}
enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER',
}


const getCurrentUser = () => {
    const token = useSelector((state: any) => state.auth.token);
    const {data,isLoading,isError}=useQuery({
        queryKey:['user'],
        queryFn:async()=> {
                const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`,{
                headers:{
                    Authorization: `Bearer ${token}`,
                }
            })
            return data as User
        },
        enabled: !!token, 
        staleTime: 0, 
    })
  return {
    data,
    isLoading,
    isError,
  }
};
export default getCurrentUser;
