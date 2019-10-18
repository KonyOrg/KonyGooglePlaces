/**
 * @module businessLogic
 *
 * @author Venkata Raju Bankapalli <venkata.bankapalli@kony.com>
 */

// settings = {distanceUnits:"km" or "mi", mapType:"normal" or "satellite", searchOrder:"distance" or "prominence"}
settings = {distanceUnits:"km", mapType:"normal", searchOrder:"distance"};
gblStringToSeachFor = "";

/**
 *	App Key:
 *	f1c3424043477b3b27d5e996aa2d5acd
 *	App Secret:
 *	df43c93ab84210b2c6f39def6d5870a7
 *	Service URL:
 *	https://100000507.auth.konycloud.com/appconfig
 */

mobileFabricConfiguration = 
	{
		appKey:"94de2f698e2a951771ba7a3c07503993", 
		appSecret:"66d138c454b7b4416e47f0345136804a", 
		serviceURL:"https://100000507.auth.konycloud.com/appconfig",
		
  		//appKey:"f71360497a585e00b2dc76a277b9fed", 
		//appSecret:"c56cb9ea82e592dd6f97b74bb00f9993", 
		//serviceURL:"http://kh177.kitspl.com:8585/authService/100000002/appconfig",
		
  		services: 
		[
			{
				service:"GooglePlaces",
				operations:
				["placeSearch","placeDistanceMatrix","placeDetails","placeSearchByText"]
			}
		],
		konysdkObject: null,
		authClient: null,
		integrationObj: null,
		isKonySDKObjectInitialized:false
	};

function initializeMobileFabric ()
{
  	kony.print (" ********** Entering into initializeMobileFabric ********** ");
	if (kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY))
	{
        //var selData = frmMap.flexTypesOfPlaces.segTypesOfPlaces.selectedItems[0];
        //alert("selData: " + selData);
      	var selData;
      	if ("" === gblStringToSeachFor)
        	selData = frmMap.flexTypesOfPlaces.segTypesOfPlaces.selectedItems[0];
      	else 
        	selData = {skin: sknFlex18, lblTypeOfPlace: {text: gblStringToSeachFor, skin:sknLbl2}, imgSearch:{skin:sknBtn3}, imgTypeOfPlace: "user_defined.png", type: "custom", template: "LuaFlexContainer:flexSegTypesOfPlaces"};
      	if (false === mobileFabricConfiguration.isKonySDKObjectInitialized) 
        {
  		  showProgressIndicator (selData.lblTypeOfPlace.text);
          mobileFabricConfiguration.konysdkObject = new kony.sdk();
          mobileFabricConfiguration.konysdkObject.init(mobileFabricConfiguration.appKey,mobileFabricConfiguration.appSecret,mobileFabricConfiguration.serviceURL,initializeMobileFabricSuccess,initializeMobileFabricFailure);  
        }
      else 
        {
          // Call the integration service
  		  showProgressIndicator(selData.lblTypeOfPlace.text);
		  fetchPlaces ();
        }
	}
	else
      	showMessage ("Network unavailable. Please check your network settings. ");
	kony.print (" ********** Exiting out of initializeMobileFabric ********** ");
}

function initializeMobileFabricSuccess(response)
{
	kony.print (" ********** Entering into initializeMobileFabricSuccess ********** ");
	kony.print (" ********** Success in : " + JSON.stringify(response) + " ********** ");
	mobileFabricConfiguration.isKonySDKObjectInitialized=true;
	fetchPlaces ();
	kony.print (" ********** Exiting out of initializeMobileFabricSuccess ********** ");
}

function initializeMobileFabricFailure(error)
{
	kony.print (" ********** Entering into initializeMobileFabricFailure ********** ");
	kony.print (" ********** Failure in initializeMobileFabric: " + JSON.stringify(error) + " ********** ");
  	showMessage (" Unable to initialize the application. Please try again. ");
	kony.print (" ********** Exiting out of initializeMobileFabricFailure ********** ");
}

function fetchPlaces ()
{
	kony.print (" ********** Entering into fetchPlaces ********** ");
  	var positionoptions = {enableHighAccuracy: false, maximumAge: 120000};
  	kony.location.getCurrentPosition(getCurrentPositionSuccessCallback, getCurrentPositionUsingGPSErrorCallback, positionoptions);
	kony.print (" ********** Exiting out of fetchPlaces ********** ");
}

function getCurrentPositionSuccessCallback (position)
{
  	//var selData = frmMap.flexTypesOfPlaces.segTypesOfPlaces.selectedItems[0];
  	//alert("selData: "+selData.lblTypeOfPlace);
    var selData;
  	if ("" === gblStringToSeachFor)
      selData = frmMap.flexTypesOfPlaces.segTypesOfPlaces.selectedItems[0];
    else 
      selData = {skin: sknFlex18, lblTypeOfPlace: {text: gblStringToSeachFor, skin:sknLbl2}, imgSearch:{skin:sknBtn3}, imgTypeOfPlace: "user_defined.png", type: "custom", template: "LuaFlexContainer:flexSegTypesOfPlaces"};
  	var selIndex = frmMap.flexTypesOfPlaces.segTypesOfPlaces.selectedRowIndex;
	kony.print (" ********** Entering into getCurrentPositionSuccessCallback ********** ");
	gblPosition = position;
	if (kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY))
	{
      	currentLatitude = position.coords.latitude;
      	currentLongitude = position.coords.longitude;
		mobileFabricConfiguration.integrationObj = mobileFabricConfiguration.konysdkObject.getIntegrationService(mobileFabricConfiguration.services[0].service);
		var operationName = "";
      	var data = {};
      	var headers= {};
      if(selData.type !== "custom"){
          operationName = mobileFabricConfiguration.services[0].operations[0];
          if ("distance" === settings.searchOrder)
              data= {"latitude": ""+currentLatitude,"longitude": ""+currentLongitude,"rankby": settings.searchOrder,"type":selData.type};
          if ("prominence" === settings.searchOrder)
              data= {"latitude": ""+position.coords.latitude,"longitude": ""+position.coords.longitude,"rankby": settings.searchOrder,"type":selData.type, "radius":5000};
        }
      else{
        operationName = mobileFabricConfiguration.services[0].operations[3];
        data= {"latitude": ""+position.coords.latitude,"longitude": ""+position.coords.longitude,"query": selData.lblTypeOfPlace.text, "radius":5000};
      }
      	mobileFabricConfiguration.integrationObj.invokeOperation(operationName, headers, data, fetchPlacesSuccessCallback, fetchPlacesErrorCallback);
	}
	else
      	showMessage ("Network unavailable. Please check your network settings. ");

	kony.print (" ********** Exiting out of getCurrentPositionSuccessCallback ********** ");
}

function getCurrentPositionUsingGPSErrorCallback (error)
{
	kony.print (" ********** Entering into getCurrentPositionErrorCallback ********** ");
	kony.print (" ********** Failure in getCurrentPositionErrorCallback: " + JSON.stringify(error) + " ********** ");
  	var positionoptions = {enableHighAccuracy: false, maximumAge: 120000};
  	kony.location.getCurrentPosition(getCurrentPositionSuccessCallback, getCurrentPositionErrorCallback, positionoptions);
  	kony.print (" ********** Exiting out of getCurrentPositionErrorCallback ********** ");
}

function getCurrentPositionErrorCallback (error)
{
	kony.print (" ********** Entering into getCurrentPositionErrorCallback ********** ");
	kony.print (" ********** Failure in getCurrentPositionErrorCallback: " + JSON.stringify(error) + " ********** ");
	dismissLoadingIndicator ();
	showMessage ("Unable to retrieve the device current location. Please enable location service (GPS) on your device");
  	kony.print (" ********** Exiting out of getCurrentPositionErrorCallback ********** ");
}

function fetchPlacesSuccessCallback (placesDetails)
{
	kony.print (" ********** Entering into fetchPlacesSuccessCallback ********** ");
	kony.print(" ********** placesDetails: " + JSON.stringify(placesDetails) + " ********** ");
	gblPlacesDetails = placesDetails;
	//var image = frmMap.flexTypesOfPlaces.segTypesOfPlaces.selectedItems[0].imgTypeOfPlace.src;
  	//var image = frmMap.flexTypesOfPlaces.segTypesOfPlaces.selectedItems[0].imgTypeOfPlace;
    var image;
  	if ("" === gblStringToSeachFor)
      image = frmMap.flexTypesOfPlaces.segTypesOfPlaces.selectedItems[0].imgTypeOfPlace;
  	else
      image = "user_defined.png";
  	if (placesDetails.opstatus === 0)
	{
      // Setting data into the listOfPlaces segment and map
      frmMap.flexListOfPlaces.segListOfPlaces.widgetDataMap = {imgTypeOfPlace:"pinImage",lblPlaceName:"name",lblPlaceAddress:"vicinity",lblPlaceDistance:"distance", lblPlaceRating:"rating"};
      var destinations = "";
      //frmMap.map.calloutTemplate.flex1.skin = frmMap.flexTypesOfPlaces.segTypesOfPlaces.selectedItems[0].skin.text;
      //frmMap.map.calloutTemplate.flex1.skin = frmMap.flexTypesOfPlaces.segTypesOfPlaces.selectedItems[0].skin;
      if ("" === gblStringToSeachFor)
        frmMap.map.calloutTemplate.flex1.skin = frmMap.flexTypesOfPlaces.segTypesOfPlaces.selectedItems[0].skin;
      else
        frmMap.map.calloutTemplate.flex1.skin = sknFlex18;
      
      if (null !== gblPlacesDetails.placeSearchResults && undefined !== gblPlacesDetails.placeSearchResults)
      {
        for (i=0; i<gblPlacesDetails.placeSearchResults.length; i++)
        {
          if (i != placesDetails.placeSearchResults.length-1)
            destinations = destinations + "" + gblPlacesDetails.placeSearchResults[i].lat+","+gblPlacesDetails.placeSearchResults[i].lon+"|";
          else
            destinations = destinations + "" + gblPlacesDetails.placeSearchResults[i].lat+","+gblPlacesDetails.placeSearchResults[i].lon;
          gblPlacesDetails.placeSearchResults[i].pinImage = image;
          gblPlacesDetails.placeSearchResults[i].image = {source: pinImage, sourceType: kony.map.PIN_IMG_SRC_TYPE_IMAGE, anchor: kony.map.PIN_IMG_ANCHOR_BOTTOM_CENTER};
          gblPlacesDetails.placeSearchResults[i].calloutData = {"lblPlaceName":placesDetails.placeSearchResults[i].name, "lblPlaceAddress":placesDetails.placeSearchResults[i].vicinity};
        }
	  
        mobileFabricConfiguration.integrationObj = mobileFabricConfiguration.konysdkObject.getIntegrationService(mobileFabricConfiguration.services[0].service);
        var operationName = mobileFabricConfiguration.services[0].operations[1];
        var data = {"destinations": destinations,"originlng": currentLongitude,"originlat": currentLatitude, "units":settings.distanceUnits};
        var headers= {};
        mobileFabricConfiguration.integrationObj.invokeOperation(operationName, headers, data, fetchPlaceDistanceMatrixSuccessCallback, fetchPlaceDistanceMatrixErrorCallback);
      }
      else
      {
		  dismissLoadingIndicator ();
	  	  showMessage ("No places found of type " + frmMap.flexTypesOfPlaces.segTypesOfPlaces.selectedItems[0].type);      
      }
    }
  	else 
    {
  	  showMessage ("Error occured during the service call. Opstatus: "+placesDetails.opstatus);      
    }
	kony.print (" ********** Exiting out of fetchPlacesSuccessCallback ********** ");
}

/**
 * @function fetchPlacesErrorCallback
 *
 */
function fetchPlacesErrorCallback (error)
{
	kony.print (" ********** Entering into fetchPlacesErrorCallback ********** ");
	kony.print (" ********** Failure in fetchPlacesErrorCallback: " + JSON.stringify(error) + " ********** ");
	dismissLoadingIndicator ();
	showMessage (" Failed to fetch the place details. Please try again. ");
	kony.print (" ********** Exiting out of fetchPlacesErrorCallback ********** ");
}

/**
 * @function fetchPlaceDistanceMatrixErrorCallback
 *
 */
function fetchPlaceDistanceMatrixErrorCallback (error)
{
	kony.print (" ********** Entering into fetchPlaceDistanceMatrixErrorCallback ********** ");
	kony.print (" ********** Failure in fetchPlaceDistanceMatrixErrorCallback: " + JSON.stringify(error) + " ********** ");
	dismissLoadingIndicator ();
	showMessage (" Failed to fetch the place distance matrix. Please try again. ");
	kony.print (" ********** Exiting out of fetchPlaceDistanceMatrixErrorCallback ********** ");
}

/**
 * @function fetchPlaceDistanceMatrixSuccessCallback
 *
 */
function fetchPlaceDistanceMatrixSuccessCallback (placeDistanceMatrix)
{
	kony.print (" ********** Entering into fetchPlaceDistanceMatrixSuccessCallback ********** ");
	kony.print (" ********** placeDistanceMatrix: " + JSON.stringify(placeDistanceMatrix) + " ********** ");
	//var image = frmMap.flexTypesOfPlaces.segTypesOfPlaces.selectedItems[0].imgTypeOfPlace.src;
  	//var image = frmMap.flexTypesOfPlaces.segTypesOfPlaces.selectedItems[0].imgTypeOfPlace;
  	var image;
  	if ("" === gblStringToSeachFor)
      image = frmMap.flexTypesOfPlaces.segTypesOfPlaces.selectedItems[0].imgTypeOfPlace;
  	else
      image = "user_defined.png";
  
  	if (placeDistanceMatrix.opstatus === 0)
	{
      for (i=0; i<placeDistanceMatrix.placeDistanceMatrixResults.length; i++)
      {
        gblPlacesDetails.placeSearchResults[i].distance = placeDistanceMatrix.placeDistanceMatrixResults[i].distance;
        gblPlacesDetails.placeSearchResults[i].calloutData.lblPlaceDistance = placeDistanceMatrix.placeDistanceMatrixResults[i].distance;
        gblPlacesDetails.placeSearchResults[i].calloutData.lblPlaceRating = gblPlacesDetails.placeSearchResults[i].rating;
      }
      frmMap.map.locationData = gblPlacesDetails.placeSearchResults;      
      frmMap.flexListOfPlaces.segListOfPlaces.setData(gblPlacesDetails.placeSearchResults);
      dismissLoadingIndicator ();
      closeAnimationForFlexTypesOfPlaces(false);
  	  frmMap.flexListOfPlaces.setVisibility(true);
      openAnimationForFlexListOfPlaces();
	}
  	else 
    {
		showMessage ("Error occured during the service call. Opstatus: "+placesDetails.opstatus);      
    }
	kony.print (" ********** Exiting out of fetchPlaceDistanceMatrixSuccessCallback ********** ");
  
}

/**
 * @function navigateToPinOnMapFromListOfPlaces
 *
 */
function navigateToPinOnMapFromListOfPlaces ()
{
  	//alert("gblLocationDataForSelectedPin: " + JSON.stringify(frmMap.map.locationData[frmMap.flexListOfPlaces.segListOfPlaces.selectedRowIndex[1]]));
  	gblLocationDataForSelectedPin = frmMap.map.locationData[frmMap.flexListOfPlaces.segListOfPlaces.selectedRowIndex[1]];
    frmMap.map.navigateTo(frmMap.flexListOfPlaces.segListOfPlaces.selectedRowIndex[1], true);
  	closeAnimationForFlexListOfPlaces(false);
}

/**
 * @function onSelectionCallbackForMap
 *
 */
function onSelectionCallbackForMap (mapID, locationData)
{
  //#ifdef iphone
  	//alert ("gblLocationDataForSelectedPin: "+JSON.stringify(gblLocationDataForSelectedPin));
    if (null !== locationData)
    {
      frmMapDetails.lblPlaceName.text = locationData.lblPlaceName.text;
      frmMapDetails.lblPlaceAddress.text = locationData.lblPlaceAddress.text;
      frmMapDetails.flex1PlaceDetails.skin = frmMap.map.calloutTemplate.flex1.skin;
      frmMapDetails.flex2.setVisibility(true);
      frmMapDetails.flexDirections.setVisibility(true);
      frmMapDetails.flexRoutes.setVisibility(false);
      frmMapDetails.flexTurnByTurnDirections.setVisibility(false);
      frmMapDetails.map1.locationData = [gblLocationDataForSelectedPin];
      frmMapDetails.map1.removePolyline("route");
      frmMapDetails.imgBack.onTouchEnd = backToMapForm;
      frmMapDetails.show();
    }
  //#endif
  //#ifdef android
    if (null !== locationData.calloutData)
    {
      frmMapDetails.lblPlaceName.text = locationData.calloutData.lblPlaceName;
      frmMapDetails.lblPlaceAddress.text = locationData.calloutData.lblPlaceAddress;
      //frmMapDetails.lblPlaceDistance.text = locationData.calloutData.lblPlaceDistance;
      locationData.showcallout = false;
      frmMapDetails.flex1PlaceDetails.skin = frmMap.map.calloutTemplate.flex1.skin;
      frmMapDetails.flex2.setVisibility(true);
      frmMapDetails.flexDirections.setVisibility(true);
      frmMapDetails.flexRoutes.setVisibility(false);
      frmMapDetails.flexTurnByTurnDirections.setVisibility(false);
      frmMapDetails.map1.locationData = [locationData];
      frmMapDetails.map1.removePolyline("route");
      frmMapDetails.imgBack.onTouchEnd = backToMapForm;
	  frmMapDetails.show();
    }
  //#endif
}

/**
 * @function backToMapForm
 *
 */
function backToMapForm ()
{
  frmMap.show();
}

function searchAndDrawRoutes (eventObject)
{ 
  transportModeDetails = eventObject;
  //alert ("currentLatitude: "+currentLatitude+"\n"+"currentLongitude:"+currentLongitude+"\n"+"destinationLatitude: "+frmMapDetails.map1.locationData[0].lat+"\n"+"destinationLongitue: "+frmMapDetails.map1.locationData[0].lon+"\n"+"transportMode: "+eventObject.id);
  transportMode = "driving";
  if ("img1" === eventObject.id)
    transportMode = "driving";
  else if ("img2" === eventObject.id)
    transportMode = "walking";
  else if ("img3" === eventObject.id)
    transportMode = "bicycling";
  var searchCriteria = 
      {
        origin:{lat:currentLatitude, lon:currentLongitude},
        destination:{lat:frmMapDetails.map1.locationData[0].lat, lon:frmMapDetails.map1.locationData[0].lon},
        transportMode:transportMode,
        directionServiceUrl:"https://maps.googleapis.com/maps/api/directions/json",
        apiKey:"AIzaSyB6bC-mTG5wRMUi6Zh_0ktX3oGJwb-Q8Hw",//"AIzaSyCOrODi3j0Vn-MRN1PzzA-fxrt-kuhrno4",
        alternatives: true
      };
  kony.map.searchRoutes(searchCriteria, successCallback, failureCallback);
}

/**
 * @function successCallback
 *
 */
function successCallback (routes)
{
  if (null !== routes && routes.length > 0)
    {
      var dataForSegRoutes = [];
      frmMapDetails.lblPlaceName.text = "Routes from current location to " + frmMapDetails.lblPlaceName.text;
      var route = {};
      for (i=0;i<routes.length;i++)
      {
        route = {"imgTransportMode":{src:transportModeDetails.src},"lblRouteDistaneAndTime":"Distance "+(routes[i].distance / 1000).toFixed(2)+" km, Duration "+ (routes[i].duration / 60).toFixed(2)+" min","routeDetails":routes[i]};
        dataForSegRoutes.push (route);
      }
      frmMapDetails.segRoutes.setData(dataForSegRoutes);
      frmMapDetails.flex2.setVisibility(false);
      frmMapDetails.flexDirections.setVisibility(false);
      frmMapDetails.flexRoutes.setVisibility(true);
      frmMapDetails.flexTurnByTurnDirections.setVisibility(false);
      //alert (JSON.stringify(dataForSegRoutes));
    }
  else
    {
	  alert ("No "+transportMode+" routes founds");
    }
}

/**
 * @function failureCallback
 *
 */
function failureCallback (error)
{
  alert (JSON.stringify(error));

  kony.print (" ********** "+JSON.stringify(error));  
}

/**
 * @function showRouteDetails
 *
 */
function showRouteDetails ()
{
  frmMapDetails.imgBack.setVisibility(true);
  frmMapDetails.imgBack.onTouchEnd = callBackForImgBack;
  
  var selectedRoute = frmMapDetails.segRoutes.selectedItems[0];
  //alert (JSON.stringify(selectedRoute.routeDetails.legs[0].steps));
  var drawRoute = 
      {
        id: "route",          
        startLocation:{lat:selectedRoute.routeDetails.startLocation.lat,lon:selectedRoute.routeDetails.startLocation.lon,image:frmMapDetails.map1.locationData[0].image},
        endLocation:{lat:selectedRoute.routeDetails.endLocation.lat,lon:selectedRoute.routeDetails.endLocation.lon},
        locations:selectedRoute.routeDetails.polylinePoints,
        polylineConfig:{lineColor:"0x0000ffff", lineWidth:"5"}
      };
  var selectedRouteTurnByTurnDirections = [];
  var turnByTurnDirections = {};
  var steps = selectedRoute.routeDetails.legs[0].steps;
  for (i=0;i<steps.length;i++)
  {
    turnByTurnDirections = {"imgDirection":{src:transportModeDetails.src},"lblDistanceAndDuration":"Distance "+steps[i].distance+" mts, Duration "+steps[i].duration+" sec","rtxInstruction":steps[i].instruction};
    selectedRouteTurnByTurnDirections.push (turnByTurnDirections);
  }
  //alert (JSON.stringify(selectedRouteTurnByTurnDirections));
  frmMapDetails.segTurnByTurnDirections.setData (selectedRouteTurnByTurnDirections);
  frmMapDetails.flexTurnByTurnDirections.setVisibility(true);
  frmMapDetails.flexRoutes.setVisibility(false);
  frmMapDetails.map1.addPolyline (drawRoute);
  frmMapDetails.show();
}

/**
 * @function callBackForImgBack
 *
 */
function callBackForImgBack ()
{
  frmMapDetails.flexTurnByTurnDirections.setVisibility(false);
  frmMapDetails.flexRoutes.setVisibility(true);  
  //frmMapDetails.imgBack.setVisibility(false);
  frmMapDetails.map1.removePolyline("route");
  frmMapDetails.imgBack.onTouchEnd = backToMapForm;
}

/**
 * @function cordovaToKony
 *
 */
function cordovaToKony (stringToSeachFor)
{
  gblStringToSeachFor = stringToSeachFor;
  //alert ("In cordovaToKony: " + stringToSeachFor);
  createPinImage ();
  initializeMobileFabric ();
}