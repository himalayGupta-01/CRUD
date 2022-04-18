import axios from 'axios';

const BACKEND_URL = 'http://localhost:8000';

class LoginCall{
    async register(user){
        return await axios.post(BACKEND_URL+"/registerUser", user);
    }

    async login(user){
        return await axios.post(BACKEND_URL+"/loginUser", user );
    }

    async logout(){
        return await axios.post(BACKEND_URL+"/logoutUser",{});
    }
    
}

export default new LoginCall();