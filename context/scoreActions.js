export const ACTION_SET_SCORE = "SET_SCORE";
export const ACTION_SET_ORDER = "SET_ORDER";
export const ACTION_SET_CURRENT_SLIDE = "SET_CURRENT_SLIDE";

export const setScore = score => ({
  type: ACTION_SET_SCORE,
  payload: score
});

export const setOrder = order => ({
  type: ACTION_SET_ORDER,
  payload: order
});

export const setCurrentSlide = slide => ({
  type: ACTION_SET_CURRENT_SLIDE,
  payload: slide
});
