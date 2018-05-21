import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import Loader from '../UI/Loader/Loader';
import classes from './EditInfo.css';

class EditInfo extends Component{

  render(){
  const userInfo = {...this.props.userInfo}
  const userInfoUpdateForm = {...this.props.userUpdateInfoForm}
  let formElementsArray = []
  for(let key in userInfoUpdateForm){
    formElementsArray.push({
      id: key,
      config: userInfoUpdateForm[key]
    })
  }
  let editInfoForm = (
    <Aux>
      <form className={classes.Form} onSubmit={(event) => this.props.updateUserInfo(event)}>
      {formElementsArray.map(formElement => {
        return <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.id ? userInfo[formElement.id] : ''}
        changed={(event) => this.props.changed(event, formElement.id)}
        />
      })}
      <Button btnType="Success">Update</Button>
      </form>
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