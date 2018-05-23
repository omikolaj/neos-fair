import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import classes from './Account.css';
import Loading from '../../components/UI/Loader/Loader';
import Button from '../../components/UI/Button/Button';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../../hoc/Aux/Aux';
import EditInfo from '../../components/Account/EditInfo';
import UserConsole from '../UserConsole/UserConsole';

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
          valid: true,
        },
        username: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Username'
          },
          value: nextProps.userInfo.username,
          validation: {
            required: true,
            minLength: 4
          },
          touched: false,
          valid: true,
        },
        email: {
          elementType: 'input',
          elementConfig: {
            type: 'email',
            placeholder: 'Email'
          },
          value: nextProps.userInfo.email,
          validation: {
            required: true,
            isEmail: true
          },
          touched: false,
          valid: true,
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
      isFormValid: false
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
    let isFormValid = true;
    for(let inputID in updatedUserInfo){
      isFormValid = updatedUserInfo[inputID].valid && isFormValid;
    }
    this.setState({
      userUpdateInfoForm: updatedUserInfo,
      isFormValid: isFormValid
    })
  }

  formatUserUpdateForm = () => {
    const userUpdatedForm = {...this.state.userUpdateInfoForm}
    let userFormattedForm = [];
    for(let key in userUpdatedForm){
      userFormattedForm.push({
        id: key,
        value: userUpdatedForm[key].value
      })
    }
    userFormattedForm.push({
      id: 'id',
      value: this.props.match.params.id
    })
    return userFormattedForm
  }

  updateUserInfoHandler = (event) => {
    event.preventDefault()
    this.setState({
      editing: false,
    })
    const userForm = this.formatUserUpdateForm()
    this.props.updateUserInfo(userForm)
  }

  render() {    
    let showUserInfo = null;
    if(this.props.loading !== true){ 
      let userInfo = [];   
        showUserInfo = (
          <div className={classes.Account}>
            {userInfo}
          </div>
        )
          userInfo.push(<h1 key='accountInfo'>Account</h1>)
          if(this.props.info !== ''){
            userInfo.push(<p key='info'>{this.props.info}</p>)
          } 
          userInfo.push(<h3 key={this.props.userInfo.name}>Welcome {this.props.userInfo.name}</h3>)
          userInfo.push(<p key='username'>username: {this.props.userInfo.username}</p>)
          userInfo.push(<p key='email'>email: {this.props.userInfo.email}</p>)
          {/* <p>Wallet: {}</p> */}
          userInfo.push(<Button key='editButton' btnType="EditButton" clicked={this.editInfoHandler}>Edit</Button>)
    }
    
    let editInfo = null;
    if(this.state.editing){
      editInfo = <EditInfo 
      updateUserInfo={(event) => this.updateUserInfoHandler(event)}
      userUpdateInfoForm={this.state.userUpdateInfoForm}
      userInfo={this.state.userUpdateInfoForm}
      isFormValid={this.state.isFormValid}
      changed={(event, id) => this.inputChangedHandler(event, id)}
    />
    }
        
    if(this.props.loading){
      showUserInfo = <Loading />
    }

    let errorMessage = null;
    if(this.props.error){
      errorMessage = (
        <p>{this.props.error.error}</p>
      )
    }
    
    return (
      <div className={classes.Account}>
        {/* <Aux>         */}
          <Modal show={this.state.editing} modalClosed={this.editCancelHandler}>
            {editInfo}
          </Modal>
          {errorMessage ? errorMessage : showUserInfo}
          <UserConsole />
        {/* </Aux> */}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo.userInfo,
    loading: state.userInfo.loading,
    error: state.userInfo.error,
    info: state.userInfo.info,
    userID: state.auth.userID    
  }
}

const mapDispatchToState = (dispatch) => {
  return {
    fetchUserInfo: (userID) => dispatch(actions.fetchUserInfo(userID)),
    updateUserInfo: (userInfo) => dispatch(actions.updateUserInfo(userInfo))
  }
}

export default connect(mapStateToProps, mapDispatchToState)(Account);
