export const INITIAL_STATE = {
  isValid: {
    text: true,
    title: true,
    date: true,
  },
  values: {
    text: "",
    title: "",
    date: new Date().toISOString().split("T")[0],
    tag: "",
  },
  isFormValid: false,
};

export function formReducer(state, action) {
  switch (action.type) {
    case "SET_VALUE":
      return {
        ...state,
        values: {
          ...state.values,
          ...action.payload,
        },
      };

    case "CLEAR":
      return {
        ...state,
        values: INITIAL_STATE.values,
        isFormValid: false,
      };

    case "RESET_VALIDITY":
      return {
        ...state,
        isValid: INITIAL_STATE.isValid,
      };

    case "SUBMIT": {
      const isTitleValid = state.values.title.trim().length > 0;
      const isDateValid =
        new Date(state.values.date) instanceof Date &&
        !isNaN(new Date(state.values.date));
      const isTextValid = state.values.text.trim().length > 0;
      const isFormValid = isTitleValid && isDateValid && isTextValid;
      return {
        ...state,
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
