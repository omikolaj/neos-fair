import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import classes from './Account.css';
import Loading from '../../components/UI/Loader/Loader';
import Button from '../../components/UI/Button/Button';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../../hoc/Aux/Aux';
import EditInfo from '../../components/Account/EditInfo';

class Account extends Component {
  state ={
    editing: false
  }

  componentDidMount(){
    this.props.fetchUserInfo(this.props.userID)
  }
  
  static getDerivedStateFromProps(nextProps, prevState){
    return {
      userUpdateInfoForm: {
        name: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Name'         
          },
          value: nextProps.userInfo.name,
          validation: {
            required: true,
            minlength: 4
          },
          touched: false,
          valid: false,
        },
        username: {
          elementType: 'input',
          elementConfig: {
            type: 'text'
          },
          value: nextProps.userInfo.username,
          validation: {
            required: true,
            minLength: 6
          },
          touched: false,
          valid: false,
        },
        email: {
          elementType: 'input',
          elementConfig: {
            type: 'email'
          },
          value: nextProps.userInfo.email,
          validation: {
            required: true,
            isEmail: true
          },
          touched: false,
          valid: false,
        },
        password: {
          elementType: 'input',
          elementConfig: {
            type: 'password',
            placeholder: 'Password'
          },
          value: '',
          validation: {
            required: true,
            minLength: 6
          },
          touched: false,
          valid: false,
        },
      },
    }
  }

  checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
        return true;
    }
    
    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid
    }

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    }
    return isValid;      
  }

  editInfoHandler = () => {
    this.setState({editing: true});
  }

  editCancelHandler = () => {
    this.setState({editing: false})
  }

  inputChangedHandler = (event, id) => {
    const updatedUserInfo = {
      ...this.state.userUpdateInfoForm,
      [id]: {
        ...this.state.userUpdateInfoForm[id],
        value: event.target.value,
        valid: this.checkValidity(event.target.value, this.state.userUpdateInfoForm[id].validation),
        touched: true,
      }  
    }
    this.setState({
      userUpdateInfoForm: updatedUserInfo
    })
  }

  updateUserInfoHandler = (event) => {
    debugger
  }

  render() {    
    let userInfo = null;
    if(this.props.loading !== true){      
      userInfo = (
        <div className={classes.Account}>
          <h1>Account</h1>
          <h3>Welcome {this.props.userInfo.name}</h3>
          <p>username: {this.props.userInfo.username}</p>
          <p>email: {this.props.userInfo.email}</p>
          {/* <p>Wallet: {}</p> */}
          <Button clicked={this.editInfoHandler}>Edit</Button>
        </div>
      )
    }
    
    let editInfo = null;
    if(this.state.editing){
      editInfo = <EditInfo 
      updateUserInfo={(event) => this.updateUserInfoHandler(event)}
      userUpdateInfoForm={this.state.userUpdateInfoForm}
      userInfo={this.state.userUpdateInfoForm}
      changed={(event, id) => this.inputChangedHandler(event, id)}
    />
    }
        
    if(this.props.loading){
      userInfo = <Loading />
    }

    let errorMessage = null;
    if(this.props.error){
      errorMessage = (
        <p>{this.props.error.error}</p>
      )
    }
  
    return (
      <div className={classes.Account}>
        <Aux>        
          <Modal show={this.state.editing} modalClosed={this.editCancelHandler}>
            {editInfo}
          </Modal>
          {errorMessage ? errorMessage : userInfo}
        </Aux>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo.userInfo,
    loading: state.userInfo.loading,
    error: state.userInfo.error,
    userID: state.auth.userID
  }
}

const mapDispatchToState = (dispatch) => {
  return {
    fetchUserInfo: (userID) => dispatch(actions.fetchUserInfo(userID))
  }
}

export default connect(mapStateToProps, mapDispatchToState)(Account);
