/**
 * @module userExperienceLogic
 *
 * @author Viz User 
 */

/**
 * @function globalSettings
 *
 */
function globalSettings (eventObject)
{
  eventObject.skin = "sknLbl4";
  // For Distance Units
  if (eventObject.text === "Kilometers"){
    frmSettings.lblMiles.skin = "sknLbl3";
    settings.distanceUnits = "metric";
  } else if (eventObject.text === "Miles"){
    frmSettings.lblKilometers.skin = "sknLbl3";
    settings.distanceUnits = "imperial";
  }
  
  // For Map Type 
  if (eventObject.text === "Normal"){
    frmSettings.lblSatellite.skin = "sknLbl3";
	settings.mapType = "normal";
  } else if (eventObject.text === "Satellite"){
    frmSettings.lblNormal.skin = "sknLbl3";
	settings.mapType = "satellite";
  }
  
  // For Search Order
  if (eventObject.text === "Ratings"){
    frmSettings.lblDistance.skin = "sknLbl3";
	settings.searchOrder = "distance";
  } else if (eventObject.text === "Distance"){
    frmSettings.lblRatings.skin = "sknLbl3";
	settings.searchOrder = "prominence";
  }
}

/**
 * @function callBackForInitOffrmMap
 *
 */
function callBackForInitOffrmMap ()
{
  frmMap.flexListOfPlaces.setVisibility(false);
  switchOnLocationsService();
  setMasterDataForSegTypesOfPlaces();
}

/**
 * @function switchOnLocationsService
 *
 */
function switchOnLocationsService ()
{
  
}

/**
 * @function callBackForInitOffrmSettings
 *
 */
function callBackForInitOffrmSettings ()
{
  frmSettings.flexHdr.imgSettings.setVisibility(false);
  frmSettings.flexHdr.btnSettingsSave.setVisibility(true);
}

/**
 * @function setAppSettings
 *
 */
function setAppSettings ()
{
  if (settings.mapType === "satellite"){
  	frmMap.map.mode = constants.MAP_VIEW_MODE_SATELLITE;
  }else if (settings.mapType === "normal"){
  	frmMap.map.mode = constants.MAP_VIEW_MODE_NORMAL;
  }
  frmMap.show();
}

/**
 * @function closeAnimationForFlexListOfPlaces
 *
 */
function closeAnimationForFlexListOfPlaces (flag)
{
  var currentForm = kony.application.getCurrentForm();
  var animationObject = kony.ui.createAnimation({100 : {"right":"-63%"}});
  var animationConfigObject = {"duration":0.25,"iterationCount":1,"delay":0,"direction":kony.anim.DIRECTION_NONE,"fillMode":kony.anim.FILL_MODE_FORWARDS};
  var animationCallbackObject = {animationEnd:emptyCallback};
  if (flag){
    animationCallbackObject = {animationEnd: openAnimationForFlexTypesOfPlaces};
    triggerTypesOfPlacesFlexOpen = false;
  }
  currentForm.flexListOfPlaces.animate(animationObject, animationConfigObject, animationCallbackObject);
  currentForm.flexListOfPlaces.flexListOfPlacesOpen.setVisibility(true); 
  currentForm.flexListOfPlaces.flexListOfPlacesClose.setVisibility(false);
  isListOfPlacesFlexOpen = false;
}

/**
 * @function closeAnimationForFlexTypesOfPlaces
 *
 */
function closeAnimationForFlexTypesOfPlaces (flag)
{
  var currentForm = kony.application.getCurrentForm();
  var animationObject = kony.ui.createAnimation({100 : {"left":"-63%"}});
  var animationConfigObject = {"duration":0.25,"iterationCount":1,"delay":0,"direction":kony.anim.DIRECTION_NONE,"fillMode":kony.anim.FILL_MODE_FORWARDS};
  var animationCallbackObject = {animationEnd:emptyCallback};
  if (flag){
    animationCallbackObject = {animationEnd: openAnimationForFlexListOfPlaces};
    triggerListOfPlacesFlexOpen = false;
  }
  currentForm.flexTypesOfPlaces.animate(animationObject, animationConfigObject, animationCallbackObject);
  currentForm.flexTypesOfPlaces.flexTypesOfPlacesOpen.setVisibility(true); 
  currentForm.flexTypesOfPlaces.flexTypesOfPlacesClose.setVisibility(false);
  isTypesOfPlacesFlexOpen = false;
}

/**
 * @function openAnimationForFlexListOfPlaces
 *
 */
function openAnimationForFlexListOfPlaces ()
{
  if (isTypesOfPlacesFlexOpen){
    triggerListOfPlacesFlexOpen = true;
    closeAnimationForFlexTypesOfPlaces (triggerListOfPlacesFlexOpen);
  } else {
    var currentForm = kony.application.getCurrentForm();
    var animationObject = kony.ui.createAnimation({100 : {"right":"0%"}});
    var animationConfigObject = {"duration":0.25,"iterationCount":1,"delay":0,"direction":kony.anim.DIRECTION_NONE,"fillMode":kony.anim.FILL_MODE_FORWARDS};
    var animationCallbackObject = {animationEnd:emptyCallback};
    currentForm.flexListOfPlaces.animate(animationObject, animationConfigObject, animationCallbackObject);
    currentForm.flexListOfPlaces.flexListOfPlacesOpen.setVisibility(false); 
    currentForm.flexListOfPlaces.flexListOfPlacesClose.setVisibility(true);
    isListOfPlacesFlexOpen = true;
  }
}

/**
 * @function openAnimationForFlexTypesOfPlaces
 *
 */
function openAnimationForFlexTypesOfPlaces ()
{
  if (isListOfPlacesFlexOpen){
    triggerTypesOfPlacesFlexOpen = true;
    closeAnimationForFlexListOfPlaces (triggerTypesOfPlacesFlexOpen);
  } else {
    var currentForm = kony.application.getCurrentForm();
    var animationObject = kony.ui.createAnimation({100 : {"left":"0%"}});
    var animationConfigObject = {"duration":0.25,"iterationCount":1,"delay":0,"direction":kony.anim.DIRECTION_NONE,"fillMode":kony.anim.FILL_MODE_FORWARDS};
    var animationCallbackObject = {animationEnd:emptyCallback};
    currentForm.flexTypesOfPlaces.animate(animationObject, animationConfigObject, animationCallbackObject);
    currentForm.flexTypesOfPlaces.flexTypesOfPlacesOpen.setVisibility(false); 
    currentForm.flexTypesOfPlaces.flexTypesOfPlacesClose.setVisibility(true);
    isTypesOfPlacesFlexOpen = true;
  }
}

/**
 * @function emptyCallback
 *
 */
function emptyCallback ()
{
  
}

/**
 * @function createPinImage
 *
 */
function createPinImage ()
{
  	//alert("createPinImage: " + frmMap.flexTypesOfPlaces.segTypesOfPlaces.selectedItems[0]);
  	//frmMap.imgForeground.src = frmMap.flexTypesOfPlaces.segTypesOfPlaces.selectedItems[0].imgTypeOfPlace;
  	//alert("createPinImage: " + frmMap.flexTypesOfPlaces.segTypesOfPlaces.selectedItems[0]);
  	if ("" === gblStringToSeachFor)
  		frmMap.imgForeground.src = frmMap.flexTypesOfPlaces.segTypesOfPlaces.selectedItems[0].imgTypeOfPlace;
  	else
     	frmMap.imgForeground.src = "user_defined.png";
  	frmMap.show();
	pinImage = kony.image.createImageFromSnapShot(frmMap.flex1);
}

/**
 * @function showProgressIndicator
 *
 */
function showProgressIndicator (loadingMsg)
{
	var form = kony.application.getCurrentForm();
  	if ("frmMap" === form.id){
      form.map.clear();
    }
  	closeAnimationForFlexTypesOfPlaces(false);
  	var flexBlurBackgroundDuringProgress = new kony.ui.FlexContainer({
        "centerX": "50%",
        "centerY": "50%",
        "height": "100%",
        "id": "flexBlurBackgroundDuringProgress",
        "width": "100%",
        "zIndex": 9,
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "clipBounds": true,
        "isVisible": true,
        "layoutType": kony.flex.FLOW_HORIZONTAL,
        "onClick": emptyCallback,
        "skin": "sknFlex10"
    }, {}, {});
  	var flexProgressIndicator = new kony.ui.FlexContainer({
        "centerX": "50%",
        "centerY": "50%",
        "height": "60dp",
        "id": "flexProgressIndicator",
        "width": "60%",
        "zIndex": 10,
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "clipBounds": true,
        "isVisible": true,
        "layoutType": kony.flex.FLOW_HORIZONTAL,
        "skin": "sknFlex9"
    }, {}, {});
    flexProgressIndicator.setDefaultUnit(kony.flex.DP);
    var imgLoadingIndicator = new kony.ui.Image2({
        "bottom": 5,
        "centerY": "50%",
        "height": "40dp",
        "id": "imgLoadingIndicator",
        "left": "10dp",
        "src": "loadingicon.png",
        "width": "40dp",
        "isVisible": true,
        "skin": "slImage"
    }, {
        "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
    }, {});
    var lblLoadingIndicator = new kony.ui.Label({
        "bottom": 10,
        "centerY": "50%",
        "id": "lblLoadingIndicator",
        "left": 10,
        "text": "Finding "+loadingMsg+" ...",
        "width": "70%",
        "zIndex": 1,
        "isVisible": true,
        "skin": "sknLbl10",
        "textStyle": {
            "letterSpacing": 0,
            "strikeThrough": false
        }
    }, {
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
    }, {
        "textCopyable": false
    });
    flexProgressIndicator.add(imgLoadingIndicator, lblLoadingIndicator);
  	form.add (flexBlurBackgroundDuringProgress);
  	form.add (flexProgressIndicator);
	animateProgressIndicator ();
}

/**
 * @function dismissLoadingIndicator
 *
 */
function dismissLoadingIndicator ()
{
  var form = kony.application.getCurrentForm();
  form.remove (form.flexBlurBackgroundDuringProgress);
  form.remove (form.flexProgressIndicator);
}

/**
 * @function animateProgressIndicator
 *
 */
function animateProgressIndicator ()
{
  var currentForm = kony.application.getCurrentForm();

  var transform1 = kony.ui.makeAffineTransform();
  transform1.rotate3D(0,0,1,0);

  var transform2 = kony.ui.makeAffineTransform();
  transform2.rotate3D(90,0,1,0);

  var transform3 = kony.ui.makeAffineTransform();
  transform3.rotate3D(180,0,1,0);
  
  var transform4 = kony.ui.makeAffineTransform();
  transform4.rotate3D(270,0,1,0);

  var transform5 = kony.ui.makeAffineTransform();
  transform5.rotate3D(360,0,1,0);

  var animationObject = {
                          0: {"transform": transform1,"opacity":1,"stepConfig":{"timingFunction":kony.anim.LINEAR}},
                          25: {"transform": transform2,"opacity":1,"stepConfig":{"timingFunction":kony.anim.LINEAR}},
                          50: {"transform": transform3,"opacity":1,"stepConfig":{"timingFunction":kony.anim.LINEAR}},
                          75: {"transform": transform4,"opacity":1,"stepConfig":{"timingFunction":kony.anim.LINEAR}},
                          100: {"transform": transform5,"opacity":1,"stepConfig":{"timingFunction":kony.anim.LINEAR}}
 						 };
  
  var animationConfigObject = {
                                "duration":1,
                                "iterationCount":0,
                                "direction":kony.anim.DIRECTION_NONE,
                                "fillMode":kony.anim.FILL_MODE_NONE
                              };
  var animationCallbackObject = {"animationEnd" : function(){}};

  currentForm.imgLoadingIndicator.animate(kony.ui.createAnimation(animationObject),animationConfigObject,animationCallbackObject);
}

/**
 * @function showMessage
 *
 */
function showMessage (msg)
{
	var form = kony.application.getCurrentForm();
  	var flexBlurBackgroundWhileShowingMessage = new kony.ui.FlexContainer({
        "centerX": "50%",
        "centerY": "50%",
        "height": "100%",
        "id": "flexBlurBackgroundWhileShowingMessage",
        "width": "100%",
        "zIndex": 9,
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "clipBounds": true,
        "isVisible": true,
        "onClick": emptyCallback,
      	"layoutType": kony.flex.FLOW_HORIZONTAL,
        "skin": "sknFlex10"
    }, {}, {});
  	var flexMsg = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
        "centerX": "50%",
        "centerY": "50%",
        "clipBounds": true,
        "id": "flexMsg",
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "onClick": dismissMessage,
        "skin": "sknFlex9",
        "width": "300dp",
        "zIndex": 10
    }, {}, {});
    flexMsg.setDefaultUnit(kony.flex.DP);
    var imgMsg = new kony.ui.Image2({
        "height": "40dp",
        "id": "imgMsg",
        "isVisible": true,
        "left": "15dp",
        "skin": "slImage",
        "src": "loadingicon.png",
        "top": "10dp",
        "width": "40dp"
    }, {
        "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
    }, {});
    var lblMsg = new kony.ui.Label({
        "bottom": "10dp",
        "id": "lblMsg",
        "isVisible": true,
        "left": "65dp",
        "skin": "sknLbl10",
        "text": msg,
        "textStyle": {
            "letterSpacing": 0,
            "strikeThrough": false
        },
        "top": "10dp",
        "width": "230dp",
        "zIndex": 1
    }, {
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
    }, {
        "textCopyable": false
    });
    flexMsg.add(imgMsg, lblMsg);
    form.add(flexMsg, flexBlurBackgroundWhileShowingMessage);
}

/**
 * @function dismissMessage
 *
 */
function dismissMessage ()
{
	var form = kony.application.getCurrentForm();
 	form.remove (form.flexMsg);
 	form.remove (form.flexBlurBackgroundWhileShowingMessage);
}

/**
 * @function deleteKeywordFromTypesOfPlaces
 *
 */

function deleteKeywordFromTypesOfPlaces (context)
{
  //alert (context);
  var form = kony.application.getCurrentForm();  
  var transformObject1 = kony.ui.makeAffineTransform();
  var transformObject2 = kony.ui.makeAffineTransform();
  transformObject1.scale(1,1);
  transformObject2.scale(0,0);
  var animDefinitionOne = {0  : {"transform":transformObject1},
                           100 : {"transform":transformObject2}};

  var animDefinition = kony.ui.createAnimation(animDefinitionOne);
  var animConfig = {"duration":0.5,"iterationCount":1,"delay":0,"fillMode":kony.anim.NONE};
  var animationObject = {definition: animDefinition, config: animConfig};

  var sectionItems = form.flexAddNewKeywords.segTypesOfPlacesEdit.data[context.sectionIndex][1].length;
  //alert("sectionItems: " + sectionItems);
  if(sectionItems == 1){
  	form.flexAddNewKeywords.segTypesOfPlacesEdit.removeSectionAt(context.sectionIndex, animationObject);
  }
 else{
   form.flexAddNewKeywords.segTypesOfPlacesEdit.removeAt(context.rowIndex, context.sectionIndex, animationObject);
 }
}


/**
 * @function showEditKeywordsLayer
 *
 */
function showEditKeywordsLayer ()
{
  closeAnimationForFlexTypesOfPlaces(false);
 
  var form = kony.application.getCurrentForm();
  var dataInSegTypeOfPlaces = form.flexAddNewKeywords.segTypesOfPlacesEdit.data;
  //alert("Before: dataInSegTypeOfPlaces: " + JSON.stringify(dataInSegTypeOfPlaces));
  
  for (var i=0;i<dataInSegTypeOfPlaces.length;i++)
    {
      for(var j=0; j<dataInSegTypeOfPlaces[i][1].length; j++)
      {	
      	dataInSegTypeOfPlaces[i][1][j].imgSearch = {skin:"sknBtn4"};
      	//dataInSegTypeOfPlaces[i][1][j].lblTypeOfPlace = {text: dataInSegTypeOfPlaces[i][1][j].lblTypeOfPlace, skin: "sknLbl7"};
        dataInSegTypeOfPlaces[i][1][j].lblTypeOfPlace.skin = "sknLbl7";
      }
    }
  
  //alert("After: dataInSegTypeOfPlaces: " + JSON.stringify(dataInSegTypeOfPlaces));

  form.flexAddNewKeywords.segTypesOfPlacesEdit.setData(dataInSegTypeOfPlaces);
  
  var animationObject = kony.ui.createAnimation({100 : {"left":"0%"}});
  var animationConfigObject = {"duration":0.25,"iterationCount":1,"delay":0,"direction":kony.anim.DIRECTION_NONE,"fillMode":kony.anim.FILL_MODE_FORWARDS};
  var animationCallbackObject = {animationEnd:emptyCallback};
  form.flexAddNewKeywords.animate(animationObject, animationConfigObject, animationCallbackObject);
}


function setMasterDataForSegTypesOfPlaces(){
  var masterDataForSegTypesOfPlacesEdit = 
    [
        [{lblHdrCategory: "Bank", template: flexSegHdrCategory}, 
            [ 
                {lblTypeOfPlace: {text:"ATM" , skin: "sknLbl2"}, imgTypeOfPlace: "atm.png", imgSearch: {skin:"sknBtn3"}, skin: "sknFlex21", type: "atm", template: flexSegTypesOfPlaces}, 
                {lblTypeOfPlace:{text:"Bank" , skin: "sknLbl2"}, imgTypeOfPlace: "bank.png", imgSearch: {skin:"sknBtn3"}, skin: "sknFlex21", type: "bank", template: flexSegTypesOfPlaces}
            ]
        ],
        [{lblHdrCategory: "Bar & Restaurant", template: flexSegHdrCategory}, 
            [ 
                {lblTypeOfPlace:{text:"Food" , skin: "sknLbl2"}, imgTypeOfPlace: "food.png", imgSearch: {skin:"sknBtn3"}, skin: "sknFlex21", type: "restaurant", template: flexSegTypesOfPlaces}, 
                {lblTypeOfPlace:{text:"Bar" , skin: "sknLbl2"}, imgTypeOfPlace: "bar.png", imgSearch: {skin:"sknBtn3"}, skin: "sknFlex20", type: "bar", template: flexSegTypesOfPlaces}
            ]
        ],	
        [{lblHdrCategory: "Entertainment", template: flexSegHdrCategory}, 
            [ 
                {lblTypeOfPlace:{text:"Movie Theatre" , skin: "sknLbl2"}, imgTypeOfPlace: "movie_theatre.png", imgSearch: {skin:"sknBtn3"}, skin: "sknFlex15", type: "movie_theater", template: flexSegTypesOfPlaces}, 
                {lblTypeOfPlace:{text:"Night Club" , skin: "sknLbl2"}, imgTypeOfPlace: "night_club.png", imgSearch: {skin:"sknBtn3"}, skin: "sknFlex20", type: "night_club", template: flexSegTypesOfPlaces},
                {lblTypeOfPlace:{text:"Park" , skin: "sknLbl2"}, imgTypeOfPlace: "park.png", imgSearch: {skin:"sknBtn3"}, skin: "sknFlex8", type: "park", template: flexSegTypesOfPlaces}, 
                {lblTypeOfPlace:{text:"Theatre" , skin: "sknLbl2"}, imgTypeOfPlace: "theatre.png", imgSearch: {skin:"sknBtn3"}, skin: "sknFlex18", type: "theater", template: flexSegTypesOfPlaces}, 
                {lblTypeOfPlace:{text:"Zoo" , skin: "sknLbl2"}, imgTypeOfPlace: "zoo.png", imgSearch: {skin:"sknBtn3"}, skin: "sknFlex8", type: "zoo", template: flexSegTypesOfPlaces}
            ]
        ],
        [{lblHdrCategory: "Health & Beauty", template: flexSegHdrCategory}, 
            [ 
                {lblTypeOfPlace:{text:"Beauty Salon" , skin: "sknLbl2"}, imgTypeOfPlace: "beauty_salon.png", imgSearch: {skin:"sknBtn3"}, skin: "sknFlex13", type: "beauty_salon", template: flexSegTypesOfPlaces}, 
                {lblTypeOfPlace:{text:"Dentist" , skin: "sknLbl2"}, imgTypeOfPlace: "dentist.png", imgSearch: {skin:"sknBtn3"}, skin: "sknFlex9", type: "dentist", template: flexSegTypesOfPlaces},
                {lblTypeOfPlace:{text:"Doctor" , skin: "sknLbl2"}, imgTypeOfPlace: "doctor.png", imgSearch: {skin:"sknBtn3"}, skin: "sknFlex18", type: "doctor", template: flexSegTypesOfPlaces},
                {lblTypeOfPlace:{text:"Hospital" , skin: "sknLbl2"}, imgTypeOfPlace: "hospital.png", imgSearch: {skin:"sknBtn3"}, skin: "sknFlex18", type: "hospital", template: flexSegTypesOfPlaces},
                {lblTypeOfPlace:{text:"Pharmacy" , skin: "sknLbl2"}, imgTypeOfPlace: "pharmacy.png", imgSearch: {skin:"sknBtn3"}, skin: "sknFlex18", type: "pharmacy", template: flexSegTypesOfPlaces},
                {lblTypeOfPlace:{text:"Spa" , skin: "sknLbl2"}, imgTypeOfPlace: "spa.png", imgSearch: {skin:"sknBtn3"}, skin: "sknFlex13", type: "spa", template: flexSegTypesOfPlaces}
            ]
        ],
        [{lblHdrCategory: "Holy Place", template: flexSegHdrCategory}, 
            [ 
                {lblTypeOfPlace:{text:"Church" , skin: "sknLbl2"}, imgTypeOfPlace: "church.png", imgSearch: {skin:"sknBtn3"}, skin: "sknFlex9", type: "church", template: flexSegTypesOfPlaces}, 
                {lblTypeOfPlace:{text:"Hindu Temple" , skin: "sknLbl2"}, imgTypeOfPlace: "hindu_temple.png", imgSearch: {skin:"sknBtn3"}, skin: "sknFlex21", type: "hindu_temple", template: flexSegTypesOfPlaces}
            ]
        ],
        [{lblHdrCategory: "Shopping", template: flexSegHdrCategory}, 
            [ 
                {lblTypeOfPlace:{text:"Book Store" , skin: "sknLbl2"}, imgTypeOfPlace: "book_store.png", imgSearch: {skin:"sknBtn3"}, skin: "sknFlex14", type: "book_store", template: flexSegTypesOfPlaces}, 
                {lblTypeOfPlace:{text:"Clothing Store" , skin: "sknLbl2"}, imgTypeOfPlace: "clothing_store.png", imgSearch: {skin:"sknBtn3"}, skin: "sknFlex18", type: "clothing_store", template: flexSegTypesOfPlaces},
                {lblTypeOfPlace:{text:"Department Store" , skin: "sknLbl2"}, imgTypeOfPlace: "department_store.png", imgSearch: {skin:"sknBtn3"}, skin: "sknFlex18", type: "department_store", template: flexSegTypesOfPlaces},
                {lblTypeOfPlace:{text:"Electronics Store" , skin: "sknLbl2"}, imgTypeOfPlace: "electronics_store.png", imgSearch: {skin:"sknBtn3"}, skin: "sknFlex14", type: "electronics_store", template: flexSegTypesOfPlaces},
                {lblTypeOfPlace:{text:"Grocery" , skin: "sknLbl2"}, imgTypeOfPlace: "grocery.png", imgSearch: {skin:"sknBtn3"}, skin: "sknFlex18", type: "grocery_or_supermarket", template: flexSegTypesOfPlaces},
                {lblTypeOfPlace:{text:"Shopping Mall" , skin: "sknLbl2"}, imgTypeOfPlace: "shopping_mall.png", imgSearch: {skin:"sknBtn3"}, skin: "sknFlex14", type: "shopping_mall", template: flexSegTypesOfPlaces}
            ]
        ],
        [{lblHdrCategory: "Travel", template: flexSegHdrCategory}, 
            [ 
                {lblTypeOfPlace:{text:"Airport" , skin: "sknLbl2"}, imgTypeOfPlace: "airport.png", imgSearch: {skin:"sknBtn3"}, skin: "sknFlex9", type: "airport", template: flexSegTypesOfPlaces}, 
                {lblTypeOfPlace:{text:"Bus Station" , skin: "sknLbl2"}, imgTypeOfPlace: "bus_station.png", imgSearch: {skin:"sknBtn3"}, skin: "sknFlex15", type: "bus_station", template: flexSegTypesOfPlaces},
                {lblTypeOfPlace:{text:"Taxi Stand" , skin: "sknLbl2"}, imgTypeOfPlace: "taxi_stand.png", imgSearch: {skin:"sknBtn3"}, skin: "sknFlex15", type: "taxi_stand", template: flexSegTypesOfPlaces},
                {lblTypeOfPlace:{text:"Train Station" , skin: "sknLbl2"}, imgTypeOfPlace: "train_station.png", imgSearch: {skin:"sknBtn3"}, skin: "sknFlex14", type: "train_station", template: flexSegTypesOfPlaces},
                {lblTypeOfPlace:{text:"Travel Agency" , skin: "sknLbl2"}, imgTypeOfPlace: "travel_agency.png", imgSearch: {skin:"sknBtn3"}, skin: "sknFlex8", type: "travel_agency", template: flexSegTypesOfPlaces}
            ]
        ],
        [{lblHdrCategory: "Others", template: flexSegHdrCategory}, 
            [ 
                {lblTypeOfPlace:{text:"Car Repair" , skin: "sknLbl2"}, imgTypeOfPlace: "car_repair.png", imgSearch: {skin:"sknBtn3"}, skin: "sknFlex17", type: "car_repair", template: flexSegTypesOfPlaces}, 
                {lblTypeOfPlace:{text:"Car Wash" , skin: "sknLbl2"}, imgTypeOfPlace: "car_wash.png", imgSearch: {skin:"sknBtn3"}, skin: "sknFlex17", type: "car_wash", template: flexSegTypesOfPlaces},
                {lblTypeOfPlace:{text:"Florist" , skin: "sknLbl2"}, imgTypeOfPlace: "florist.png", imgSearch: {skin:"sknBtn3"}, skin: "sknFlex12", type: "florist", template: flexSegTypesOfPlaces},
                {lblTypeOfPlace:{text:"Gas Station" , skin: "sknLbl2"}, imgTypeOfPlace: "gas_station.png", imgSearch: {skin:"sknBtn3"}, skin: "sknFlex15", type: "gas_station", template: flexSegTypesOfPlaces},
                {lblTypeOfPlace:{text:"Library" , skin: "sknLbl2"}, imgTypeOfPlace: "library.png", imgSearch: {skin:"sknBtn3"}, skin: "sknFlex14", type: "library", template: flexSegTypesOfPlaces},
                {lblTypeOfPlace:{text:"Lodging" , skin: "sknLbl2"}, imgTypeOfPlace: "lodging.png", imgSearch: {skin:"sknBtn3"}, skin: "sknFlex20", type: "lodging", template: flexSegTypesOfPlaces},
                {lblTypeOfPlace:{text:"Museum" , skin: "sknLbl2"}, imgTypeOfPlace: "museum.png", imgSearch: {skin:"sknBtn3"}, skin: "sknFlex14", type: "museum", template: flexSegTypesOfPlaces},
                {lblTypeOfPlace:{text:"Parking" , skin: "sknLbl2"}, imgTypeOfPlace: "parking.png", imgSearch: {skin:"sknBtn3"}, skin: "sknFlex21", type: "parking", template: flexSegTypesOfPlaces},
                {lblTypeOfPlace:{text:"Police" , skin: "sknLbl2"}, imgTypeOfPlace: "police.png", imgSearch: {skin:"sknBtn3"}, skin: "sknFlex15", type: "police", template: flexSegTypesOfPlaces},
                {lblTypeOfPlace:{text:"Post Office" , skin: "sknLbl2"}, imgTypeOfPlace: "post_office.png", imgSearch: {skin:"sknBtn3"}, skin: "sknFlex14", type: "post_office", template: flexSegTypesOfPlaces},
                {lblTypeOfPlace:{text:"Stadium" , skin: "sknLbl2"}, imgTypeOfPlace: "stadium.png", imgSearch: {skin:"sknBtn3"}, skin: "sknFlex8", type: "stadium", template: flexSegTypesOfPlaces},
                {lblTypeOfPlace:{text:"Subway Station" , skin: "sknLbl2"}, imgTypeOfPlace: "subway_station.png", imgSearch: {skin:"sknBtn3"}, skin: "sknFlex15", type: "subway_station", template: flexSegTypesOfPlaces}
            ]
        ]
    ];
  frmMap.flexAddNewKeywords.segTypesOfPlacesEdit.setData(masterDataForSegTypesOfPlacesEdit);
  frmMap.flexTypesOfPlaces.segTypesOfPlaces.setData(masterDataForSegTypesOfPlacesEdit);
}


/**
 * @function showEditKeywordsLayer
 *
 */
function hideEditKeywordsLayer()
{
  var form = kony.application.getCurrentForm();
  var dataInSegTypeOfPlaces = form.flexAddNewKeywords.segTypesOfPlacesEdit.data;
  //alert("hideEditKeywordsLayer data: " + JSON.stringify(dataInSegTypeOfPlaces));
  for (var i=0;i<dataInSegTypeOfPlaces.length;i++)
    {
      for(var j=0; j<dataInSegTypeOfPlaces[i][1].length; j++)
      {	
      	dataInSegTypeOfPlaces[i][1][j].imgSearch = {skin:"sknBtn3"};
      	//dataInSegTypeOfPlaces[i][1][j].lblTypeOfPlace.skin = {text: dataInSegTypeOfPlaces[i][1][j].lblTypeOfPlace, skin: "sknLbl2"};
       	dataInSegTypeOfPlaces[i][1][j].lblTypeOfPlace.skin = "sknLbl2";
      }
    }
  form.flexTypesOfPlaces.segTypesOfPlaces.setData(dataInSegTypeOfPlaces);

  var animationObject = kony.ui.createAnimation({100 : {"left":"-100%"}});
  var animationConfigObject = {"duration":0.25,"iterationCount":1,"delay":0,"direction":kony.anim.DIRECTION_NONE,"fillMode":kony.anim.FILL_MODE_FORWARDS};
  var animationCallbackObject = {animationEnd:emptyCallback};
  form.flexAddNewKeywords.animate(animationObject, animationConfigObject, animationCallbackObject);
}

 isFirstTime = true;

/**
 * @function addNewPlaceType
 *
 */
function addNewPlaceType()
{
  var form = kony.application.getCurrentForm();
  var keyword = form.flexAddNewKeywords.tbxKeyword.text;
  
  if (null !== keyword && "" !== keyword)
  {
    if(isFirstTime === true){
      //alert("adding section");
      form.flexAddNewKeywords.segTypesOfPlacesEdit.addSectionAt([[{lblHdrCategory: "User Defined", template: flexSegHdrCategory}, 
            [ 
                {lblTypeOfPlace: {text: keyword, skin: "sknLbl7"}, imgTypeOfPlace: "user_defined.png", imgSearch: {skin:"sknBtn4"}, skin: "sknFlex18", type: "custom", template: flexSegTypesOfPlaces}
            ]
        ]], 0);
      isFirstTime = false;    
    }
    else{
      //alert("adding row");
      form.flexAddNewKeywords.segTypesOfPlacesEdit.addDataAt({lblTypeOfPlace:{text: keyword, skin: "sknLbl7"}, imgTypeOfPlace: "user_defined.png", imgSearch: {skin:"sknBtn4"}, skin: "sknFlex18", type: "custom", template: flexSegTypesOfPlaces},0,0);
    }
  }
  else{
    alert("Please enter valid keyword");
  }
  form.flexAddNewKeywords.tbxKeyword.text = "";
}


function setAnimationForSegTypesOfPlaces(){
  var transformObject1 = kony.ui.makeAffineTransform();
  var transformObject2 = kony.ui.makeAffineTransform();
  
  transformObject1.translate(200, 0);
  transformObject2.translate(0, 0);
  
  var animationObject = kony.ui.createAnimation(
    {"0":{"transform":transformObject1,"stepConfig":{"timingFunction":kony.anim.LINEAR}},
    "100":{"transform":transformObject2,"stepConfig":{"timingFunction":kony.anim.LINEAR}}});
   	var animationConfig = {
    	duration: 1,
    	fillMode: kony.anim.FILL_MODE_FORWARDS
    };
  	var animationCallbacks = {"animationEnd":function(){kony.print("animation END");}};
  	var animationDefObject={definition:animationObject,config:animationConfig,callbacks:animationCallbacks};
  	frmMap.flexTypesOfPlaces.segTypesOfPlaces.setAnimations({visible:animationDefObject});
}

function setAnimationForSegListOfPlaces(){
  var transformObject1 = kony.ui.makeAffineTransform();
  var transformObject2 = kony.ui.makeAffineTransform();
  
  transformObject1.scale(0,0);
  transformObject2.scale(1,1);
  
  var animationObject = kony.ui.createAnimation(
    {"0":{"transform":transformObject1,"stepConfig":{"timingFunction":kony.anim.LINEAR}},
    "100":{"transform":transformObject2,"stepConfig":{"timingFunction":kony.anim.LINEAR}}});
   	var animationConfig = {
    	duration: 1,
    	fillMode: kony.anim.FILL_MODE_FORWARDS
    };
  	var animationCallbacks = {"animationEnd":function(){kony.print("animation END");}};
  	var animationDefObject={definition:animationObject,config:animationConfig,callbacks:animationCallbacks};
  	frmMap.flexListOfPlaces.segListOfPlaces.setAnimations({visible:animationDefObject});
}