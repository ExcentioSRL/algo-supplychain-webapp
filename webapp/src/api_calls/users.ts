import axios from 'axios';

export async function login(email: string, password: string) : Promise<any> {
    return await axios.get(
        "http://localhost:3000/users/login?email=" + email + "&password=" + password
    )
}

export async function logout() : Promise<any>{
    return await axios.get(
        "http://localhost:3000/users/logout"
    )
}