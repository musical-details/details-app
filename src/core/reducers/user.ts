export const user = (state = [], action: any): any => {
  switch (action.type) {
    case "FETCH_CONTACTS_SUCCESS":
      return [...action.contacts];
    default:
      return state;
  }
};
