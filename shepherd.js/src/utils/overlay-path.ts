export interface OverlayPathParams {
    height: number;
    r?: ModalOpeningRadiusType
    x?: number;
    y?: number;
    width: number;
    isTarget?: boolean;
}

export type ModalOpeningRadiusType = number | { topLeft?: number, bottomLeft?: number, bottomRight?: number, topRight?: number }

/**
 * Generates the svg path data for a rounded rectangle overlay
 * @param dimension - Dimensions of rectangle.
 * @param dimension.width - Width.
 * @param dimension.height - Height.
 * @param dimension.x - Offset from top left corner in x axis. default 0.
 * @param dimension.y - Offset from top left corner in y axis. default 0.
 * @param dimension.r - Corner Radius. Keep this smaller than half of width or height.
 * @returns Rounded rectangle overlay path data.
 */
export function makeOverlayPath(paramsList: OverlayPathParams[]) {

    const { innerWidth: w, innerHeight: h } = window;

    let path = `
        M${w},${h}\
        H0\
        V0\
        H${w}\
        V${h}\
        Z\
    `;

    paramsList.forEach(props => {
        const { width, height, x = 0, y = 0, r = 0 } = props;
        const { topLeft = 0, topRight = 0, bottomRight = 0, bottomLeft = 0 } = typeof r === 'number'
        ? { topLeft: r, topRight: r, bottomRight: r, bottomLeft: r }
        : r;


        if(typeof r === "number" && r >= Math.min(0.5*width, 0.5*height)){
            // Circle
            console.log("DRAWING CIRCLE");
            path += `
                M${x + 0.5*width},${y + 0.5*height}\
                m${r}, 0\
                a${r},${r} 0 1,0 -${r * 2},0\
                a${r},${r} 0 1,0 ${r * 2},0\
            `;

        } else {

            path += `
                M${x + topLeft},${y}\
                a${topLeft},${topLeft},0,0,0-${topLeft},${topLeft}\
                V${height + y - bottomLeft}\
                a${bottomLeft},${bottomLeft},0,0,0,${bottomLeft},${bottomLeft}\
                H${width + x - bottomRight}\
                a${bottomRight},${bottomRight},0,0,0,${bottomRight}-${bottomRight}\
                V${y + topRight}\
                a${topRight},${topRight},0,0,0-${topRight}-${topRight}\
                Z\
            `;

        }

    });

    return path;

}


export function makeOutlinePath(paramsList: OverlayPathParams[]){
    const { innerWidth: w, innerHeight: h } = window;

    let path = "";

    paramsList.forEach(props => {
        const { width, height, x = 0, y = 0, r = 0 } = props;
        const { topLeft = 0, topRight = 0, bottomRight = 0, bottomLeft = 0 } = typeof r === 'number'
        ? { topLeft: r, topRight: r, bottomRight: r, bottomLeft: r }
        : r;


        if(typeof r === "number" && r >= Math.min(0.5*width, 0.5*height)){
            // Circle
            console.log("DRAWING CIRCLE");
            path += `
                M${x + 0.5*width},${y + 0.5*height}\
                m${r}, 0\
                a${r},${r} 0 1,0 -${r * 2},0\
                a${r},${r} 0 1,0 ${r * 2},0\
            `;

        } else {

            path += `
                M${x + topLeft},${y}\
                a${topLeft},${topLeft},0,0,0-${topLeft},${topLeft}\
                V${height + y - bottomLeft}\
                a${bottomLeft},${bottomLeft},0,0,0,${bottomLeft},${bottomLeft}\
                H${width + x - bottomRight}\
                a${bottomRight},${bottomRight},0,0,0,${bottomRight}-${bottomRight}\
                V${y + topRight}\
                a${topRight},${topRight},0,0,0-${topRight}-${topRight}\
                Z\
            `;

        }

    });

    return path;



}
