/// <reference types="react" />
declare type Point = {
    x: number;
    y: number;
};
export declare const calculateLowDyControlPointShift: (dx: number, dy: number, maxShift?: number) => number;
export declare const calculateDeltas: (startPoint: Point, targetPoint: Point) => {
    dx: number;
    dy: number;
    absDx: number;
    absDy: number;
};
export declare const calculateControlPoints: ({ absDx, absDy, dx, dy, }: {
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
export declare const calculateControlPointsWithBuffer: ({ boundingBoxElementsBuffer, absDx, absDy, dx, dy, }: {
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
declare function App(): JSX.Element;
export default App;
