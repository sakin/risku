export const state = () => ({
  uid: null,
  name: "",
  email: ""
});

const types = {
  SET_AUTH_USER: "SET_AUTH_USER",
  DECREMENT: "DECREMENT",
  RESET: "RESET",
  LOG_OUT: "LOG_OUT"
};

export const mutations = {
  [types.LOG_OUT](state) {
    state.uid = null;
    state.email = null;
  },
  // callback from firebase
  [types.SET_AUTH_USER](state, { user }) {
    console.log('mutation', user)
    if (!user) {
      state.uid = null;
      state.email = null;
    } else {
      const { uid, email } = user;
      state.uid = uid;
      state.email = email;
    }
  }
};

export const actions = {
  async logout(ctx) {
    console.log("logout action");
    const { commit } = ctx;

    await this.$fireAuth.signOut();
    commit(types.LOG_OUT);
  },
  onAuthStateChangedAction(ctx, { authUser, claims }) {
    const { commit } = ctx;
    // console.log("on auth state changed action", authUser, claims);?
    if (!authUser) {
      // claims = null
      // Perform logout operations
      commit(types.LOG_OUT);
    } else {
      const { uid, email } = authUser;
      // state.uid = uid;
      // state.email = email;
      console.log('about to update user', uid, email)
      commit(types.SET_AUTH_USER, { user: { uid, email } });
      // Do something with the authUser and the claims object...
    }
  }
};

export const getters = {
  loggedIn(state) {
    // console.log("logged in", state);
    return !!state.uid;
  }
  // get(state) {
  //   return state.list;
  // }
};
