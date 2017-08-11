/**
 * API utilities
 * Utility functions for API requests and responses
 */

// Get CSRF cookie
export const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
};

export const getQueryString = (params) => {
    let esc = encodeURIComponent;
    return Object.keys(params)
        .map(k => esc(k) + '=' + esc(params[k]))
        .join('&');
};

export const getLastPathParam = (url) =>
    url.split('/')
        .filter(feature => feature !== '')
        .pop()

export const getParameterByName = (name, url) => {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const csrftoken = getCookie('csrftoken');

// Returns a Request object decorated with auth headers
export const createApiRequest = ({
    endpoint,
    body,
    params,
    method,
    url,
    type = 'application/json',
    responseType = 'application/json',
    bust = false
}) => {
    if (bust) {
        params = {};
        params.cachebuster = Math.round(new Date().getTime() / 1000);
    }

    let queryString = params
        ? `?${getQueryString(params)}`
        : '';

    if (!url) {
        let loc = getLocationObject();
        // TODO: Consider making API version an argument/setting
        url = `${loc.protocol}//${loc.host}${loc.port ? ':' + 8000 : ''}/api/v1/${endpoint}/`
    }

    url += queryString;

    let requestObj = {
        method: method || 'GET',
        headers: {
            'X-CSRFToken': csrftoken
        },
        credentials: 'include',
        accept: responseType,
        cache: 'default'
    };

    if (type !== 'multipart/form-data') {
        requestObj.headers['Content-Type'] = type
    }

    if (method === 'POST' || method === 'PATCH' && body) {
        switch (type) {
            case 'multipart/form-data':
                if (body.constructor === FormData) {
                    requestObj['body'] = body;
                } else {
                    let formData = new FormData();
                    Object.keys(body).map(key => formData.append(key, body[key]));
                    requestObj['body'] = formData;
                }
                break;
            case 'application/x-www-form-urlencoded':
                requestObj['body'] = getQueryString(body);
                break;
            default:
                requestObj['body'] = JSON.stringify(body);
        }
    }
    return new Request(url, requestObj);
}

// Plain and simple url request
export const urlRequest = (url, type = 'application/json') => {
    let requestObj = {
        method: 'GET',
        headers: {
            'Content-Type': type,
            'X-CSRFToken': csrftoken
        },
        credentials: 'include',
        accept: type,
        cache: 'default'
    };

    return new Request(url, requestObj);
}

// Dispatches a fetch request and verifies the response code before resolving the JSON response
// TODO: think of a better name for this
export const safeFetch = (request) => {
    return new Promise((resolve, reject) =>
        fetch(request)
            .then(checkResponseStatus)
            .then(resolve)
            .catch(reject)
    );
};

// Handle API responses based on HTTP response status codes
export const checkResponseStatus = (response) => {
    let contentType = response.headers.get('content-type') || 'application/json';
    // TODO: This is overly simplistic. Check for more status codes
    debugger;
    if (response.status === 204) return;
    if (response.status < 400) return processResponse(response, contentType);
    return processResponse(response, contentType).then(processedResponse => {
        errorLogger(processedResponse);
        return Promise.reject({
            status: response.status,
            content: processedResponse
        })
    });
}

// Decide what to do with a response based on its content type
const processResponse = (response, contentType) => {
    switch (contentType) {
        case 'application/json':
            return response.json();
        case 'text/html':
        case 'text/html; charset=utf-8':
            return response.text();
        case 'application/pdf':
            return response.blob().then((blob) => downloadPDF(blob, response));
        default:
            return response.json()
    }
}

// Automatically trigger a PDF download
const downloadPDF = (blob, response) => {
    let fileName = [...response.headers]
        .find(i => i[0] === 'content-disposition')[1]
        .split('"')
        .filter(i => i !== '')
        .pop();

    if (typeof window.navigator.msSaveBlob === 'function') {
        window.navigator.msSaveBlob(blob, fileName);
    } else {
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;

        document.body.appendChild(link);
        link.click();
    }
}

const errorLogger = (response) => {
    console.log('API ERROR:', response)
};

export const getLocationObject = () => ({
    protocol : window.location.protocol,
    host : window.location.hostname,
    port : window.location.port
});


