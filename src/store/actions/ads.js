import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchAds = () => {
  return dispatch => {
    fetch('/api/ads')
    .then(resp=>resp.json())
    .then(data=>{
      debugger
    })
  }
}