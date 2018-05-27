import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
  ads: [],
  ad: {
    title: '',
    description: '',    
    user: {},
    item: {},
    category: {},
    ad_item: {}
  },
  loading: false,
  error: null
}

const fetchAdsStart = (state, action) => {  
  return {
    ads: [...state.ads],
    ad: {
      ...state.ad,     
      user: {
        ...state.ad.user
      },
      item: {
        ...state.ad.item
      },
      category: {
        ...state.ad.category
      },
      ad_item: {
        ...state.ad.ad_item
      }
    },
    loading: true,
    error: null
  }
}

const fetchAdsSuccess = (state, action) => {
  const updatedAds = action.ads.filter(freshAd=>{
    return state.ads.map(currentAd=>{
      if(freshAd.id!==currentAd.id){
        return freshAd
      }
    })
  })
  return {
    ads: [...updatedAds],
    ad: {
      ...state.ad,      
      user: {
        ...state.ad.user
      },
      item: {
        ...state.ad.item
      },
      category: {
        ...state.ad.category
      },
      ad_item: {
        ...state.ad.ad_item
      }
    },
    loading: false,
    error: null
  }
}

const fetchAdsFail = (state, action) => {
  return {
    ads: [...state.ads],
    ad: {
      ...state.ad,     
      user: {
        ...state.ad.user
      },
      item: {
        ...state.ad.item
      },
      category: {
        ...state.ad.category
      },
      ad_item: {
        ...state.ad.ad_item
      }
    },
    loading: false,
    error: action.payload.error
  }
}

const fetchAdStart = (state, action) => {
  return {
    ads: [...state.ads],
    ad: {
      ...state.ad, 
      user: {
        ...state.ad.user
      },
      item: {
        ...state.ad.item
      },
      category: {
        ...state.ad.category
      },
      ad_item: {
        ...state.ad.ad_item
      }
    },
    loading: true,
    ...state.error
  }
}

const fetchAdSuccess = (state, action) => {
  return {
    ads: [...state.ads],
    ad: {
      ...action.ad, 
      user: {
        ...action.ad.user
      },
      item: {
        ...action.ad.item
      },
      category: {
        ...action.ad.category
      },
      ad_item: {
        ...action.ad.ad_item
      }
    },
    loading: false,
    ...state.error
  }
}

const fetchAdFail = (state, action) => {
  return {
    ads: [...state.ads],
    ad: {    
      ...state.ad,    
      user: {
        ...state.ad.user
      },
      item: {
        ...state.ad.item
      },
      category: {
        ...state.ad.category
      },
      ad_item: {
        ...state.ad.ad_item
      }
    },
    loading: false,
    error: action.payload.error
  }
}

const payForItemStart = (state, action) => {
  return {
    ads: [...state.ads],
    ad: {
      ...state.ad, 
      user: {
        ...state.ad.user
      },
      item: {
        ...state.ad.item
      },
      category: {
        ...state.ad.category
      },
      ad_item: {
        ...state.ad.ad_item
      }
    },
    loading: true,
    error: null
  }
}

const payForItemSuccess = (state, action) => {
  debugger
  return {
    ads: [...state.ads],
    ad: {
      ...state.ad, 
      user: {
        ...state.ad.user
      },
      item: {
        ...state.ad.item
      },
      category: {
        ...state.ad.category
      },
      ad_item: {
        ...state.ad.ad_item
      }
    },
    loading: false,
    error: null
  }
}

const payForItemFail = (state, action) => {
  return {
    ads: [...state.ads],
    ad: {
      ...state.ad, 
      user: {
        ...state.ad.user
      },
      item: {
        ...state.ad.item
      },
      category: {
        ...state.ad.category
      },
      ad_item: {
        ...state.ad.ad_item
      }
    },
    loading: false,
    error: {
      ...action.error
    }
  }
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.FETCH_ADS_START: return fetchAdsStart(state, action);
    case actionTypes.FETCH_ADS_SUCCESS: return fetchAdsSuccess(state, action);
    case actionTypes.FETCH_ADS_FAIL: return fetchAdsFail(state, action);
    case actionTypes.FETCH_AD_START: return fetchAdStart(state, action);
    case actionTypes.FETCH_AD_SUCCESS: return fetchAdSuccess(state, action);
    case actionTypes.FETCH_AD_FAIL: return fetchAdFail(state,action);
    case actionTypes.PAY_FOR_ITEM_START: return payForItemStart(state, action);
    case actionTypes.PAY_FOR_ITEM_SUCCESS: return payForItemSuccess(state, action);
    case actionTypes.PAY_FOR_ITEM_FAIL: return payForItemFail(state, action);
    default: return state;
  }
}

export default reducer;