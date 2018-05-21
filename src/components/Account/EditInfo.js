import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import Loader from '../UI/Loader/Loader';
import classes from './EditInfo.css';

class EditInfo extends Component{

  render(){
  let formElementsArray = []
  for(let key in this.props.userUpdateInfoForm){
    formElementsArray.push({
      id: key,
      config: this.props.userUpdateInfoForm[key]
    })
  }
  let editInfoForm = (
    <Aux>
      <form className={classes.Form} onSubmit={(event) => this.props.updateUserInfo(event)}>
      {formElementsArray.map(formElement => {
        debugger
        return <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={this.props.userInfo[formElement] ? this.props.userInfo[formElement].value : ''}
        changed={(event) => this.props.changed(event, formElement.id)}
        />
      })}
      </form>
      {/* <Button>Update</Button> */}
      <Button btnType="Success">Update</Button>
    </Aux>
    )

    return (
    <Aux>
      {editInfoForm}
    </Aux>
    )
  }
}

export default EditInfo;