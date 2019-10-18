function actionOnSelectionForMap(eventobject, location) {
    return AS_Map_e6df868ac3124d0387c1cc719c044ee0(eventobject, location);
}

function AS_Map_e6df868ac3124d0387c1cc719c044ee0(eventobject, location) {
    return onSelectionCallbackForMap.call(this, eventobject, location);
}