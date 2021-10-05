import axios from "axios" 
import baseURL from "../../configs/baseURL"
import cookie from 'js-cookie'

export const addNewRecord=async (record)=>{

    try {
        const response = await axios.post(`${baseURL}/records`,record)
return response.data
        
    } catch (error) {
        console.log(error.response.data)
        
    }

}

export const getNewAccessToken=async (tokens)=>{

    try {
        const refreshToken = cookie.get("refreshToken")
        console.log("refresh"+refreshToken)
        const response = await axios.post(`${baseURL}/auth/renew-token`,tokens)
console.log(response)
return response.data
        
    } catch (error) {
        console.log("Renew token")
        console.log(error.response.data)
        return {error:{message:"goto login"}}
        
    }

}

export const logAdmin=async (data)=>{

    try {
        const response = await axios.post(`${baseURL}/auth/login`,data)

return response.data
        
    } catch (error) {
        console.log(error.response.data)
        
    }

}


