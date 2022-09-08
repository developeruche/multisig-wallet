import {
    userDetailAction,
  } from "./actions";
  
export const userDetailState : any = {
   userDetail: null,
};
  
  
export const userDetailReducer = (state: any, action: any) => {
   if (action.type === userDetailAction) {
     return {
        ...state,
        userDetail: action.payload,
      };
    } else {
      return state;
    }
};
  