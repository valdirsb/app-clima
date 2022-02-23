import axios from "axios";

const baseUrl = 'http://api.openweathermap.org/data/2.5';

const api = axios.create({
 baseURL: baseUrl,
});

export default api