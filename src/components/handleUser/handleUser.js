import React from 'react';
import './handleUser.css';
import { connect } from 'react-redux';
import { addUser, editUser } from '../../action/Action';
import { Redirect } from 'react-router-dom';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
let _ = require('lodash');

class HandleUser extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            name: props.location.state != undefined ? props.location.state.name : localStorage.getItem('name'),
            surName: props.location.state != undefined ? props.location.state.surName : localStorage.getItem('surName'),
            mail: props.location.state != undefined ? props.location.state.mail : localStorage.getItem('mail'),
            phoneNumber: props.location.state != undefined ? props.location.state.phoneNumber : localStorage.getItem('phoneNumber'),
            address: props.location.state != undefined ? props.location.state.address : localStorage.getItem('address'),
            dateBirth: props.location.state != undefined ? props.location.state.dateBirth : localStorage.getItem('dateBirth'),
            isFilled: false,
            errors: {}
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleValidation = () => {
        let errors = {};
        let formIsValid = true;

        //Name
        if(typeof this.state.name !== undefined){
           if(!this.state.name.match(/^[a-zA-Z]+$/) || this.state.name[0] != this.state.name[0].toUpperCase()){
              formIsValid = false;
              errors.name = "Only letters with capital 1st letter";
           }
        }

        //Surname
        if(typeof this.state.surName !== undefined){
            if(!this.state.surName.match(/^[a-zA-Z]+$/) || this.state.surName[0] != this.state.surName[0].toUpperCase()){
               formIsValid = false;
               errors.surName = "Only letters with capital 1st letter";
            }
         }

        //mail
        if(typeof this.state.mail !== undefined){
           let lastAtPos = this.state.mail.lastIndexOf('@');
           let lastDotPos = this.state.mail.lastIndexOf('.');

           if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.mail.indexOf('@@') == -1 && lastDotPos > 2 && (this.state.mail.length - lastDotPos) > 2)) {
              formIsValid = false;
              errors.mail = "Email is not valid";
            }
       }  

       this.setState({errors: errors});
       return formIsValid;
   }

    handleClick = (e) => {
        e.preventDefault();
        if(this.handleValidation()){
            this.setState({
                isFilled: true
            })
            const info = {
                id: this.props.location.state.id + 1, 
                name: this.state.name,
                surName: this.state.surName,
                mail: this.state.mail,
                phoneNumber: this.state.phoneNumber,
                address: this.state.address,
                dateBirth: this.state.dateBirth
            }
            if(this.props.location.state.addUser){
                //Add User Case
                this.props.addUsers(info)
            }else{
                //Edit User Case
                this.props.editUsers(this.props.location.state.id ,info)
            }
        }
        else {
            alert('Please Fix Errors')
        }
    }

    render() {
        if(this.state.isFilled) {
            return(
                <Redirect to={{pathname: '/'}} />
            )
        }
        return (
            <div className='userInformation'>
                {this.props.location.state.isEditable ?
                    <form onSubmit={this.handleClick} className='editDiv'>
                            <div className='smallContainer'>
                                <strong>Name: </strong><input required name='name' value={this.state.name} onChange={this.handleChange} />
                            {!this.state.errors.name ? <></> : <span style={{color: "red"}}>{this.state.errors.name}</span>}
                            </div>
                        <div className='smallContainer'>
                            <strong>S-Name: </strong><input required name='surName' value={this.state.surName} onChange={this.handleChange} />
                        {!this.state.errors.surName ? <></> : <span style={{color: "red"}}>{this.state.errors.surName}</span>}
                        </div>
                        <div className='smallContainer'>
                            <strong>mail: </strong><input required name='mail' value={this.state.mail} onChange={this.handleChange} />
                        {!this.state.errors.mail ? <></> : <span style={{color: "red"}}>{this.state.errors.mail}</span>}
                        </div>
                        <div className='smallContainer'>
                            <strong>Phone Number: </strong><PhoneInput placeholder="Enter phone number" value={ this.state.phoneNumber } required onChange={ phoneNumber => this.setState({ phoneNumber }) } />
                        </div>
                        <div className='smallContainer'>
                            <strong>Address: </strong><input required name='address' value={this.state.address} onChange={this.handleChange} />
                        </div>
                        <div className='smallContainer'>
                            <strong>Date of Birth: </strong><input required type='date' name='dateBirth' value={this.state.dateBirth} onChange={this.handleChange} />
                        </div>
                        <input type='submit' className='editButton' />
                    </form>
                    :
                    <>
                        <span><strong>Id: </strong>{this.props.location.state.id}</span>
                        <span><strong>Name: </strong>{this.state.name}</span>
                        <span><strong>S-Name: </strong>{this.state.surName}</span>
                        <span><strong>mail: </strong>{this.state.mail}</span>
                        <span><strong>Phone Number: </strong>{this.state.phoneNumber}</span>
                        <span><strong>Address: </strong>{this.state.address}</span>
                        <span><strong>Date of Birth: </strong>{this.state.dateBirth}</span>
                    </>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    if (_.isEmpty(state)) {
        return {
            ...state
        };
    }
    else {

        return {
            editUsersReducer: state.editUsersReducer,
        };
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addUsers: (data) => dispatch(addUser(data)),
        editUsers: (id, data) => dispatch(editUser(id, data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HandleUser);