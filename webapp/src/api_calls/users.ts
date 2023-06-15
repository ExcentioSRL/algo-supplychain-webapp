import axios from 'axios';

export async function login(email: string, password: string): Promise<T> {
    return axios.get(
        "http://localhost:3000/"
    )
}