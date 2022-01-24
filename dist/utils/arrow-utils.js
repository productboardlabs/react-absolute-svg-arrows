"use strict";
/**
 * Copyright (c) ProductBoard, Inc.
 * All rights reserved.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateControlPoints = exports.calculateControlPointsWithoutBoundingBox = exports.calculateFixedLineInflectionConstant = exports.calculateCanvasDimensions = exports.calculateDeltas = exports.calculateLowDyControlPointShift = void 0;
var MAX_Y_CONTROL_POINT_SHIFT = 50;
var MAX_X_CONTROL_POINT_SHIFT = 10;
// Y coordinates of our control points are moved in case of low delta Y to prevent lines overlapping.
// Sign flips the curve depending on delta Y.
// Movement is described according to following function: `y=a\left(0.9^{1.2^{\frac{x}{10}}}\right)`
//    1 +--------------------------------------------------------------------+
//      |       ************** +           +          +           +          |
//      |                     *******         1*(0.9**(1.2**(x/10))) ******* |
//  0.8 |-+                          *****                                 +-|
//      |                                ****                                |
//      |                                    ****                            |
//      |                                       ***                          |
//  0.6 |-+                                        ***                     +-|
//      |                                            ***                     |
//      |                                              ***                   |
//  0.4 |-+                                              ***               +-|
//      |                                                   **               |
//      |                                                     **             |
//  0.2 |-+                                                     **         +-|
//      |                                                         ***        |
//      |                                                            ***     |
//      |                                                               *****|
//    0 |-+                                                                +-|
//      |                                                                    |
//      |           +          +           +          +           +          |
// -0.2 +--------------------------------------------------------------------+
// -100         -50         0           50        100         150        200
var calculateLowDyControlPointShift = function (dx, dy, maxShift) {
    if (maxShift === void 0) { maxShift = MAX_Y_CONTROL_POINT_SHIFT; }
    if (dx > 0)
        return 0;
    var sign = dy < 0 ? -1 : 1;
    var value = Math.round(maxShift * Math.pow(0.9, Math.pow(1.2, Math.abs(dy) / 10)));
    // prevent negative zero
    if (value === 0)
        return 0;
    return sign * value;
};
exports.calculateLowDyControlPointShift = calculateLowDyControlPointShift;
var calculateDeltas = function (startPoint, endPoint) {
    var dx = endPoint.x - startPoint.x;
    var dy = endPoint.y - startPoint.y;
    var absDx = Math.abs(dx);
    var absDy = Math.abs(dy);
    return { dx: dx, dy: dy, absDx: absDx, absDy: absDy };
};
exports.calculateDeltas = calculateDeltas;
var calculateCanvasDimensions = function (_a) {
    var absDx = _a.absDx, absDy = _a.absDy, boundingBoxBuffer = _a.boundingBoxBuffer;
    var canvasWidth = absDx + 2 * boundingBoxBuffer.horizontal;
    var canvasHeight = absDy + 2 * boundingBoxBuffer.vertical;
    return { canvasWidth: canvasWidth, canvasHeight: canvasHeight };
};
exports.calculateCanvasDimensions = calculateCanvasDimensions;
// Curve flexure should remain on the same area no matter of absolute deltas, so we have to slightly shift X coordinates of our control points. It was created empirically, it's not based on a clear formula.
var calculateFixedLineInflectionConstant = function (absDx, absDy) {
    var WEIGHT_X = 4;
    var WEIGHT_Y = 0.8;
    return Math.round(Math.sqrt(absDx) * WEIGHT_X + Math.sqrt(absDy) * WEIGHT_Y);
};
exports.calculateFixedLineInflectionConstant = calculateFixedLineInflectionConstant;
var calculateControlPointsWithoutBoundingBox = function (_a) {
    var _b, _c;
    var absDx = _a.absDx, absDy = _a.absDy, dx = _a.dx, dy = _a.dy;
    var leftTopX = 0;
    var leftTopY = 0;
    var rightBottomX = absDx;
    var rightBottomY = absDy;
    if (dx < 0)
        _b = [rightBottomX, leftTopX], leftTopX = _b[0], rightBottomX = _b[1];
    if (dy < 0)
        _c = [rightBottomY, leftTopY], leftTopY = _c[0], rightBottomY = _c[1];
    var fixedLineInflectionConstant = exports.calculateFixedLineInflectionConstant(absDx, absDy);
    var lowDyYShift = exports.calculateLowDyControlPointShift(dx, dy);
    var lowDyXShift = Math.abs(exports.calculateLowDyControlPointShift(dx, dy, MAX_X_CONTROL_POINT_SHIFT));
    var p1 = {
        x: leftTopX,
        y: leftTopY,
    };
    var p2 = {
        x: leftTopX + fixedLineInflectionConstant + lowDyXShift,
        y: leftTopY + lowDyYShift,
    };
    var p3 = {
        x: rightBottomX - fixedLineInflectionConstant - lowDyXShift,
        y: rightBottomY - lowDyYShift,
    };
    var p4 = {
        x: rightBottomX,
        y: rightBottomY,
    };
    return { p1: p1, p2: p2, p3: p3, p4: p4 };
};
exports.calculateControlPointsWithoutBoundingBox = calculateControlPointsWithoutBoundingBox;
var calculateControlPoints = function (_a) {
    var boundingBoxElementsBuffer = _a.boundingBoxElementsBuffer, absDx = _a.absDx, absDy = _a.absDy, dx = _a.dx, dy = _a.dy;
    var _b = exports.calculateControlPointsWithoutBoundingBox({
        absDx: absDx,
        absDy: absDy,
        dx: dx,
        dy: dy,
    }), p1 = _b.p1, p2 = _b.p2, p3 = _b.p3, p4 = _b.p4;
    var topBorder = Math.min(p1.y, p2.y, p3.y, p4.y);
    var bottomBorder = Math.max(p1.y, p2.y, p3.y, p4.y);
    var leftBorder = Math.min(p1.x, p2.x, p3.x, p4.x);
    var rightBorder = Math.max(p1.x, p2.x, p3.x, p4.x);
    var verticalBuffer = (bottomBorder - topBorder - absDy) / 2 + boundingBoxElementsBuffer;
    var horizontalBuffer = (rightBorder - leftBorder - absDx) / 2 + boundingBoxElementsBuffer;
    var boundingBoxBuffer = {
        vertical: verticalBuffer,
        horizontal: horizontalBuffer,
    };
    return {
        p1: {
            x: p1.x + horizontalBuffer,
            y: p1.y + verticalBuffer,
        },
        p2: {
            x: p2.x + horizontalBuffer,
            y: p2.y + verticalBuffer,
        },
        p3: {
            x: p3.x + horizontalBuffer,
            y: p3.y + verticalBuffer,
        },
        p4: {
            x: p4.x + horizontalBuffer,
            y: p4.y + verticalBuffer,
        },
        boundingBoxBuffer: boundingBoxBuffer,
    };
};
exports.calculateControlPoints = calculateControlPoints;
