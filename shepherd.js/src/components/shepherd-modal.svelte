<script lang="ts">
    import type { Step } from 'src/step';
    import { makeOverlayPath, type ModalOpeningRadiusType, type OverlayPathParams } from '../utils/overlay-path';


    export let
        element: SVGSVGElement,
        openingPropsList: OverlayPathParams[],
        opacity: number | undefined,
        animationLength: number = 500;

    let modalIsVisible = false;
    let rafId: number | undefined = undefined;
    let pathDefinition: string;
    let targetOpeningProps: OverlayPathParams | null = null;

    let timer: ReturnType<typeof setTimeout> | null = null;

    let isScrolling = false;
    window.addEventListener('scroll', function() {
        isScrolling = true;
        if(timer !== null) {
            clearTimeout(timer);
        }
        timer = setTimeout(function() {
            isScrolling = false;
        }, 150);
    }, false);


    $: pathDefinition = makeOverlayPath(openingPropsList);
    $: targetOpeningProps = openingPropsList.find(p => p.isTarget) ?? null;


    closeModalOpening();

    export const getElement = () => element;

    export function closeModalOpening() {
        openingPropsList = [{ width: 0, height: 0, x: 0, y: 0, r: 0}];
    }

    /**
     * Hide the modal overlay
     */
    export function hide() {
        modalIsVisible = false;

        // Ensure we cleanup all event listeners when we hide the modal
        _cleanupStepEventListeners();
    }


    interface PositionModalProps {
        modalOverlayOpeningPadding?: number;
        modalOverlayOpeningRadius?: ModalOpeningRadiusType;
        modalOverlayOpeningXOffset: number;
        modalOverlayOpeningYOffset: number;
        scrollParent: HTMLElement | null;
        element: HTMLElement;
        isTarget?: boolean;
    }



    /**
     * Uses the bounds of the element we want the opening overtop of to set the dimensions of the opening and position it
     * @param {Number} modalOverlayOpeningPadding An amount of padding to add around the modal overlay opening 
     * @param {Number | { topLeft: Number, bottomLeft: Number, bottomRight: Number, topRight: Number }}modalOverlayOpeningRadius An amount of border radius to add around the modal overlay opening
     * @param {Number} modalOverlayOpeningXOffset An amount to offset the modal overlay opening in the x-direction
     * @param {Number} modalOverlayOpeningYOffset An amount to offset the modal overlay opening in the y-direction
     * @param {HTMLElement} scrollParent The scrollable parent of the target element
     * @param {HTMLElement} targetElement The element the opening will expose
     */
    export function positionModal(
        positionPropsList: PositionModalProps[]
    ) {

        openingPropsList = positionPropsList.map(propsObj => {

            const {
                modalOverlayOpeningPadding = 0,
                modalOverlayOpeningRadius = 0,
                modalOverlayOpeningXOffset = 0,
                modalOverlayOpeningYOffset = 0,
                scrollParent,
                element,
                isTarget
            } = propsObj;

            const { y, height } = _getVisibleHeight(element, scrollParent);
            const { x, width, left } = element.getBoundingClientRect();

            // getBoundingClientRect is not consistent. Some browsers use x and y, while others use left and top
            const pathParams: OverlayPathParams = {
                width: width + modalOverlayOpeningPadding * 2,
                height: height + modalOverlayOpeningPadding * 2,
                x: (x || left) + modalOverlayOpeningXOffset - modalOverlayOpeningPadding,
                y: y + modalOverlayOpeningYOffset - modalOverlayOpeningPadding,
                r: modalOverlayOpeningRadius,
                isTarget: isTarget,
            };

            return pathParams;

        });

        if(!positionPropsList || positionPropsList.length === 0 ){
            closeModalOpening();
        }
    }

    /**
     * If modal is enabled, setup the svg mask opening and modal overlay for the step
     * @param {Step} step The step instance
     */
    export function setupForStep(step: Step) {
        // Ensure we move listeners from the previous step, before we setup new ones
        _cleanupStepEventListeners();

        if (step.tour.options.useModalOverlay) {
            _styleForStep(step);
            show();
        } else {
            hide();
        }
    }

    /**
     * Show the modal overlay
     */
    export function show() {
        modalIsVisible = true;
    }

    const _preventModalBodyTouch = (e: Event) => {
        e.preventDefault();
    };

    const _preventModalOverlayTouch = (e: Event) => {
        e.stopPropagation();
    };

    /**
     * Add touchmove event listener
     * @private
     */
    function _addStepEventListeners() {
        // Prevents window from moving on touch.
        window.addEventListener('touchmove', _preventModalBodyTouch, {
            passive: false
        });
    }

    /**
     * Cancel the requestAnimationFrame loop and remove touchmove event listeners
     * @private
     */
    function _cleanupStepEventListeners() {
        if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = undefined;
        }

        // window.removeEventListener('touchmove', _preventModalBodyTouch, {
        //     passive: false
        // });

        (<any>window).removeEventListener('touchmove', _preventModalBodyTouch, {
            passive: false
        });
    }

    /**
     * Style the modal for the step
     * @param {Step} step The step to style the opening for
     * @private
     */
    function _styleForStep(step: Step) {
        const {
            modalOverlayOpeningPadding,
            modalOverlayOpeningRadius,
            modalOverlayOpeningXOffset = 0,
            modalOverlayOpeningYOffset = 0
        } = step.options;


        const iframeOffset = _getIframeOffset(step.target ?? null);
        const scrollParent = _getScrollParent(step.target ?? null);
        const attachToOptions = step._getResolvedAttachToOptions();

        const positionPropsList: PositionModalProps[] = [];

        // if(step.target && step.highlightElements.length === 0){
        //     positionPropsList.push({
        //         modalOverlayOpeningPadding: modalOverlayOpeningPadding,
        //         modalOverlayOpeningRadius: modalOverlayOpeningRadius,
        //         modalOverlayOpeningXOffset: modalOverlayOpeningXOffset,
        //         modalOverlayOpeningYOffset: modalOverlayOpeningYOffset,
        //         scrollParent: scrollParent,
        //         element: step.target,
        //         isTarget: true,
        //     });
        // }

        // step.highlightElements.forEach(item => {
        //     positionPropsList.push({
        //         modalOverlayOpeningPadding: item.modalOverlayOpeningPadding ?? modalOverlayOpeningPadding,
        //         modalOverlayOpeningRadius: item.modalOverlayOpeningRadius ?? modalOverlayOpeningRadius,
        //         modalOverlayOpeningXOffset: modalOverlayOpeningXOffset,
        //         modalOverlayOpeningYOffset: modalOverlayOpeningYOffset,
        //         scrollParent: scrollParent,
        //         element: item.element,
        //         isTarget: item.element === step.target
        //     });
        // });

        if(step.target && attachToOptions){
            attachToOptions.forEach(item => {
                positionPropsList.push({
                    modalOverlayOpeningPadding: item.modalOverlayOpeningPadding ?? modalOverlayOpeningPadding,
                    modalOverlayOpeningRadius: item.modalOverlayOpeningRadius ?? modalOverlayOpeningRadius,
                    modalOverlayOpeningXOffset: modalOverlayOpeningXOffset,
                    modalOverlayOpeningYOffset: modalOverlayOpeningYOffset,
                    scrollParent: scrollParent,
                    element: item.element,
                    isTarget: item.isTarget,
                });
            });
        }





        // Setup recursive function to call requestAnimationFrame to update the modal opening position
        const rafLoop = () => {
            rafId = undefined;
            positionModal(positionPropsList);

            rafId = requestAnimationFrame(rafLoop);
        };

        rafLoop();

        _addStepEventListeners();
    }

    /**
     * Find the closest scrollable parent element
     * @param {HTMLElement} element The target element
     * @returns {HTMLElement}
     * @private
     */
    function _getScrollParent(element: HTMLElement | null): HTMLElement | null {
        if (!element) {
            return null;
        }

        const isHtmlElement = element instanceof HTMLElement;
        const overflowY = isHtmlElement && window.getComputedStyle(element).overflowY;
        const isScrollable = overflowY !== 'hidden' && overflowY !== 'visible';

        if (isScrollable && element.scrollHeight >= element.clientHeight) {
            return element;
        }

        if(element.parentElement){
            return _getScrollParent(element.parentElement);
        }

        return null;

    }

    /**
     * Get the top and left offset required to position the modal overlay cutout
     * when the target element is within an iframe
     * @param {HTMLElement} element The target element
     * @private
     */
    function _getIframeOffset(element: HTMLElement | null) {
        let offset = {
            top: 0,
            left: 0
        };

        if (!element) {
            return offset;
        }

        let targetWindow: Window | null = element.ownerDocument.defaultView;

        while (targetWindow !== window.top) {
            const targetIframe = targetWindow?.frameElement;

            if (targetIframe) {
                // const targetIframeRect = (targetIframe as HTMLElement).getBoundingClientRect();

                // offset.top += targetIframeRect.top + (targetIframeRect.scrollTop ?? 0);
                // offset.left += targetIframeRect.left + (targetIframeRect.scrollLeft ?? 0);

                const targetIframeEl = targetIframe as HTMLElement;
                const tragetIframeRect = targetIframeEl.getBoundingClientRect();

                offset.top += tragetIframeRect.top + (targetIframeEl.scrollTop ?? 0);
                offset.left += tragetIframeRect.top + (targetIframeEl.scrollTop ?? 0);

            }

                targetWindow = targetWindow?.parent ?? null;

        }

        return offset;
    }

    /**
     * Get the visible height of the target element relative to its scrollParent.
     * If there is no scroll parent, the height of the element is returned.
     *
     * @param {HTMLElement} element The target element
     * @param {HTMLElement} [scrollParent] The scrollable parent element
     * @returns {{y: number, height: number}}
     * @private
     */
    function _getVisibleHeight(element: HTMLElement, scrollParent: HTMLElement | null): { y: number; height: number; } {
        const elementRect = element.getBoundingClientRect();
        let top = elementRect.y || elementRect.top;
        let bottom = elementRect.bottom || top + elementRect.height;

        if (scrollParent) {
            const scrollRect = scrollParent.getBoundingClientRect();
            const scrollTop = scrollRect.y || scrollRect.top;
            const scrollBottom = scrollRect.bottom || scrollTop + scrollRect.height;

            top = Math.max(top, scrollTop);
            bottom = Math.min(bottom, scrollBottom);
        }

        const height = Math.max(bottom - top, 0); // Default to 0 if height is negative

        return { y: top, height };
    }
</script>


<style global>
    .shepherd-modal-overlay-container {
        height: 0;
        left: 0;
        opacity: 0;
        overflow: hidden;
        pointer-events: none;
        position: fixed;
        top: 0;
        transition: all 0.3s ease-out, height 0ms 0.3s, opacity 0.3s 0ms;
        width: 100vw;
        z-index: 9997;

    }

    .shepherd-modal-overlay-container.shepherd-modal-is-visible {
        height: 100vh;
        /* opacity: var(--opacity, 0.5); */
        opacity: 1;
        transition: all 0.3s ease-out, height 0s 0s, opacity 0.3s 0s;
        transform: translateZ(0);
    }

    .shepherd-modal-overlay-container.shepherd-modal-is-visible path {
        pointer-events: all;
        opacity: var(--opacity, 0.5);
        transition: all var(--animationLength) ease-in-out, opacity 0s;
    }

    .shepherd-modal-overlay-container.shepherd-modal-is-visible.no-animation path {
        transition: none;
        /* transition-duration: 50ms; */
    }


    /* .shepherd-modal-overlay-container.shepherd-modal-is-visible .outline-box {
        pointer-events: none;
    } */

    .outline-box {

        fill: none;
        stroke: var(--tour-primary);
        stroke-width: 4;
 
        transform-origin: center;

        transition: all var(--animationLength) ease-in-out;

        pointer-events: none !important;

        filter:url(#glow);

    }

    .outline-box.no-animation {
        transition: none;
        /* transition-duration: 50ms; */
    }


</style>


<svg
    id="tourModalOverlay"
    bind:this={element}
    class={`
        ${modalIsVisible ? 'shepherd-modal-is-visible' : ''}
        shepherd-modal-overlay-container
    `}
    class:no-animation={isScrolling}
    style="
        --opacity: {opacity};
        --animationLength: {animationLength}ms;
    "
    on:touchmove={_preventModalOverlayTouch}
>

    <defs>
        <!-- a transparent glow that takes on the colour of the object it's applied to -->
        <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
            <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
        </filter>

    </defs>


    <path d={pathDefinition} />

    {#if targetOpeningProps &&  typeof targetOpeningProps.r === "number"}

            <rect
                class="outline-box"
                class:no-animation={ isScrolling }
                style="
                    --animationLength: {animationLength}ms
                "
                x={ targetOpeningProps.x ?? '50%' }
                y={ targetOpeningProps.y ?? '50%' }
                height={
                    targetOpeningProps.r >= Math.min(0.5*targetOpeningProps.width, 0.5*targetOpeningProps.height) 
                        ? (2 * targetOpeningProps.r)
                        : targetOpeningProps.height
                }
                width={
                    targetOpeningProps.r >= Math.min(0.5*targetOpeningProps.width, 0.5*targetOpeningProps.height) 
                        ? (2 * targetOpeningProps.r)
                        : targetOpeningProps.width
                }
                rx={ targetOpeningProps.r }
                ry={ targetOpeningProps.r }
            />

    {/if}

</svg>

