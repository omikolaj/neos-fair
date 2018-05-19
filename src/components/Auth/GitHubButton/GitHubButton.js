import React, {Component} from 'react';

class GitHubButton extends Component {

  componentDidMount(){
    let scriptTag = document.createElement('script');
    scriptTag.type = 'text/html';    
    scriptTag.src = 'https://github.com/login/oauth/authorize?client_id=67cb7ac47afbb2aad88e&scope=user';
    // scriptTag.addEventListener('load', e => {
    //   this.FB = window.FB;
    //   // I don't like exposing the SDK to global scope
    //   window.FB = null;

    //   this.FB.Event.subscribe('auth.statusChange', this.onStatusChange);
    // });
    document.body.appendChild(scriptTag);
  }
  
  onStatusChange = (response) => {
    debugger
    if(response.status === 'connected'){
      
    }
  }
  
  render() {
    return (
      <button>{this.props.children}</button>
    );
  }  
} 

export default GitHubButton;