import axios from 'axios';

const instance = axios.create(
    {
        baseURL: 'https://logiclike.com'
    }
)

export const getApi = {
    getItems(){
        return instance.get('/docs/courses.json')
    }
}