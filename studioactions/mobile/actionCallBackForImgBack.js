function actionCallBackForImgBack(eventobject, x, y) {
    return AS_Image_4c266cf2538347c6b88c8777d173fe19(eventobject, x, y);
}

function AS_Image_4c266cf2538347c6b88c8777d173fe19(eventobject, x, y) {
    return callBackForImgBack.call(this);
}