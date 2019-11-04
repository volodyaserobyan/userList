import React from 'react';
import '../items/items.css';
import deleteImg from '../../images/47-512.png';
import editImg from '../../images/120704-200.png';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteUser } from '../../action/Action';

const Items = ({deleteUsers, id, name, surName, mail, phoneNumber, address, dateBirth}) => {

    //Deleting users
   const deleteUser = () => {
        deleteUsers(id)
    }
        return (
            <div className='items'>
                <div className='info'>
                    <span><strong>Name: </strong>{name}</span>
                    <span><strong>S-Name: </strong>{surName}</span>
                    <span><strong>mail: </strong>{mail}</span>
                    <Link to={{
                        pathname: `users/id/${id}`,
                        state: {
                            isEditable: false,
                            id: id,
                            name: name,
                            surName: surName,
                            mail: mail,
                            phoneNumber: phoneNumber,
                            address: address,
                            dateBirth: dateBirth
                        }
                    }} className='link'>
                        <span><strong>See more...</strong></span>
                    </Link>
                </div>
                <div className='marks'>
                    <img src={deleteImg} onClick={deleteUser} className='deleteImg' />

                    <Link to={{
                        pathname: `users/id/${id}/edit`,
                        state: {
                            isEditable: true,
                            id: id,
                            name: name,
                            surName: surName,
                            mail: mail,
                            phoneNumber: phoneNumber,
                            address: address,
                            dateBirth: dateBirth
                        }
                    }} className='link'>
                        <img src={editImg} className='editImg' />
                    </Link>
                </div>
            </div>
        )
}

const mapDispatchToProps = dispatch => {
    return {
        deleteUsers: (id) => dispatch(deleteUser(id))
    }
}

export default connect(null, mapDispatchToProps)(Items);