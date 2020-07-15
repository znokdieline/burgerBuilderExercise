import axios from 'axios';

const Instance = axios.create({
    baseURL: 'https://react-my-burger-7d339.firebaseio.com/'
});

export default Instance;