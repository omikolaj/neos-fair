import * as actionTypes from '../actions/actionTypes';

const initialState = {
  newAd: {
    title: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Enter display title for your ad'
      },
      value: ''
    },
    description: {
      elementType: 'textarea',
      elementConfig: {
        type: 'textarea',
        placeholder: 'Ad description'
      },
      value: ''
    },
    firstName: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Your first name'
      },
      value: ''
     },
    lastName: {
      elementType: 'input',
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
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Enter the name of your item' 
      },
      value: '',
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

const reducer = (state = initialState, action) => {
  switch(action.type){
   default: return state; 
  }
}

export default reducer;