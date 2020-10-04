import { combineReducers } from 'redux'

import { Channel } from "./modules/channel";
import { Chat } from "./modules/chat";
import { Score } from "./modules/score";

export default combineReducers({
  Channel,
  Chat,
  Score
});
