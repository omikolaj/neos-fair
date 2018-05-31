import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import classes from './Account.css';
import Loading from '../../components/UI/Loader/Loader';
import Button from '../../components/UI/Button/Button';
import Modal from '../../components/UI/Modal/Modal';
import EditInfo from '../../components/EditInfo/EditInfo';
import UserConsole from '../UserConsole/UserConsole';
import FlashMessage from '../Utils/FlashMessage/FlashMessage';
import checkValidity from '../Utils/Validations';
import cuid from 'cuid';
import Aux from '../../hoc/Aux/Aux';

class Account extends Component {
  state ={
    editing: false,
    displayInfo: false,
    message: null,
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

  editInfoHandler = () => {
    this.setState({editing: true, displayInfo: false, message: ''});
  }

  editCancelHandler = () => {
    this.setState({editing: false, displayInfo: false})
  }

  inputChangedHandler = (event, id) => {
    const updatedUserInfo = {
      ...this.state.userUpdateInfoForm,
      [id]: {
        ...this.state.userUpdateInfoForm[id],
        value: event.target.value,
        valid: checkValidity(event.target.value, this.state.userUpdateInfoForm[id].validation),
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
      displayInfo: true
    })
    const userForm = this.formatUserUpdateForm()
    this.props.updateUserInfo(userForm)
  }

  rechargeAccount = () => {
    this.setState({
      displayInfo: true
    })
    if(parseFloat(this.props.userInfo.wallet.substring(1)).toFixed(2) < 10000){
      this.props.rechargeAccount(this.props.userID)
    }else{
      this.setState({
        message: <FlashMessage duration={3000} key={cuid()} class='Warning1'><span>You have reached your limit</span></FlashMessage>
      })
  }
}

  render() {    
    let showUserInfo = null;
    if(this.props.loading !== true){ 
      let message = null;
      if(this.props.info !== '' && this.state.displayInfo){
        message = (
          <FlashMessage duration={3000} key={cuid()} class='Info'><span>{this.props.info}</span></FlashMessage>
        )
      }
      if(this.props.error && this.state.displayInfo){
        message = (
          <FlashMessage duration={3000} key={cuid()} class='Error'><span>{this.props.error.fail}</span></FlashMessage>
        )
      }

      if(this.props.error && !this.props.unauthorized){
        message = (
          <FlashMessage duration={3000} key={cuid()} class='Error'><span>{this.props.error.fail}</span></FlashMessage>
        )
      }
        showUserInfo = (
          <div className={classes.Account}>                      
            <h1>Account</h1>
            <div>{this.state.message || message}</div>
            <h3>Welcome {this.props.userInfo.name}</h3>
            <span>username: {this.props.userInfo.username}</span>
            <span>email: {this.props.userInfo.email}</span>
            <p>Wallet: <strong>{this.props.userInfo.wallet}</strong></p>
            <Button btnType="RechargeAccount" clicked={this.rechargeAccount}>Recharge</Button>
            <Button btnType="EditButton" clicked={this.editInfoHandler}>Edit</Button>
          </div>
        )
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

    let account = (
      <Aux>
        {showUserInfo}
        <UserConsole userID={this.props.userID}/>
      </Aux>
    )

    if(this.props.error && this.props.unauthorized){
      account = <h1>{this.props.error.fail}</h1>;
      editInfo = null;      
    }
    
    return (
      <div className={classes.Account}>
          <Modal show={this.state.editing} modalClosed={this.editCancelHandler}>
            {editInfo}
          </Modal>
          {account}
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
    userID: state.auth.userID,
    recharged: state.userInfo.recharged,
    unauthorized: state.userInfo.unauthorized
  }
}

const mapDispatchToState = (dispatch) => {
  return {
    fetchUserInfo: (userID) => dispatch(actions.fetchUserInfo(userID)),
    updateUserInfo: (userInfo) => dispatch(actions.updateUserInfo(userInfo)),
    rechargeAccount: (userID) => dispatch(actions.rechargeAccount(userID))
  }
}

export default connect(mapStateToProps, mapDispatchToState)(Account);