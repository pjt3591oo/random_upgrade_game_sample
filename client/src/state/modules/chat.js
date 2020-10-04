const initialState = {
  chats: []
}

const SET_INIT = "CHAT/SET_INIT";

export const onChatInit = (chats) => async dispatch => {
  dispatch({
    type: SET_INIT,
    chats: chats
  })
}

export const Chat = function(state = initialState, action) {
  switch (action.type) {
    case SET_INIT:
      return {
        ...state,
        chats: action.chats,
      };

    default:
      return state;
  }
};