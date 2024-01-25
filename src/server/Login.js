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

export const logout = () => {
    try {
        fetch('http://localhost:5000/logout', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        }).then(response => {
            if (response.ok) {
                console.log('Logout exitoso');
            } else {
                console.error('Error en el logout:', response.json());
            }
        });
    } catch (error) {
        console.error('Error en la solicitud de logout:', error);
    }
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