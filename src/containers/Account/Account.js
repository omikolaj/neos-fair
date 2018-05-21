import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import classes from './Account.css';
import Loading from '../../components/UI/Loader/Loader';

class Account extends Component {

  componentDidMount(){
    this.props.fetchUserInfo(this.props.userID)
  }

  render() {
    let userInfo = null;
    if(!this.props.loading){      
      userInfo = (
        <div>
          <h1>Account</h1>
          <h3>Welcome {this.props.userInfo.name}</h3>
          <p>username: {this.props.userInfo.username}</p>
          <p>email: {this.props.userInfo.email}</p>
        </div>
      )

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
        {errorMessage ? errorMessage : userInfo}
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
