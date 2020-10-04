const initialState = {
  scores: []
}

const SET_INIT = "SCORE/SET_INIT";

export const onScoreInit = (scores) => async dispatch => {
  dispatch({
    type: SET_INIT,
    scores: scores
  })
}

export const Score = function(state = initialState, action) {
  switch (action.type) {
    case SET_INIT:
      return {
        ...state,
        scores: action.scores,
      };
    
    default:
      return state;
  }
};