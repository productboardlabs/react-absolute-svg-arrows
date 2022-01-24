/**
 * Copyright (c) ProductBoard, Inc.
 * All rights reserved.
 */
import { Point } from "../types/Point";
export declare const calculateLowDyControlPointShift: (dx: number, dy: number, maxShift?: number) => number;
export declare const calculateDeltas: (startPoint: Point, endPoint: Point) => {
    dx: number;
    dy: number;
    absDx: number;
    absDy: number;
};
export declare const calculateCanvasDimensions: ({ absDx, absDy, boundingBoxBuffer, }: {
    absDx: number;
    absDy: number;
    boundingBoxBuffer: {
        vertical: number;
        horizontal: number;
    };
}) => {
    canvasWidth: number;
    canvasHeight: number;
};
export declare const calculateFixedLineInflectionConstant: (absDx: number, absDy: number) => number;
export declare const calculateControlPointsWithoutBoundingBox: ({ absDx, absDy, dx, dy, }: {
    absDx: number;
    absDy: number;
    dx: number;
    dy: number;
}) => {
    p1: Point;
    p2: Point;
    p3: Point;
    p4: Point;
};
export declare const calculateControlPoints: ({ boundingBoxElementsBuffer, absDx, absDy, dx, dy, }: {
    boundingBoxElementsBuffer: number;
    absDx: number;
    absDy: number;
    dx: number;
    dy: number;
}) => {
    p1: Point;
    p2: Point;
    p3: Point;
    p4: Point;
    boundingBoxBuffer: {
        vertical: number;
        horizontal: number;
    };
};
