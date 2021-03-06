import {
  FETCH_USER,
  SET_USER,
  SET_ERROR,
  FETCH_FAMILY,
  SET_FAMILY,
  DELETE_USER,
  CLEAR_USER,
  SET_USER_ON_LOGIN,
  SET_REGISTRATION,
  UPDATING_USER,
  UPDATING_USER_SUCCESS,
  UPDATING_USER_ADMIN,
  DELETE_STUDENT_SUCCESS
} from "../actions/user-actions";

const initialState = {
  user: {},
  family: [],
  familyName: '',
  isLoading: false,
  error: ''
}

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        isLoading: true
      }
    case SET_USER:
      return {
        ...state,
        isLoading: false,
        user: action.payload
      }
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }
    case FETCH_FAMILY:
      return {
        ...state,
        isLoading: true
      }
    case SET_FAMILY:
      return {
        ...state,
        isLoading: false,
        family: action.payload.people,
        familyName: action.payload.family.name,
        error: ''
      }
    case DELETE_USER:
      return {
        ...state,
        isLoading: true
      }
    case CLEAR_USER :
      return {
        user: {},
        family: [],
        familyName: '',
        isLoading: false,
        error: ''
      }
    case SET_USER_ON_LOGIN :
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        family: action.payload.children || []
      }
    case SET_REGISTRATION:
      return {
        ...state
      }
    case UPDATING_USER:
      return {
        ...state,
        isLoading: true
      }
    case UPDATING_USER_SUCCESS:
      const arrayWithoutUpdatedUser = state.family.filter(user => user.id === action.payload.id ? null : user)
      return {
        ...state,
        isLoading: false,
        family: [...arrayWithoutUpdatedUser, action.payload]
      }
    case UPDATING_USER_ADMIN:
      return {
        ...state,
        isLoading: false,
        user: action.payload
      }
    case DELETE_STUDENT_SUCCESS:
      const arrayWithoutDeletedUser = state.family.filter(user => user.id === action.payload.id ? null : user)
      return {
        ...state,
        isLoading: false,
        family: [...arrayWithoutDeletedUser]
      }
    default:
      return state
  }
}