// return isSessionActive, action to toggle
const defaultState = {};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'TOGGLE_IS_SESSION_ACTIVE':
      return {
        isSessionActive: !action.isSessionActive,
      };
    default: return state;
  }
};
