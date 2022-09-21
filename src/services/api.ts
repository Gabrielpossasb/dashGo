import axios from "axios";

export const api = axios.create({
   baseURL: 'https://dash-go-ecru.vercel.app/api'
})