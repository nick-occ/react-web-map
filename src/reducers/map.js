const mapReducerDefaultState = {
  name: '',
  mapView: null,
  idLayer: 'Identify',
  idCurRec: 0,
  idTotalRec: 0,
  idData: [],
  idParams: null,
  idTask: null
};

export default (state = mapReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_MAP_PROPS':
      return {...state, ...action.map}
    default:
      return state
  }
};
