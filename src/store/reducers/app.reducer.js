import { createSlice } from '@reduxjs/toolkit';

const newUserInitState = {
  email: '',
  employeeId: '',
  reviewerName: '',
  managerName: '',
  role: '',
  userName: '',
  FristName:'',
  LastName:'',
  password: '',
  showPassword: false,
  isLoginButonDisabled: false,
  isGeneratedButtonDisabled: false,
  error: {
    errorEmail: false,
    errorEmployeeId: false,
    errorReviewerName: false,
    errorManagerName: false,
    errorRole: false,
    errorUserName: false,
    errorFristName: false,
    errorLastName: false,
    errorPassword: false,
    errorGeneratebutton: false,
  },
};

const slice = createSlice({
  name: 'count',
  initialState: {
    count: 0,
    activeTab: 'Default',
    token: null,
    userDetails: null,
    comments: [],
    createNewUserDetailsData: newUserInitState,
    createFristName:newUserInitState,
    createLastName:newUserInitState,
    managers: [],
    reviewers: [],
    roles: [],
    recordings: [],
  },
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    tabSelected: (state, action) => {
      state.activeTab = action.payload.tab;
    },
    createNewUserDetails: (state, action) => {
      state.createNewUserDetailsData = action.payload.createNewUser;
    },
    createFristName: (state, action) => {
      state.createFristName = action.payload.createFristName;
    },
    createLastName: (state, action) => {
      state.createLastName = action.payload.createLastName;
    },

  
    login: (state, action) => {
      state.token = action.payload.token;
      state.userDetails = action.payload.userDetails;
    },
    logout: (state) => {
      state.token = null;
      state.userDetails = null;
      state.comments = [];
    },
    comments: (state, action) => {
      state.comments = action.payload.comments;
    },
    resetCreateNewUserDetails: (state) => {
      state.createNewUserDetailsData = newUserInitState;
    },
    resetCreateFristName: (state) => {
      state.createFristName = createFristName;
    },
    resetCreateLastName: (state) => {
      state.createLastName = createLastName;
    },
    roles: (state, action) => {
      state.roles = action.payload.roles;
    },
    managers: (state, action) => {
      state.managers = action.payload.managers;
    },
    reviewers: (state, action) => {
      state.reviewers = action.payload.reviewers;
    },
    associateList: (state, action) => {
      state.associateList = action.payload.associateList;
    },
    recordings: (state, action) => {
      state.recordings = action.payload.recordings;
    },
  },
});

export const appStore = (state) => state;
export const {
  increment,
  decrement,
  tabSelected,
  login,
  logout,
  comments,
  createNewUserDetails,
  // FristName,
  // LastName,
  resetCreateNewUserDetails,
  managers,
  reviewers,
  roles,
  associateList,
  recordings,
} = slice.actions;
export const selectedTab = (state) => state.activeTab;
export const userDetails = (state) => state.userDetails;
export const associates = (state) => state.associateList;
export const token = (state) => state.token;
export const userComments = (state) => state.comments;
export const createNewUser = (state) => state.createNewUserDetailsData;
export const createFristName=(state)=>state.FristName;
export const createLastName=(state)=>state.LastName;
export const allRoles = (state) => state.roles;
export const allManagers = (state) => state.managers;
export const allReviewers = (state) => state.reviewers;
export const allRecordings = (state) => state.recordings;
export const { reducer } = slice;
