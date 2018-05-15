import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Route, Redirect, Link} from 'react-router-dom';
import Aux from '../../hoc/Aux/Aux';
import * as actions from '../../store/actions/index';
import classes from './AdBuilder.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Label from '../../components/UI/Label/Label';
import AdDetails from '../AdDetails/AdDetails';
import Loader from '../../components/UI/Loader/Loader';

class AdBuilder extends Component {
  state = {
    newAdForm: {
      title: {
        elementType: 'input',
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
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Enter the name of your item' 
        },
        value: '',
        label: 'Item Name'
      },
      itemPrice: {
        elementType: 'input',
        elementConfig: {
          type: 'number',
          placeholder: 'Enter the Price',
          min: 1,
          step: 'any',
        },
        value: '',
        label: 'Item Price'
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
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-mail'
        },
        value: '',
        label: 'E-mail'
      },
    },
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
    updatedNewAdForm[inputID] = updatedFormElement;

    this.setState({
      newAdForm: updatedNewAdForm
    })
  }
  
  newAdSubmitHandler = (event) => {
    event.preventDefault();
    
    let ad = this.state.newAdForm;
    // for(let formElement in this.state.newAdForm) {
    //   formData[formElement] = this.state.newAdForm[formElement].value;      
    // }

    const formData = {
      title: ad.title.value,
      description: ad.description.value,
      user_attributes: {
        email: ad.email.value
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
   
   updateHistory = (id) => {
     this.props.history.push('/ads/' + id)
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
              elementConfig = {formElement.config.elementConfig}
              value={formElement.config.value}
              changed={(event) => this.inputChangedHandler(event, formElement.id)}
            />
          </Aux>     
      })}
      <Button btnType="Success">Create Ad</Button>
     </form>
   )

  let adPosted = null;
  if(this.props.adID || this.props.error){
    const postedAdRedirect = this.props.posted ? <Redirect to={`/ads/` + this.props.adID} /> : null ;
    if(postedAdRedirect){
      this.updateHistory(this.props.adID)
    }
    adPosted = (
      <div>
        {postedAdRedirect}
        {this.props.error ? this.props.message : null}        
        <Route exact path={`/ads/${this.props.adID}`} component={AdDetails}/>
      </div>
     )
   }
   return (
      <div className={classes.AdBuilder}>
        {adPosted}
        {this.props.loading ? <Loader /> : form}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.adBuilder.newAd.loading,
    posted: state.adBuilder.newAd.posted,
    adID: state.adBuilder.newAd.id,
    message: state.adBuilder.newAd.message,
    error: state.adBuilder.newAd.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createNewAd: (newAd) => dispatch(actions.createNewAd(newAd)), 
    onInitAdPost: () => dispatch(actions.adPostingInit())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdBuilder);