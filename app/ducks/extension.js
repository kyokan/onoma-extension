export const SET_VIEW = 'app/extension/setView';

export const VIEW_TYPES = {
  DEFAULT: 'default',
  CREATE_ACCOUNT_OPTIONS: 'create_account_options',
  CREATE_NEW_ACCOUNT: 'create_new_account',
};

const initialState = {
  currentView: VIEW_TYPES.DEFAULT,
  resolverOn: false,
};

export const setView = viewType => ({
  type: SET_VIEW,
  payload: viewType,
});

export default function extension(state = initialState, { type, payload }) {
  switch (type) {
    case SET_VIEW:
      return { ...state, currentView: payload };
    default:
      return state;
  }
}
