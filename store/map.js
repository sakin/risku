import { vuexfireMutations, firestoreAction } from 'vuexfire'

export const state = () => ({
  currentMap: {
    id: null,
    name: null,
    image: null,
    points: []
  }
});

const types = {
  CREATE_MAP: "CREATE_MAP",
  SET_MAP: "SET_MAP",
};

export const mutations = {
  [types.CREATE_MAP](state, {map}) {
    state.id = map.id;
    state.name = map.name;
    state.image = map.image;
  },
  [types.SET_MAP](state, {map}) {
    state.currentMap = map;
  }
};

export const actions = {
  createMap(ctx, {map}) {
    commit(types.CREATE_MAP, {map});
  },
  async getMap(ctx, {id}){
    const mapRef = this.$fireStore
    .collection('mapCollection')
    .doc('id')
    const map = await mapRef.get();
    commit(types.SET_MAP, map)
  },

  // bindCountDocument: firestoreAction(async function ({ bindFirestoreRef }) {
  //   const ref = this.$fireStore
  //     .collection('mapCollection')
  //     .doc('countDocument')
  //   const val = await ref.get();
  //   console.log('reading', val);
  //   await bindFirestoreRef('countDocument', ref, { wait: true })
  // }),
  // unbindCountDocument: firestoreAction(function ({ unbindFirestoreRef }) {
  //   unbindFirestoreRef('countDocument', false)
  // }),
};

export const getters = {

};
