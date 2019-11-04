import React from 'react';
import '../userList/userlist.css';
import { connect } from 'react-redux';
import { addUser, userList } from '../../action/Action';
import Loader from 'react-loader-spinner';
import Items from '../items/items';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import UserInfo from '../handleUser/handleUser'
import addUserImg from '../../images/download.png'
import { Link } from 'react-router-dom';
let _ = require('lodash');

const UserList = ({reducer}) => {
        return (
            <div className='container'>
                <div className='chiledContainer'>
                    <p className='title'><strong>Users</strong></p>
                    {!_.isEmpty(reducer) ? reducer.map((item, i) =>
                        <Items key={item.id}
                            id={i}
                            name={item.name}
                            surName={item.surName}
                            mail={item.mail}
                            phoneNumber={item.phoneNumber}
                            address={item.address}
                            dateBirth={item.dateBirth} />
                    )
                :
                <></>}
                </div>
                <Link 
                    to={{
                        pathname: 'adduser',
                        state: {
                            isEditable: true,
                            addUser: true
                        }}} className='link'>
                            <div className='containerAddUser'>
                                <p>ADD USER</p> <img src={addUserImg} className='addUser' />
                            </div>
                </Link>
            </div>
        )
}

const mapStateToProps = state => {
    if (_.isEmpty(state)) {
        return {
            ...state
        };
    }
    else {

        return {
            reducer: state,
        };
    }
}

export default connect(mapStateToProps)(UserList);