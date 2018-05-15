import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Label from '../../components/UI/Label/Label';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';

class Auth extends Component {
  state = {
    controls: {
      // firstName: {
      //   elementType: 'input',
      //   elementConfig: {
      //     type: 'text',
      //     placeholder: 'Your first name'
      //   },
      //   value: '',
      //   validation: {
      //     required: true,
      //   },
      //   valid: false,
      //   touched: false,
      //   label: 'First Name'
      //  },
      // lastName: {
      //   elementType: 'input',
      //   elementConfig: {
      //     type: 'text',
      //     placeholder: 'Your last name'
      //   },
      // value: '',
      // validation: {
      //   required: true,
      // },
      // valid: false,
      // touched: false,
      // label: 'Last Name'
      // },
      // email: {
      //   elementType: 'input',
      //   elementConfig: {
      //     type: 'email',
      //     placeholder: 'Your E-mail'
      //   },
      //   value: '',
      //   validation: {
      //     required: true,
      //     isEmail: true
      //   },
      //   valid: false,
      //   touched: false,
      //   label: 'E-mail'
      //   },
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
        label: 'Username'
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
        label: 'Password'
        },
        isSignUp: true,
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

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email, this.state.controls.password)
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {isSignUp: !prevState.isSignUp}
    })
  }

  render() {
    const formElementsArray = [];
    for ( let key in this.state.controls ) {
        formElementsArray.push( {
            id: key,
            config: this.state.controls[key]
        } );
    }

    let form = formElementsArray.map(formElement => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={(event) => this.inputChangedHandler( event, formElement.id )} />
    ))

    return (
      <div>
        <form className={classes.Form} onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">Create Account</Button>
        </form>
        <Button on btnType="Success">Login In</Button>    
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password) => dispatch(actions.auth(email, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);