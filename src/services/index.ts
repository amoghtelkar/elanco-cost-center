import axios from "axios"
/**
 * Setting up the axios instance
 */
export const axiosInstance = axios.create({
    baseURL:process.env.REACT_APP_API
});

/**
 * To get the dropdown values 
 * @param type 'applications' || 'resources'
 * @returns dropdown vales
 */
export const getDropDownValues = async (type:string) => {
    const { data } = await axiosInstance.get(type.toLowerCase());
    return data;
} 

/**
 * Returns data belongs to application
 * @param type application
 * @returns Array of IData
 */
export const getApplicationData = async (type:string) => {
    const { data } = await axiosInstance.get(`applications/${type}`);
    return data;
}

/**
 * Returns data belongs to resource
 * @param type resource
 * @returns Array of IData
 */
export const getResourceData = async (type:string) => {
    const { data } = await axiosInstance.get(`resources/${type}`);
    return data;
}