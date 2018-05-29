import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Route, Redirect} from 'react-router-dom';
import Aux from '../../hoc/Aux/Aux';
import * as actions from '../../store/actions/index';
import classes from './AdBuilder.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Label from '../../components/UI/Label/Label';
import AdDetails from '../AdDetails/AdDetails';
import Loader from '../../components/UI/Loader/Loader';
import checkValidity from '../Utils/Validations';
import FlashMessage from 'react-flash-message';

class AdBuilder extends Component {
  state = {
    newAdForm: {
      title: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Display title for your ad',
          maxLength: 30
        },
        value: '',
        label: 'Ad Title',
        validations: {
          required: true,
          minLength: 2,
          maxLength: 30
        },
        valid: false,
        touched: false
      },
      description: {
        elementType: 'textarea',
        elementConfig: {
          type: 'textarea',
          placeholder: 'Ad description'
        },
        value: '',
        label: 'Ad Description',
        validations: {
          required: true,
          minLength: 2
        },
        valid: false,
        touched: false
      },
      itemName: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Enter the name of your item' 
        },
        value: '',
        label: 'Item Name',
        validations: {
          required: true,
          minLength: 2
        },
        valid: false,
        touched: false
      },
      itemPrice: {
        elementType: 'input',
        elementConfig: {
          type: 'number',
          placeholder: 'Enter the Price',
          min: 1,
          max: 5000,
          step: 'any'
        },
        value: '',
        label: 'Item Price',
        validations: {
          required: true,
          isPrice: true,
          maxLength: 7
        },
        valid: false,
        touched: false
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
        label: 'Condition',
        validation: {},
        valid: true
      }, 
      category: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'toys', displayValue: 'Toys'},
            {value: 'electronics', displayValue: 'Electronics'},
            {value: 'automobiles', displayValue: 'Automobiles'},
            {value: 'clothes', displayValue: 'Clothes'},
            {value: 'services', displayValue: 'Services'},
            {value: 'Parts', displayValue: 'Parts'},
            {value: 'Other', displayValue: 'Other'},
          ]
        },
        value: 'test' ,
        label: 'Category',
        validation: {},
        valid: true
      },
    },
    isFormValid: false,
  }  

  componentWillUnmount(){
    this.props.onInitAdPost()
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
    updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validations)
    updatedFormElement.touched = true;
    updatedNewAdForm[inputID] = updatedFormElement;

    let isFormValid = true;
    for(let inputID in updatedNewAdForm){
      isFormValid = updatedNewAdForm[inputID].valid && isFormValid
    }

    this.setState({
      newAdForm: updatedNewAdForm,
      isFormValid: isFormValid
    })
  }
  
  newAdSubmitHandler = (event) => {
    event.preventDefault();
    
    let ad = this.state.newAdForm;
    const formData = {
      title: ad.title.value,
      description: ad.description.value,
      user_attributes: {
        id: this.props.userID
      },
      item_attributes: {
        title: ad.itemName.value,
        condition: ad.itemCondition.value
      },
      ad_item_attributes: {
        price: ad.itemPrice.value
      },
      category_attributes: {
        name: ad.category.value
      }
    }

    const newAd = {
      ad: formData
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
          return <Aux key={formElement.id}>
            <Label labelFor={formElement.id}>{formElement.config.label}</Label>
            <Input                        
              elementType={formElement.config.elementType}
              elementConfig ={formElement.config.elementConfig}
              value={formElement.config.value}
              touched={formElement.config.touched}
              invalid={!formElement.config.valid}
              changed={(event) => this.inputChangedHandler(event, formElement.id)}
            />
          </Aux>     
      })}
      <Button disabled={!this.state.isFormValid} btnType="CreateAd">Create Ad</Button>
     </form>
   )

  let adPosted = null;
  if(this.props.adID || this.props.error){
    const postedAdRedirect = this.props.posted ? <Redirect to={`/ads/` + this.props.adID} /> : null ;
    adPosted = (
      <div>
        {postedAdRedirect}                
        <Route exact path={`/ads/${this.props.adID}`} component={AdDetails}/>
      </div>
     )
   }
   let errors = null;
   if(this.props.validations.length > 0){
    errors = this.props.validations.map((msg, index) => {
      return <FlashMessage duration={3000}><span key={index}>{msg}</span></FlashMessage>      
      }
    )   
   }

   const adForm = this.props.loading ? <Loader /> : form;
   return (
      <div className={classes.AdBuilder}>        
        {errors}        
        {adPosted}
        {this.props.isAuthenticated ? adForm : <Redirect to="/" />}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.adBuilder.newAd.loading,
    posted: state.adBuilder.newAd.posted,
    adID: state.adBuilder.newAd.id,
    validations: state.adBuilder.newAd.validations,
    error: state.adBuilder.newAd.error,
    isAuthenticated: state.auth.token != null,
    userID: state.auth.userID
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createNewAd: (newAd) => dispatch(actions.createNewAd(newAd)), 
    onInitAdPost: () => dispatch(actions.adPostingInit())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdBuilder);