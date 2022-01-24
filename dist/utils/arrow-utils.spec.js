var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
/**
 * Copyright (c) ProductBoard, Inc.
 * All rights reserved.
 */
import { calculateDeltas, calculateLowDyControlPointShift, calculateFixedLineInflectionConstant, calculateCanvasDimensions, calculateControlPointsWithoutBoundingBox, calculateControlPoints, } from './arrow-utils';
describe('calculateDeltas', function () {
    it('calculates deltas', function () {
        var sourcePoint = {
            x: 0,
            y: 0,
        };
        var targetPoint = {
            x: 100,
            y: 200,
        };
        expect(calculateDeltas(sourcePoint, targetPoint)).toEqual({
            absDx: 100,
            absDy: 200,
            dx: 100,
            dy: 200,
        });
    });
    it('calculates deltas when the end point is before the start one', function () {
        var sourcePoint = {
            x: 100,
            y: 200,
        };
        var targetPoint = {
            x: -100,
            y: -100,
        };
        expect(calculateDeltas(sourcePoint, targetPoint)).toEqual({
            absDx: 200,
            absDy: 300,
            dx: -200,
            dy: -300,
        });
    });
});
describe('calculateLowDyControlPointShift', function () {
    var MAX_Y_CONTROL_POINT_SHIFT = 50;
    test.each(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    dx     | dy      | expected\n    ", "  | ", "   | ", "\n    ", " | ", " | ", "\n    ", " | ", " | ", "\n    ", " | ", " | ", "\n    ", " | ", "  | ", "\n    ", " | ", "    | ", "\n    ", " | ", "   | ", "\n    ", " | ", "  | ", "\n    ", " | ", "  | ", "\n    ", " | ", "  | ", "\n  "], ["\n    dx     | dy      | expected\n    ", "  | ", "   | ", "\n    ", " | ", " | ", "\n    ", " | ", " | ", "\n    ", " | ", " | ", "\n    ", " | ", "  | ", "\n    ", " | ", "    | ", "\n    ", " | ", "   | ", "\n    ", " | ", "  | ", "\n    ", " | ", "  | ", "\n    ", " | ", "  | ", "\n  "])), 10, 10, 0, -10, -300, 0, -10, -200, -1, -10, -100, -26, -10, -10, -44, -10, 0, 45, -10, 10, 44, -10, 100, 26, -10, 200, 1, -10, 300, 0)("calculates control low dY point shift when dx = $dx and dy = $dy", function (_a) {
        var dx = _a.dx, dy = _a.dy, expected = _a.expected;
        expect(calculateLowDyControlPointShift(dx, dy, MAX_Y_CONTROL_POINT_SHIFT)).toBe(expected);
    });
});
describe('calculateFixedLineInflectionConstant', function () {
    test.each(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    absDx    | absDy   | expected\n    ", "    | ", "   | ", "\n    ", "  | ", "   | ", "\n    ", "    | ", " | ", "\n    ", " | ", " | ", "\n  "], ["\n    absDx    | absDy   | expected\n    ", "    | ", "   | ", "\n    ", "  | ", "   | ", "\n    ", "    | ", " | ", "\n    ", " | ", " | ", "\n  "])), 10, 10, 15, 1000, 10, 129, 10, 1000, 38, 10000, 3000, 444)("calculates fixed line inflection constant when absDx = $absDx and absDy = $absDy", function (_a) {
        var absDx = _a.absDx, absDy = _a.absDy, expected = _a.expected;
        expect(calculateFixedLineInflectionConstant(absDx, absDy)).toBe(expected);
    });
});
describe('calculateCanvasDimensions', function () {
    it('calculates canvas dimensions with bounding box buffer', function () {
        expect(calculateCanvasDimensions({
            absDx: 1000,
            absDy: 100,
            boundingBoxBuffer: {
                vertical: 50,
                horizontal: 20,
            },
        })).toEqual({
            canvasHeight: 200,
            canvasWidth: 1040,
        });
    });
});
describe('calculateControlPointsWithoutBoundingBox', function () {
    it('calculates control points without bounding box', function () {
        expect(calculateControlPointsWithoutBoundingBox({
            absDx: 1000,
            absDy: 100,
            dx: 1000,
            dy: 100,
        })).toEqual({
            p1: {
                x: 0,
                y: 0,
            },
            p2: {
                x: 134,
                y: 0,
            },
            p3: {
                x: 866,
                y: 100,
            },
            p4: {
                x: 1000,
                y: 100,
            },
        });
    });
});
describe('calculateControlPoints', function () {
    it('calculates control points with bounding box', function () {
        expect(calculateControlPoints({
            absDx: 1000,
            absDy: 100,
            dx: 1000,
            dy: 100,
            boundingBoxElementsBuffer: 20,
        })).toEqual({
            p1: {
                x: 20,
                y: 20,
            },
            p2: {
                x: 154,
                y: 20,
            },
            p3: {
                x: 886,
                y: 120,
            },
            p4: {
                x: 1020,
                y: 120,
            },
            boundingBoxBuffer: {
                horizontal: 20,
                vertical: 20,
            },
        });
    });
});
var templateObject_1, templateObject_2;
//# sourceMappingURL=arrow-utils.spec.js.map