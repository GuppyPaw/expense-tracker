export const getMovement = (accessToken) => {
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:5000/movements`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        })
        .then(response => response.json())
        .then(data => resolve(data))
        .catch(error => reject(error))
    });
};

export const addMovement = (body, accessToken) => {
    console.log('body',body)
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:5000/movements`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body : JSON.stringify(body),
        })
        .then(response => response.json())
        .then(result => resolve(result))
        .catch(error => reject(error));
    });
};

export const deleteMovement = (movementId, accessToken) => {
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:5000/movements/${movementId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        })
        .then(response => response.json())
        .then(result => resolve(result))
        .catch(error => reject(error));
    });
};

export const getCategories = (accessToken) => {
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:5000/categories`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        })
        .then(response => response.json())
        .then(data => resolve(data))
        .catch(error => reject(error))
    });
};

export const getMovementsTotal = (accessToken) => {
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:5000/movements_total`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        })
        .then(response => response.json())
        .then(data => resolve(data))
        .catch(error => reject(error))
    });
};