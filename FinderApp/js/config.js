(function () {
    WinJS.Namespace.define("Finder.Config", {
        /**
         Hockey Rink Finder
         ** /
        appName: "Hockey Rink Finder",
        staticUrl: "http://rinksi.de/home/map.json",
        pathToObject: ["rink", "rink"],
        latitudeField: "latitude",
        longidudeField: "longitude",
        nameField: "name",
        secondaryField: "address",
        / ** **/

        /**
        Vancouver Parks
        **/ /**
        appName: "Vancouver Parks",
        staticUrl: "http://datadotgcds2.cloudapp.net/v1/Hack%20OpenData/VanParkParks/?format=json",
        pathToArray: "d",
        latitudeField: "lat",
        longidudeField: "lon",
        nameField: "label",
        secondaryField: "address",
        **/


        /**
        Halton Flu
        
        appName: "Halton Flu",
        staticUrl: "http://datadotgcds2.cloudapp.net/v1/Hack%20OpenData/HaltonFluClinics/?format=json",
        pathToArray: "d",
        latitudeField: "latitude",
        longidudeField: "longitude",
        nameField: "location",
        secondaryField: "address",
        **/

        /**
        Milton : Splash
        
        appName: "Milton :Splash:",
        staticUrl: "http://www.editgrid.com/user/nikg/MiltonSplashV2.exhibit.jsonp",
        pathToArray: "items",
        latitudeField: "lat",
        longidudeField: "lon",
        nameField: "parkname",
        secondaryField: "address",
        jsonpCallback: "editgridCallback",
        **/

        /**
        Sample Flu Data from server
        **/
        appName: "Sample Server Flu Data",
        staticUrl: "http://finder-server-sample.azurewebsites.net/api/data/flu_data",
        pathToArray: "",
        latitudeField: "latitude",
        longidudeField: "longitude",
        nameField: "location",
        secondaryField: "address",
        

        /***************************************************
         * Various helper text
         ***************************************************/
        waitText: "Finding parks near you ...",
        poiDataAvailable: "Found {0} parks!",
        noPoiData: "Unable to find parks :(",
        noPoiDataMessage: "We could not locate any parks near your location.",
        noPoiDataMessageTitle: "Parks Unavailble",
        includeUserLocationOnPoiSelected: false,
        includeUserLocationOnPoiDisplayed: false,


        /**************************************************
        * SHARING CONFIGURATION
        *
        * available tokens:
        *  nameField: this is the nameField element of the given point.
        ***************************************************/
        shareTitle: "Finder App",
        shareText: "I'm at {{nameField}}",
        shareDescription: "Finder Share Description",

        /***************************************************
         * Info section on the details page. Configuration
         ***************************************************/
        infoFormat: "<h4>Here is some info about {{nameField}}.<h4>",

        /***************************************************
         * About Flyout text
         ***************************************************/
        aboutText: "This application is built on top of the <b>Finder App Template</b>",
        copyright: "RedBit Development © {0}".format(new Date().getFullYear()),
        version: RedBit.Utilities.appVersion(),
        versionFriendly: RedBit.Utilities.appVersionFriendly(false),
        contactUsText: 'If you have any comments or suggestions for {0}, email us at <a href="mailto:support@redbitdev.com">support@redbitdev.com</a>'.format('Finder.Config.appName'),

        
        /***************************************************
         * Bing Maps Key - to get a key visit http://www.bingmapsportal.com/
         ***************************************************/
        bingMapsKey: "AvOW5Fz4QTsubTTdmaVnseeZnAQ0JYwbx_6zdMdgHk6iF-pnoTE7vojUFJ1kXFTP",
        routeUrl: 'http://dev.virtualearth.net/REST/V1/Routes/Driving?o=json&wp.0={0}&wp.1={1}&rpo=points&optmz=timeWithTraffic&avoid=minimizeTolls&key={2}',

    });
})();