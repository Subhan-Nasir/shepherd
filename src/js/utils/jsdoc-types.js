
// import { default as Tour } from "../../types/tour";

// /**
//  * @typedef {Tour} ImportedType
//  */

// /**
//  * @type {ImportedType}
//  */
// var temp;





/**
 * @typedef {Object} TourOptions
 * @property {string} [classPrefix]
 * @property {boolean | (() => boolean) | Promise<boolean> | (() => Promise<boolean>)} [confirmCancel]
 * @property {string} [confirmCancelMessage]
 * @property {object} [defaultStepOptions]
 * @property {boolean} [exitOnEsc]
 * @property {boolean} [keyboardNavigation]
 * @property {HTMLElement} [stepsContainer]
 * @property {HTMLElement} [modalContainer]
 * @property {Array<object>} [steps]
 * @property {string} [tourName]
 * @property {string | boolean} [useModalOverlay]
 * @property {number} [overlayOpacity]
 * @property {boolean} [cancelOnOutsideClick]
 * @property {boolean} [cancelOnMouseLeave]
 * @property {boolean} [enableProgressBar]
 * @property {string} [progressBarStyle]
 */



// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------


/** @typedef { 'top'|'top-start'|'top-end'
 *            |'bottom'|'bottom-start'|'bottom-end'
 *            |'right' |'right-start'|'right-end'
 *            |'left'|'left-start'|'left-end'
 *            }
 * PopperPlacement */

/**
 * @typedef {object} AttachToOption
 * @property {HTMLElement | string | (()=>HTMLElement | string | null | undefined)} element
 * @property {PopperPlacement} [on]
* /
/**
 * @typedef {object} ResolvedAttachToOption
 * @property {HTMLElement} element
 * @property {PopperPlacement} [on]
* /

/**
 * @typedef {object} AdvanceOnOption
 * @property {string} [selector]
 * @property {string} [event]
 */


/**
 * @typedef {object} CancelIconOption
 * @property {boolean} [enabled]
 * @property {string} [label]
 */


/**
 * @typedef {object} ImageOptions 
 * @property {string} url
 * @property {number} width
 * @property {number} height
 * @property {string} [position]
 * @property {string} [classes]
 * 
 */

/**
 * @typedef {object} VideoOptions 
 * @property {string} url
 * @property {number} width
 * @property {number} height
 * @property {string} [classes]
 * 
 */


/**
 * @typedef {object} TourStepOptions
 * @property {AttachToOption[]} [attachTo]
 * @property {boolean} [autoFocus]
 * @property {AdvanceOnOption} [advanceOn]
 * @property {boolean} [arrow]
 * @property {(()=>Promise<any>)} [beforeShowPromise]
 * @property {ReadonlyArray<object>} [buttons]
 * @property {CancelIconOption} [cancelIcon]
 * @property {boolean} [canClickTarget]
 * @property {string} [classes]
 * @property {string} [highlightClass]
 * @property {string} [id]
 * 
 * @property {number} [modalOverlayOpeningPadding]
 * @property {number | {topLeft?: number; bottomLeft?: number;bottomRight?: number; topRight?: number;}} [modalOverlayOpeningRadius]
 * 
 * @property {object} [floatingUIOptions]
 * @property {boolean | ScrollToOptions } [scrollTo]
 * @property {((element: HTMLElement) => void)} [scrollToHandler]
 * @property {() => boolean} [showOn]
 * @property {string | ReadonlyArray<string> | HTMLElement | (() => string | ReadonlyArray<string> | HTMLElement)} [text]
 * @property {string | (() => string)} [title] 
 * @property {Object.<string, ((this: unknown) => void)>} [when]
 * @property {ImageOptions} [image]
 * @property {VideoOptions} [video]
 * 
 */