export const INITIAL_STATE = {
  isValid: {
    text: true,
    title: true,
    date: true,
    tag: true,
  },
  values: {
    text: undefined,
    title: undefined,
    date: undefined,
    tag: undefined,
  },
  isFormValid: true,
};

export function formReducer(state, action) {
  switch (action.type) {
  case "RESET_VALIDATION":
    return {
      ...state,
      isValid: INITIAL_STATE.isValid,
      isFormValid: true,
    };
  case "SUBMIT": {
    const isTitleValid = action.payload.title.trim().length > 0;
    const isDateValid = Date.parse(action.payload.date) > 0;
    const isTagValid = action.payload.tag.trim().length > 0;
    const isTextValid = action.payload.text.trim().length > 0;
    const isValid = isTitleValid && isDateValid && isTagValid && isTextValid;
    return {
      values: action.payload,
      isValid: {
        title: isTitleValid,
        date: isDateValid,
        tag: isTagValid,
        text: isTextValid,
      },
      isFormValid: isValid,
    };
  }
  }
}
