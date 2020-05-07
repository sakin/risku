//import { vuexfireMutations, firestoreAction } from 'vuexfire'

export const state = () => ({
  currentMap: {
    id: null,
    name: null,
    image: null,
    points: []
  },
  uploadingProgress: null,
  maps: []
});

const types = {
  CREATE_MAP: "CREATE_MAP",
  SET_MAPS: "SET_MAPS",
  SET_MAP: "SET_MAP",
  SET_UPLOAD_PROGRESS: "SET_UPLOAD_PROGRESS",
  RESET_MAP: "RESET_MAP"
};

export const mutations = {
  [types.CREATE_MAP](state, { map }) {
    state.id = map.id;
    state.name = map.name;
    state.image = map.image;
  },
  [types.SET_MAPS](state, maps) {
    state.maps = maps;
  },
  [types.SET_MAP](state, { map }) {
    state.currentMap = map;
  },
  [types.SET_UPLOAD_PROGRESS](state, progress) {
    state.uploadingProgress = progress;
  },
  [types.RESET_MAP](state) {
    state.id = null;
    state.name = null;
    state.image = null;
  }
};

export const actions = {
  createMap(ctx, { map }) {
    const { commit } = ctx;
    commit(types.CREATE_MAP, { map });
  },

  async getMap(ctx, { id }) {
    const { commit } = ctx;
    const mapRef = this.$fireStore.collection("mapCollection").doc("id");
    const map = await mapRef.get();
    commit(types.SET_MAP, map);
  },

  async uploadImage(ctx, { imageFile, fileName }) {
    const { commit, dispatch } = ctx;

    var storageRef = this.$fireStorage.ref();
    const snapshot = await storageRef
      .child(`images/${fileName}`)
      .put(imageFile);
    return snapshot.ref.getDownloadURL();
  },

  async createMap(ctx, { map }) {
    const { commit, dispatch } = ctx;
    const fileName = getFileName({ name: map.name, fileName: map.image.name });
    const imageUrl = await dispatch("uploadImage", {
      imageFile: map.image,
      fileName
    });
    const slug = strToSlug(map.name);
    const id = `${slug}-${dateTimeStamp()}`;
    const newMapRef = this.$fireStore.collection("mapsCollection").doc(id);

    await newMapRef.set(
      {
        id,
        slug,
        name: map.name,
        mapUrl: imageUrl
      },
      { merge: true }
    );
  },

  async getAllMaps(ctx) {
    const { commit } = ctx;
    const mapsRef = this.$fireStore.collection("mapsCollection");
    const mapQuerySnapshot = await mapsRef.get();
    let maps = [];
    await mapQuerySnapshot.forEach(function(doc) {
      const map = doc.data();
      maps.push(map);
    });
    commit(types.SET_MAPS, maps);
  },
  async getMap(ctx, id) {
    const { commit } = ctx;
    console.log("id", id);
    const mapsRef = this.$fireStore.collection("mapsCollection").doc(id);
    const mapDoc = await mapsRef.get();
    return mapDoc.data();
  }

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

export const getters = {};

// helpers
const getFileName = ({ name, fileName }) => {
  return `${name}-${dateTimeStamp()}-${fileName}`;
};

const dateTimeStamp = () => {
  const now = new Date();
  return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
};

function strToSlug(str) {
  str = str.replace(/^\s+|\s+$/g, ""); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "åàáãäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to = "aaaaaaeeeeiiiioooouuuunc------";

  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-") // collapse dashes
    .replace(/^-+/, "") // trim - from start of text
    .replace(/-+$/, ""); // trim - from end of text

  return str;
}
