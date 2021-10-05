import axios from "axios" 
import baseURL from "../../configs/baseURL"
import { getNewAccessToken } from "./postServices"



export const getRecords=async (tokens)=>{

    try {
        const response = await axios.get(`${baseURL}/records`,{
            headers:{
                Authorization:"Bearer "+tokens.token
            }
        })
return response.data
        
    } catch (error) {
        const er= error.response.status
        console.log(er)
        if(er===401){
const response =await getNewAccessToken(tokens)
if(response.error){
    return response
}

        }
       
        
        // return []
        
    }

}
