import { simpleRestClient } from './index';
import * as fetchUtils from '../utils/fetch';

const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const token = localStorage.getItem('token');
    options.headers.set('Authorization', `JWT ${token}`);
    return fetchUtils.fetchJson(url, options);
};
export default simpleRestClient('http://0.0.0.0:8000/api/v1', httpClient);

