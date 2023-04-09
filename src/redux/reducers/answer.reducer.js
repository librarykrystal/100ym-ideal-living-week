const answersReducer = (state = [], action) => {
    switch (action.type) {
      case "SET_ANSWERS":
        return action.payload;
      default:
        return state;
    }
   };
   
   
   export default answersReducer;