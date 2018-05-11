import React, {Component} from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux/Aux';
import * as actions from '../../store/actions/index';
import classes from './AdBuilder.css';
import Input from '../../components/UI/Input/Input';

class AdBuilder extends Component {
  state = {
    newAd: {
      title: {
        elementType: 'text',
        elementConfig: {
          type: 'text',
          placeholder: 'Display title for your ad'
        },
        value: ''
      },
      description: {
        elementType: 'text',
        elementConfig: {
          type: 'textarea',
          placeholder: 'Ad description'
        },
        value: ''
      },
      firstName: {
        elementType: 'text',
        elementConfig: {
          type: 'text',
          placeholder: 'Your first name'
        },
        value: ''
       },
      lastName: {
        elementType: 'text',
        elementConfig: {
          type: 'text',
          placeholder: 'Your last name'
        },
      value: ''
      },
      email: {
        elementType: 'email',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-mail'
        },
        value: '',
      },
      itemName: {
        elementType: 'text',
        elementConfig: {
          type: 'text',
          placeholder: 'Enter the name of your item' 
        },
        value: '',
      },
      itemCondition: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'new', displayValue: 'New'},
            {value: 'used', displayValue: 'Used'},
          ]
        },
        value: 'new'
      }, 
      category: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'test', displayValue: 'Test Category'}
          ]
        },
        value: 'test' 
      }   
    }
  }

  componentDidMount(){

  }

  inputChangedHandler = (event, inputID) => {

  }
  
  newAdSubmitHandler = (event) => {

  }

  

 render(){
   const formElementsArray = [];
   for (let key in this.state.newAd){
     formElementsArray.push({
       id: key, // i.e title, description etc...
       config: this.state.newAd[key] // everything inside title
     })
   }
   let form = (
     <form className={classes.Form} onSubmit={this.newAdSubmitHandler}>
      {formElementsArray.map(formElement => {                
          return <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig = {formElement.config.elementConfig}
          value={formElement.config.value}
          changed={(event) => this.inputChangedHandler(event, formElement.id)}
      />
      })}
     </form>
   )    
   return (
      <Aux>
        <div className={classes.AdBuilder}>
          {form}
        </div>
      </Aux>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchNewAd: () => dispatch(actions.fetchNewAd())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AdBuilder);