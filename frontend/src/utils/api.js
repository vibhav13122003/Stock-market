import axios from "axios";

export const url = 'http://localhost:3000'

export const axiosSignin = async (formData) => await axios.post(`${url}/user/login`, formData);
export const axiosSignup = async (formData) => await axios.post(`${url}/user/register`, formData);
export const axiosPortfolioValue = async (userId) => await axios.get(`${url}/api/portfolio/${userId}/value`, );
export const axiosAddStock = async (formData) => await axios.post(`${url}/api/portfolio/add`, formData);
export const axiosUpdateStock = async (formData) => await axios.put(`${url}/api/portfolio/update`, formData);
export const axiosDeleteStock = async (formData) => {
    const { userId, ticker } = formData;
    return await axios.delete(`${url}/api/portfolio/delete`, {
        params: { userId, ticker }, // Send as query parameters
    });
};


export const axiosBuyStock = async (formData) => await axios.post(`${url}/user/register`, formData);
export const axiosSellStock = async (formData) => await axios.post(`${url}/user/register`, formData);
export const axiosAssignRandom = async (userId) => {
    if (!userId) throw new Error("User ID is required");
    return await axios.post(`${url}/api/portfolio/assign`, { userId });
};
export const getStockDataForChart=async(ticker)=>{
    return await axios.get(`${url}/api/portfolio/getStockDataForChart/${ticker}`);
}