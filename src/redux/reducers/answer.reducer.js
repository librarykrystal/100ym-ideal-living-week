const answersReducer = (state = [], action) => {
    switch (action.type) {
      case "UPDATE_ANSWERS":
        return action.payload;
      default:
        return null;
    }
   };
   
   
   export default answersReducer;