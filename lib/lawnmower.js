GRASSIST.lawnmower = function(homeLongitude, homeLatitude) {
    var that = {};

    var EAST = 0,
        NORTH = 1,
        WEST = 2,
        SOUTH = 3; // in order counter-clockwise
    var HEADINGS = ['east', 'north', 'west', 'south'];
    var LONGITUDE_STEPS = [1, 0, -1, 0],
        LATITUDE_STEPS = [0, 1, 0, -1];

    var heading = EAST;
    var longitude = homeLongitude,
        latitude = homeLatitude;
    var rotorEnabled = false;

    var callbacks = [];

    var onUpdate = function(callback) {
        callback(that);
        callbacks.push(callback);
    };

    var update = function() {
        callbacks.forEach(function(callback) {
            callback(that);
        });
    };

    var startRotor = function() {
        rotorEnabled = true;
        update();
        return that;
    };

    var stopRotor = function() {
        rotorEnabled = false;
        update();
        return that;
    };

    var moveForward = function() {
        longitude = longitude + LONGITUDE_STEPS[heading];
        latitude = latitude + LATITUDE_STEPS[heading];
        update();
        return that;
    };

    var turnLeft = function() {
        heading = (heading + 1) % 4;
        update();
        return that;
    };

    var turnRight = function() {
        heading = (heading + 3) % 4;
        update();
        return that;
    };

    var getPosition = function() {
        return [longitude, latitude];
    };

    var getHeading = function() {
        return HEADINGS[heading];
    };

    var isRotorEnabled = function() {
        return rotorEnabled;
    };

    var isHome = function() {
        return (longitude === homeLongitude && latitude === homeLatitude);
    };

    var newHome = function() {
        homeLongitude = longitude;
        homeLatitude = latitude;
    };

    var newHomeRow = function() {
        homeLongitude = longitude;
    };
    var homeRow = function() {
        return longitude === homeLongitude;
    };
    var homeCol = function() {
        return latitude === homeLatitude;
    };

    var newHomeCol = function() {
        homeLatitude = latitude;
    };

    that.newHomeCol = newHomeCol;
    that.homeCol = homeCol;
    that.newHomeRow = newHomeRow;
    that.homeRow = homeRow;
    that.newHome = newHome;
    that.onUpdate = onUpdate;
    that.startRotor = startRotor;
    that.stopRotor = stopRotor;
    that.moveForward = moveForward
    that.turnLeft = turnLeft;
    that.turnRight = turnRight;
    that.position = getPosition;
    that.heading = getHeading;
    that.rotorEnabled = isRotorEnabled;
    that.home = isHome;

    return that;
};