import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import classes from './Account.css';
import Loading from '../../components/UI/Loader/Loader';
import Button from '../../components/UI/Button/Button';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../../hoc/Aux/Aux';

class Account extends Component {
  state ={
    editing: false
  }

  componentDidMount(){
    this.props.fetchUserInfo(this.props.userID)
  }

  editInfoHandler = () => {
    this.setState({editing: true});
  }

  render() {
    let userInfo = null;
    let editInfo = null;
    if(!this.props.loading){      
      userInfo = (
        <div>
          <h1>Account</h1>
          <h3>Welcome {this.props.userInfo.name}</h3>
          <p>username: {this.props.userInfo.username}</p>
          <p>email: {this.props.userInfo.email}</p>
          {/* <p>Wallet: {}</p> */}
          <Button clicked={this.editInfoHandler}>Edit</Button>
        </div>
      )
      editInfo = <EditInfo 
        userInfo={this.props.userInfo}
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
