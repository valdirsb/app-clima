import axios from "axios";

const baseUrl = 'https://api.openweathermap.org/data/2.5';

const api = axios.create({
 baseURL: baseUrl,
});

export default api