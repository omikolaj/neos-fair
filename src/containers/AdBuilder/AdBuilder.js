import React, {Component} from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux/Aux';

class AdBuilder extends Component {

  render(){
    return (
      <Aux>
        <p>ADD BUILDER</p>
      </Aux>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    build: state.adBuilder.build
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AdBuilder);