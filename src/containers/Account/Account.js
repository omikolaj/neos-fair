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
    userUpdateInfoForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',          
        },
        value: ''
      },
      username: {
        elementType: 'input',
        elementConfig: {
          type: 'text'
        },
        value: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'text'
        },
        value: ''
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: ''
      }
    },      
    editing: false
  }

  componentDidMount(){
    this.props.fetchUserInfo(this.props.userID)
  }

  editInfoHandler = () => {
    this.setState({editing: true});
  }

  editCancelHandler = () => {
    this.setState({editing: false})
  }

  inputChangeHandler = (event, id) => {
    debugger
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
      const userInfoForEdit = {...this.props.userInfo}
      editInfo = <EditInfo 
      updateUserInfo={(event) => this.updateUserInfoHandler(event)}
      userUpdateInfoForm={this.state.userUpdateInfoForm}
      userInfo={userInfoForEdit}
      changed={(event, id) => this.inputChangeHandler(event, id)}
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
