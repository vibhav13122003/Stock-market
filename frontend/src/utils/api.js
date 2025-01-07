import axios from "axios";

export const url = 'http://localhost:3000'

export const axiosSignin = async (formData) => await axios.post(`${url}/user/login`, formData);
export const axiosSignup = async (formData) => await axios.post(`${url}/user/register`, formData);