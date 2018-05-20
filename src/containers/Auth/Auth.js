import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect, Route} from 'react-router-dom';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Label from '../../components/UI/Label/Label';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import Loader from '../../components/UI/Loader/Loader';
import Aux from '../../hoc/Aux/Aux';
import Login from '../../components/Auth/Login/Login';
import SignUp from '../../components/Auth/Signup/Signup';
import GitHubButton from '../../components/Auth/GitHubButton/GitHubButton';

class Auth extends Component {
  state = {
    controls: {
        name: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Name'
          },
          value: '',
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
          label: 'Name',
          isSignUp: true,
        },
        email: {
          elementType: 'input',
          elementConfig: {
            type: 'email',
            placeholder: 'E-mail'
          },
          value: '',
          validation: {
            required: true,
            isEmail: true
          },
          valid: false,
          touched: false,
          label: 'E-mail',
          isSignUp: true,
          },
        username: {
          elementType: 'text',
          elementConfig: {
            type: 'text',
            placeholder: 'Username'
          },
          value: '',
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
          label: 'Username',
          isSignUp: false,
          },
        password: {
          elementType: 'text',
          elementConfig: {
            type: 'password',
            placeholder: 'Password'
          },
          value: '',
          validation: {
            required: true,
            minLength: 6,
          },
          valid: false,
          touched: false,
          label: 'Password',
          isSignUp: false,
        },
      },
      isSignUp: false,
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

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true,
      }
    }
    this.setState({
      controls: updatedControls
    })
  }

  formatData = () => {
    let formElementsArray = [];
    for (let key in this.state.controls) {
      if(this.state.isSignUp){       
          formElementsArray.push({
            id: key,
            config: this.state.controls[key]
        });           
    }else{
      if(!this.state.controls[key].isSignUp){
          formElementsArray.push({
          id: key,
          config: this.state.controls[key]
          });  
        }
      }
    }
    return formElementsArray;
  }

  submitHandler = (event) => {
    event.preventDefault();
    const formData = this.formatData();    
    this.props.onAuth(formData, this.state.isSignUp)
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {isSignUp: !prevState.isSignUp}
    })
  }

  loginAsGuestHandler = () => {
    const isSignUp="guest"
    this.props.onAuth({}, isSignUp)
  }

  initLoginGitHubHandler = () => { 
    this.props.initLoginGithub()
  }

  render() {
    const formElementsArray = this.formatData()
    let form = (
      <form className={classes.Form} onSubmit={this.submitHandler}>
      {formElementsArray.map(formElement => {
        return <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={(event) => this.inputChangedHandler( event, formElement.id )} />          
      })}
      <Button btnType="Success">{this.state.isSignUp ? 'Sign Up' : 'Login' }</Button>
      </form>
    )
    
    if(this.props.loading){
      form = <Loader />
    }

    let errorMessage = null;

    if(this.props.error){
      errorMessage = (
        <p>{this.props.error.error}</p>
      )
    }
    let authRedirect = null;
   
    return (
      <div className={classes.Auth}>
        {errorMessage}      
        {this.state.isSignUp ? <SignUp form={form}/> : <Login form={form} />}
        <Button clicked={this.switchAuthModeHandler} btnType="Success">Go to {this.state.isSignUp ? 'Login' : 'Sign Up'}</Button>
        <Button clicked={this.loginAsGuestHandler}>Login as Guest</Button>
        <Button clicked={this.initLoginGitHubHandler}>Login via GitHub</Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token != null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (userInfo, isSignUp) => dispatch(actions.auth(userInfo, isSignUp)),    
    initLoginGithub: () => dispatch(actions.initLoginGithub())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);