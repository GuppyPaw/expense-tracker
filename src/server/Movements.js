export const getMovement = (accessToken) => {
    fetch(`http://localhost:5000/movements/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error en la solicitud GET:', error));
};

export const addMovement = (body, accessToken) => {
    fetch(`http://localhost:5000/movements/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        body : body,
    })
    .then(response => {
        if (response.ok) {
            console.log('Movimiento agregadi exitosamente');
        } else {
            console.error('Error al agregar el movimiento');
        }
    })
    .catch(error => console.error('Error en la solicitud POST:', error));
};

export const deleteMovement = (movementId, accessToken) => {
    fetch(`http://localhost:5000/movements/${movementId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
    })
    .then(response => {
        if (response.ok) {
            console.log('Movimiento eliminado exitosamente');
        } else {
            console.error('Error al eliminar el movimiento');
        }
    })
    .catch(error => console.error('Error en la solicitud DELETE:', error));
};