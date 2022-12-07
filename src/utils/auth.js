import React from 'react'

const initState = { userStatus: false, userName: null }

const reducer = (state, action) => {
  switch (action.type) {
    case 'login':
      return {
        ...state,
        userStatus: true,
        userName: action.payload
      };
    case 'logout':
      return {
        ...state,
        userStatus: false,
        userName: null
      };
    default:
      return state;
  }
};

const ReducerContext = React.createContext()

export const ReducerProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(reducer, initState)
  const store = React.useMemo(() => {
    return [state, dispatch]
  }, [state])
  return (
    <ReducerContext.Provider value={store}>{children}</ReducerContext.Provider>
  )
}

export const useReducerContext = () => { 
  return React.useContext(ReducerContext)
}
