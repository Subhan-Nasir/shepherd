// /**
//  * Generates the svg path data for a rounded rectangle overlay
//  * @param {Object} dimension - Dimensions of rectangle.
//  * @param {number} width - Width.
//  * @param {number} height - Height.
//  * @param {number} [x=0] - Offset from top left corner in x axis. default 0.
//  * @param {number} [y=0] - Offset from top left corner in y axis. default 0.
//  * @param {number | { topLeft: number, topRight: number, bottomRight: number, bottomLeft: number }} [r=0] - Corner Radius. Keep this smaller than half of width or height.
//  * @returns {string} - Rounded rectangle overlay path data.
//  */




/** 
    @param {Object[]} propertiesList - list of props

    @returns {string} - overlay path
*/
export function makeOverlayPath(propertiesList) {

    // { width, height, x = 0, y = 0, r = 0 }
    const { innerWidth: w, innerHeight: h } = window;
    
    let path = `
        M${w},${h}\
        H0\
        V0\
        H${w}\
        V${h}\
        Z\
    `;

    // let secondProps = Object.assign({}, propertiesList[0]);

    // secondProps.width = secondProps.width + 50;
    // secondProps.height = secondProps.height + 25;
    // secondProps.x = secondProps.x + 200;
    // secondProps.y = secondProps.y + 200;
    // secondProps.r = 20;

    // propertiesList.push(secondProps);
    // console.log("PROPERTIES LIST: ");
    // console.log(propertiesList);

    propertiesList.forEach(props => {

        const { width, height, x = 0, y = 0, r = 0 } = props;
        const {
            topLeft = 0,
            topRight = 0,
            bottomRight = 0,
            bottomLeft = 0
        } = typeof r === 'number'
                ? { topLeft: r, topRight: r, bottomRight: r, bottomLeft: r }
                : r;

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


    });


    // let path = `
    //     M${w},${h}\
    //     H0\
    //     V0\
    //     H${w}\
    //     V${h}\
    //     Z\
    //     M${x + topLeft},${y}\
    //     a${topLeft},${topLeft},0,0,0-${topLeft},${topLeft}\
    //     V${height + y - bottomLeft}\
    //     a${bottomLeft},${bottomLeft},0,0,0,${bottomLeft},${bottomLeft}\
    //     H${width + x - bottomRight}\
    //     a${bottomRight},${bottomRight},0,0,0,${bottomRight}-${bottomRight}\
    //     V${y + topRight}\
    //     a${topRight},${topRight},0,0,0-${topRight}-${topRight}\
    //     Z\
    // `;

    // path += `
    //     M${ x2 + topLeft},${ y2 }\
    //     a${topLeft},${topLeft},0,0,0-${topLeft},${topLeft}\
    //     V${height + y2 - bottomLeft}\
    //     a${bottomLeft},${bottomLeft},0,0,0,${bottomLeft},${bottomLeft}\
    //     H${width + x2 - bottomRight}\
    //     a${bottomRight},${bottomRight},0,0,0,${bottomRight}-${bottomRight}\
    //     V${y2 + topRight}\
    //     a${topRight},${topRight},0,0,0-${topRight}-${topRight}\
    //     Z
    // `

    // console.log("DRAWING PATH");
    // console.log(path);

    return path;
}
