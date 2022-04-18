import axios from 'axios';

const BACKEND_URL = 'http://localhost:8000';

class ApiCall{
    async addStudent(student){
        return await axios.post(BACKEND_URL+"/add", student);
    }

    async getAllStudent(){
        return await axios.get(BACKEND_URL+"/getAll",);
        // return await axios.get(BACKEND_URL+"/getAll",{header:{"x-access-token":localStorage.getItem("item")}});
    }

    async editStudent(id, student){
        return await axios.put(BACKEND_URL+`/edit/${id}`, student);
    }

    async getStudentUsingId(id){
        return await axios.get(BACKEND_URL+`/${id}`);
    }

    async deleteStudent(id){
        return await axios.delete(BACKEND_URL+`/delete/${id}`);
    }
}

export default new ApiCall();