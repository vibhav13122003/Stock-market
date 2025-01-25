import axios from "axios";

export const url = 'http://localhost:5000'

export const axiosSignin = async (formData) => await axios.post(`${url}/user/login`, formData);
export const axiosSignup = async (formData) => await axios.post(`${url}/user/register`, formData);
export const axiosSubmissions = async () => await axios.get(`${url}/user/submissions`);
export const axiosAddSubmission = async (formData) => await axios.post(`${url}/user/addsubmission`, formData);
export const axiosUpdateSubmission = async (formData,id) => await axios.put(`${url}/user/updatesubmission/${id}`, formData);

