import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-5c00e-default-rtdb.asia-southeast1.firebasedatabase.app/'
});

export default instance;