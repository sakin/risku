import { vuexfireMutations, firestoreAction } from 'vuexfire'

export const state = () => ({
  countDocument: {
    count: null,
  },
});

const types = {
};

export const mutations = {
};

export const actions = {
  async increment({ commit, state, rootState, getters }) {
    const ref = this.$fireStore.collection('countCollection').doc('countDocument')
    const count = parseInt(getters.count, 10) || 0
    try {
      await ref.set({
        count: count + 1,
      },  {merge: true})
    } catch (e) {
      return Promise.reject(e)
    }
  },
  async decrement({ commit, state, rootState, getters }) {
    const ref = this.$fireStore.collection('countCollection').doc('countDocument')
    const count = parseInt(getters.count, 10) || 0
    try {
      await ref.set({
        count: count - 1 || 0,
      },  {merge: true})
    } catch (e) {
      return Promise.reject(e)
    }
  },
  
  bindCountDocument: firestoreAction(async function ({ bindFirestoreRef }) {
    const ref = this.$fireStore
      .collection('countCollection')
      .doc('countDocument')
    const val = await ref.get();
    console.log('reading', val);
    await bindFirestoreRef('countDocument', ref, { wait: true })
  }),
  unbindCountDocument: firestoreAction(function ({ unbindFirestoreRef }) {
    unbindFirestoreRef('countDocument', false)
  }),
};

export const getters = {
  count(state) {
    return state.countDocument.count
  },
};
