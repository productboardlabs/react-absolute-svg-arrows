import React from 'react';

declare type Point = {
    x: number;
    y: number;
};

/**
 * Copyright (c) ProductBoard, Inc.
 * All rights reserved.
 */

declare type ArrowConfig = {
    arrowColor?: string;
    arrowHighlightedColor?: string;
    controlPointsColor?: string;
    boundingBoxColor?: string;
    dotEndingBackground?: string;
    dotEndingRadius?: number;
    arrowHeadEndingSize?: number;
    hoverableLineWidth?: number;
    strokeWidth?: number;
};
declare type Props = {
    startPoint: Point;
    endPoint: Point;
    isHighlighted?: boolean;
    showDebugGuideLines?: boolean;
    onMouseEnter?: (e: React.MouseEvent) => void;
    onMouseLeave?: (e: React.MouseEvent) => void;
    onClick?: (e: React.MouseEvent) => void;
    config?: ArrowConfig;
    tooltip?: string;
};
declare const Arrow: ({ startPoint, endPoint, isHighlighted, showDebugGuideLines, onMouseEnter, onMouseLeave, onClick, config, tooltip, }: Props) => JSX.Element;

export { Arrow };
