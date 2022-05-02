import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: {
    _id:   "626cc87e24e4f086d466e9ab" ,
    username: "shiham",
    email: "shiham@gmail.com",
    password: "$2b$10$CeW71/rBqqHvI7zTaDSZWOwyfz5LiwA4Mc0ko8hmZANSDRh.AT2ma",
    profilePicture: "person/1.jpeg",
    coverPicture: "person/1.jpeg",
    followers: ["626cc88824e4f086d466e9ad"],
    isAdmin: false,
    createdAt: { $date: { $numberLong: "1651296382901" } },
    updatedAt: { $date: { $numberLong: "1651372128772" } },
    followings: ["626cc88824e4f086d466e9ad"],
    city: "Colombo",
    from: "Hambantota",
    relationship:1,
  },
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
