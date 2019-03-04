GRASSIST.planner = function() {
    var that = {};

    // Start Lawnmower
    var startLawnmower = function(lawnmower, yard) {
        if (yard.patchType(lawnmower.position()[0], lawnmower.position()[1]) === "long_grass") {
            lawnmower.startRotor()
        }
    }

    // Surroundings
    var eastPatchType = function(lawnmower, yard) {
        return yard.patchType((lawnmower.position()[0] + 1), lawnmower.position()[1])
    };
    var westPatchType = function(lawnmower, yard) {
        return yard.patchType((lawnmower.position()[0] - 1), lawnmower.position()[1])
    };
    var northPatchType = function(lawnmower, yard) {
        return (lawnmower.position()[1] + 1 < yard.size()[1] ? yard.patchType(lawnmower.position()[0], (lawnmower.position()[1] + 1)) : undefined)
    };
    var southPatchType = function(lawnmower, yard) {
        return (lawnmower.position()[1] - 1 > 0 ? yard.patchType(lawnmower.position()[0], (lawnmower.position()[1] - 1)) : undefined)
    };

    // Basic Movement
    var longGrassMovement = function(lawnmower) {
        if (lawnmower.rotorEnabled() !== true) {
            lawnmower.moveForward().startRotor()
        } else {
            lawnmower.moveForward();
        }
    }

    var mulchGravelMovement = function(lawnmower) {
        if (lawnmower.rotorEnabled()) {
            lawnmower.stopRotor().moveForward()
        } else {
            lawnmower.moveForward();
        }
    }

    // Directional Movement

    var eastMovement = function(lawnmower, yard) {
        switch (eastPatchType(lawnmower, yard)) {
            case "long_grass":
                longGrassMovement(lawnmower);
                break;
            case "mulch_gravel":
                mulchGravelMovement(lawnmower);
                break;
            case "short_grass":
            case "sidewalk":
                lawnmower.moveForward();
                break;
            default:
                lawnmower.turnLeft().turnLeft();
        }
    }

    var northMovement = function(lawnmower, yard) {
        switch (northPatchType(lawnmower, yard)) {
            case "long_grass":
                longGrassMovement(lawnmower);
                break;
            case "mulch_gravel":
                mulchGravelMovement(lawnmower);
                break;
            case "short_grass":
            case "sidewalk":
                lawnmower.moveForward();
                break;
            default:
                lawnmower.turnRight();
        }
    }

    var westMovement = function(lawnmower, yard) {
        switch (westPatchType(lawnmower, yard)) {
            case "long_grass":
                longGrassMovement(lawnmower);
                break;
            case "mulch_gravel":
                mulchGravelMovement(lawnmower);
                break;
            case "short_grass":
            case "sidewalk":
                lawnmower.moveForward();
                break;
            default:
                lawnmower.turnRight();
        }
    }

    var southMovement = function(lawnmower, yard) {
        switch (westPatchType(lawnmower, yard)) {
            case "long_grass":
                longGrassMovement(lawnmower);
                break;
            case "mulch_gravel":
                mulchGravelMovement(lawnmower);
                break;
            default:
                lawnmower.moveForward();
        }
    }

    //Advanced Movement
    var avoidFlowerEast = function(lawnmower, yard) {
        lawnmower.turnRight();
        while (eastPatchType(lawnmower, yard) === "plant_flower") {
            southMovement(lawnmower, yard);
        }
        lawnmower.turnLeft();
        eastMovement(lawnmower, yard)
        while (northPatchType(lawnmower, yard) === "plant_flower") {
            if (eastPatchType(lawnmower, yard) === "plant_flower") {
                break;
            }
            eastMovement(lawnmower, yard);
        }
        lawnmower.turnLeft();
        while (northPatchType(lawnmower, yard) !== "long_grass") {
            northMovement(lawnmower, yard);
        }
        northMovement(lawnmower, yard)
        lawnmower.turnRight();
    };

    var avoidFlowerWest = function(lawnmower, yard) {
        debugger;
        lawnmower.turnLeft().turnLeft();
        while (eastPatchType(lawnmower, yard) !== undefined) {
            eastMovement(lawnmower, yard);
        }
        lawnmower.turnRight();
        while (southPatchType(lawnmower, yard) === "long_grass" || southPatchType(lawnmower, yard) === "short_grass" || southPatchType(lawnmower, yard) === "mulch_gravel" || southPatchType(lawnmower, yard) === "sidewalk") {
            southMovement(lawnmower, yard);
        }
        lawnmower.turnRight();
        while (westPatchType(lawnmower, yard) !== undefined) {
            westMovement(lawnmower, yard);
        }
        lawnmower.turnRight();
        while (northPatchType(lawnmower, yard) !== "long_grass") {
            northMovement(lawnmower, yard)
        }
    };


    // Plan
    var plan = function(lawnmower, yard) {
        startLawnmower(lawnmower, yard);
        while (yard.freshlyCut() != true) {
            while (lawnmower.heading() === "east") {
                if (eastPatchType(lawnmower, yard) === "plant_flower") {
                    avoidFlowerEast(lawnmower, yard);
                } else {
                    eastMovement(lawnmower, yard);
                }
                if (yard.freshlyCut()) {
                    break;
                }
            }
            while (lawnmower.heading() === "north") {
                northMovement(lawnmower, yard);
                if (yard.freshlyCut()) {
                    break;
                }
                lawnmower.turnRight();
            }
            while (lawnmower.heading() === "west") {
                if (westPatchType(lawnmower, yard) === "plant_flower") {
                    avoidFlowerWest(lawnmower, yard);
                } else {
                    westMovement(lawnmower, yard);
                }
                if (yard.freshlyCut()) {
                    break;
                }

            }
        }
        lawnmower.stopRotor();
    };




    that.plan = plan;

    return that;
};