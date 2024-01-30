export const Login =  (body) => {
    return new Promise((resolve, reject) => {
        fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
        .then(response => response.json())
        .then(result => resolve(result))
        .catch(error => reject(error));
    })
};

export const Logout = (token) => {
    return new Promise((resolve, reject) => {
        fetch('http://localhost:5000/logout', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
        .then(response => response.json())
        .then(result => resolve(result))
        .catch(error => reject(error))
    })
};

export const Register =  (body) => {
    return new Promise((resolve, reject) => {
        fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
        .then(response => response.json())
        .then(result => resolve(result))
        .catch(error => reject(error));
    })
};