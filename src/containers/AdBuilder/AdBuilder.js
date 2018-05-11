import React, {Component} from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux/Aux';
import * as actions from '../../store/actions/index';
import classes from './AdBuilder.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Label from '../../components/UI/Label/Label';

class AdBuilder extends Component {
  state = {
    newAdForm: {
      title: {
        elementType: 'text',
        elementConfig: {
          type: 'text',
          placeholder: 'Display title for your ad'
        },
        value: '',
        label: 'Ad Title'
      },
      description: {
        elementType: 'textarea',
        elementConfig: {
          type: 'textarea',
          placeholder: 'Ad description'
        },
        value: '',
        label: 'Ad Description'
      },
      itemName: {
        elementType: 'text',
        elementConfig: {
          type: 'text',
          placeholder: 'Enter the name of your item' 
        },
        value: '',
        label: 'Item Name'
      },
      itemCondition: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'new', displayValue: 'New'},
            {value: 'used', displayValue: 'Used'},
          ]
        },
        value: 'new',
        label: 'Condition'
      }, 
      category: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'test', displayValue: 'Test Category'}
          ]
        },
        value: 'test' ,
        label: 'Category'
      },
      // firstName: {
      //   elementType: 'text',
      //   elementConfig: {
      //     type: 'text',
      //     placeholder: 'Your first name'
      //   },
      //   value: '',
      //   label: 'First Name'
      //  },
      // lastName: {
      //   elementType: 'text',
      //   elementConfig: {
      //     type: 'text',
      //     placeholder: 'Your last name'
      //   },
      // value: '',
      // label: 'Last Name'
      // },
      email: {
        elementType: 'email',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-mail'
        },
        value: '',
        label: 'E-mail'
      }   
    }
  }

  componentDidMount(){

  }

  // inputID = email , category on the newAdForm etc.
  inputChangedHandler = (event, inputID) => {
    const updatedNewAdForm = {
      ...this.state.newAdForm
    };
    const updatedFormElement = {
      ...updatedNewAdForm[inputID]
    };
    updatedFormElement.value = event.target.value;
    updatedNewAdForm[inputID] = updatedFormElement;

    this.setState({
      newAdForm: updatedNewAdForm
    })
  }
  
  newAdSubmitHandler = (event) => {
    event.preventDefault();
    
    const formData = {};
    for(let formElement in this.state.newAdForm) {
      formData[formElement] = this.state.newAdForm[formElement].value;
    }
    const newAd = {
      newAdData: formData
    };

    this.props.createNewAd(newAd);

   }

  

 render(){
   const formElementsArray = [];
   for (let key in this.state.newAdForm){
     formElementsArray.push({
       id: key, // i.e title, description etc...
       config: this.state.newAdForm[key] // everything inside title
     })
   }
   let form = (
     <form className={classes.Form} onSubmit={this.newAdSubmitHandler}>
      {formElementsArray.map(formElement => {                
          return <Aux>
            <Label labelFor={formElement.id}>{formElement.config.label}</Label>
            <Input
              key={formElement.id}          
              elementType={formElement.config.elementType}
              elementConfig = {formElement.config.elementConfig}
              value={formElement.config.value}
              changed={(event) => this.inputChangedHandler(event, formElement.id)}
            />
          </Aux>     
      })}
      <Button btnType="Success">Create Ad</Button>
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