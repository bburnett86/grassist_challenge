GRASSIST.planner = function() {
    var that = {};

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

    var calculatedMovement = function(lawnmower, yard) {
        switch (eastPatchType(lawnmower, yard)) {
            case "long_grass":
                if (lawnmower.rotorEnabled() !== true) {
                    lawnmower.moveForward().startRotor()
                } else {
                    lawnmower.moveForward();
                }
                break;
            case "mulch_gravel":
                if (lawnmower.rotorEnabled() === true) {
                    lawnmower.stopRotor().moveForward()
                } else {
                    lawnmower.moveForward();
                }
                break;
            case "short_grass":
            case "sidewalk":
                lawnmower.moveForward();
                break;
            case "plant_flower":
                avoidFlowers(lawnmower, yard)
            default:
                lawnmower.turnLeft().turnLeft();
        }
        if (!seenArray.includes(lawnmower.position().join())) {
            seenArray.push(lawnmower.position().join())
        }
        if (yard.freshlyCut()) {
            break;
        }
    }

    // Avoid Flowers Method
    var avoidFlowers = function(lawnmower, yard) {
        if (lawnmower.heading() === "east") {
            lawnmower.turnRight();
            while (lawnmower.eastPatchType(lawnmower, yard) === "plant_flower") {
                calculatedMovement(lawnmower, yard);
            }
            lawnmower.turnLeft();
            lawnmower.calculatedMovement();
            if (eastPatchType(lawnmower, yard) === "plant_flower") {
                break;
            }
            while (lawnmower.northPatchType === "plant_flower") {
                calculatedMovement(lawnmower, yard);
            }
            lawnmower.turnLeft();
            while ((lawnmower.northPatchType(lawnmower, yard) != "long_grass") || (lawnmower.northPatchType(lawnmower, yard) != "plant_flower")) {
                calculatedMovement(lawnmower, yard);
                if (lawnmower.northPatchType === "long_grass") {
                    calculatedMovement(lawnmower, yard);
                    break;
                } else if (lawnmower.northPatchType(lawnmower, yard) === "plant_flower") {
                    break;
                }
            }
        }
    }

    // When East Turn South

    // Go South until East !== plant_flower

    // Go East Until North != plant_flower

    // Go North until Heading === long_grass

    //Go East, break



    var plan = function(lawnmower, yard) {
        let seenArray = [];
        debugger;
        if (yard.patchType(lawnmower.position()[0], lawnmower.position()[1]) === "long_grass") {
            lawnmower.startRotor()
        }
        while (yard.freshlyCut() != true) {
            while (lawnmower.heading() === "east") {
                switch (eastPatchType(lawnmower, yard)) {
                    case "long_grass":
                        if (lawnmower.rotorEnabled() !== true) {
                            lawnmower.moveForward().startRotor()
                        } else {
                            lawnmower.moveForward();
                        }
                        break;
                    case "mulch_gravel":
                        if (lawnmower.rotorEnabled() === true) {
                            lawnmower.stopRotor().moveForward()
                        } else {
                            lawnmower.moveForward();
                        }
                        break;
                    case "short_grass":
                    case "sidewalk":
                        lawnmower.moveForward();
                        break;
                    default:
                        lawnmower.turnLeft().turnLeft();
                }
                if (!seenArray.includes(lawnmower.position().join())) {
                    seenArray.push(lawnmower.position().join())
                }
                if (yard.freshlyCut()) {
                    break;
                }

            }
            while (lawnmower.heading() === "north") {
                switch (northPatchType(lawnmower, yard)) {
                    case "long_grass":
                        if (lawnmower.rotorEnabled() !== true) {
                            lawnmower.moveForward().startRotor()
                        } else {
                            lawnmower.moveForward();
                        }
                        break;
                    case "mulch_gravel":
                        if (lawnmower.rotorEnabled() === true) {
                            lawnmower.stopRotor().moveForward()
                        } else {
                            lawnmower.moveForward();
                        }
                        break;
                    case "short_grass":
                    case "sidewalk":
                        lawnmower.moveForward();
                        break;
                    default:
                        lawnmower.turnRight();
                }
                if (!seenArray.includes(lawnmower.position().join())) {
                    seenArray.push(lawnmower.position().join())
                }
                if (yard.freshlyCut()) {
                    break;
                }
                lawnmower.turnRight();
            }
            while (lawnmower.heading() === "west") {
                switch (westPatchType(lawnmower, yard)) {
                    case "long_grass":
                        if (lawnmower.rotorEnabled() !== true) {
                            lawnmower.moveForward().startRotor()
                        } else {
                            lawnmower.moveForward();
                        }
                        break;
                    case "short_grass":
                    case "sidewalk":
                        lawnmower.moveForward();
                        break;
                    case "mulch_gravel":
                        if (lawnmower.rotorEnabled() === true) {
                            lawnmower.stopRotor().moveForward()
                        } else {
                            lawnmower.moveForward();
                        }
                    case "plant_flower":
                        lawnmower.turnRight()
                        break;
                    default:
                        lawnmower.turnRight();
                }
                if (!seenArray.includes(lawnmower.position().join())) {
                    seenArray.push(lawnmower.position().join())
                }
                if (yard.freshlyCut()) {
                    break;
                }

            }
            // while (lawnmower.heading() === "south") {
            //     switch (southPatchType(lawnmower, yard)) {
            //         case "long_grass":
            //             if (lawnmower.rotorEnabled() !== true) {
            //                 lawnmower.moveForward().startRotor()
            //             } else {
            //                 lawnmower.moveForward();
            //             }
            //             break;
            //         case "sidewalk":
            //             lawnmower.moveForward();
            //             break;
            //         default:
            //             lawnmower.turnLeft();
            //     }
            //     seenArray.push(lawnmower.position().join())
            //     if (yard.freshlyCut()) {
            //         break;
            //     }
            // }
        }

        lawnmower.stopRotor();
    };

    that.seenArray = [];
    that.southPatchType = southPatchType;
    that.northPatchType = northPatchType;
    that.westPatchType = westPatchType;
    that.eastPatchType = eastPatchType;
    that.plan = plan;

    return that;
};