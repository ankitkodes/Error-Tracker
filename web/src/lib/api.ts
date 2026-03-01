import axios from "axios";

export async function fetchData(url:string){
    const response = await axios({
        method:'GET',
        url:url  
    });
    return response.data;
}