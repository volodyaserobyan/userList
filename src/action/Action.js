export function addUser(data) {
    return {
        type: 'ADD_USER',
        user: data
    }
}

export function deleteUser(id) {
    return {
        type: 'DELETE_USER',
        id: id
    }
}

export function editUser(id, data) {
    return {
        type: 'EDIT_USER',
        user: data,
        id: id
    }
}