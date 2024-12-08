export const INITIAL_STATE = {
  isValid: {
    text: true,
    title: true,
    date: true,
  },
  values: {
    text: undefined,
    title: undefined,
    date: undefined,
  },
  isFormValid: false,
};

export function formReducer(state, action) {
  switch (action.type) {
    case "RESET":
      return {
        ...state,
        isValid: INITIAL_STATE.isValid,
        isFormValid: true,
      };
    case "SUBMIT": {
      const isTitleValid = action.payload.title.trim().length > 0;
      const isDateValid = Date.parse(action.payload.date) > 0;
      const isTextValid = action.payload.text.trim().length > 0;
      const isFormValid = isTitleValid && isDateValid && isTextValid;
      if (isDateValid) {
        action.payload.date = new Date(action.payload.date);
      }
      return {
        values: action.payload,
        isValid: {
          title: isTitleValid,
          date: isDateValid,
          text: isTextValid,
        },
        isFormValid: isFormValid,
      };
    }
  }
}
