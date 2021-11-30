import axios from 'axios';

const baseURL = 'u0yo62ijdc.execute-api.us-west-2.amazonaws.com/DEV/';


const instance = axios.create({
    baseURL: `https://${baseURL}`,
    headers: {
        "Content-Type":"application/json",
        "Accept" : "application/json"
    }
  });

export default instance;
