import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://bunbunburgers-1234-default-rtdb.firebaseio.com/',
});

export default instance;