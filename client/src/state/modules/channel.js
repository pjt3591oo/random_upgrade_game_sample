const initialState = {
  channel: '',
  name: ''
}

const SET_INFO = "CHANNEL/SET_INFO";

export const onChannelInit = (channel, name) => async dispatch => {
  dispatch({
    type: SET_INFO,
    channel, name
  })
}

export const Channel = function(state = initialState, action) {
  switch (action.type) {
    case SET_INFO:
      return {
        ...state,
        channel: action.channel,
        name: action.name,
      };
   
    default:
      return state;
  }
};