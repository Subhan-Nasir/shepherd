<script>
    import { onMount, afterUpdate, onDestroy } from 'svelte';
    import ShepherdContent from './shepherd-content.svelte';
    import { isUndefined, isString } from '../utils/type-check.js';

    const KEY_TAB = 9;
    const KEY_ESC = 27;
    const LEFT_ARROW = 37;
    const RIGHT_ARROW = 39;

  export let classPrefix,
        element,
        descriptionId,
        firstFocusableElement,
        focusableElements,
        labelId,
        lastFocusableElement,
        step,
        dataStepId;

  let hasCancelIcon, hasTitle, classes;

  $: {
    hasCancelIcon =
        step.options &&
        step.options.cancelIcon &&
        step.options.cancelIcon.enabled;

    hasTitle = step.options && step.options.title;
  }

  export const getElement = () => element;

  onMount(() => {
        // Get all elements that are focusable
        dataStepId = { [`data-${classPrefix}shepherd-step-id`]: step.id };
        focusableElements = element.querySelectorAll(
        'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]'
        );
        firstFocusableElement = focusableElements[0];
        lastFocusableElement = focusableElements[focusableElements.length - 1];
        window.addEventListener("keydown", handleKeyDown);
  });

  onDestroy(()=>{
    window.removeEventListener("keydown", handleKeyDown);
  })

  export function removeKeyboardListener(){
    window.removeEventListener("keydown", handleKeyDown)
  }


  afterUpdate(() => {
        if (classes !== step.options.classes) {
            updateDynamicClasses();
        }
  });

    function updateDynamicClasses() {
        removeClasses(classes);
        classes = step.options.classes;
        addClasses(classes);
    }

    function removeClasses(classes) {
        if (isString(classes)) {
            const oldClasses = getClassesArray(classes);
            if (oldClasses.length) {
                element.classList.remove(...oldClasses);
            }
        }
    }

    function addClasses(classes) {
        if (isString(classes)) {
            const newClasses = getClassesArray(classes);
            if (newClasses.length) {
                element.classList.add(...newClasses);
            }
        }
    }

    function getClassesArray(classes) {
        return classes.split(' ').filter((className) => !!className.length);
    }

    /**
     * Setup keydown events to allow closing the modal with ESC
     *
     * Borrowed from this great post! https://bitsofco.de/accessible-modal-dialog/
     *
     * @private
     */
    const handleKeyDown = (e) => {
        const { tour } = step;
        switch (e.keyCode) {
        case KEY_TAB:
            if (focusableElements.length === 0) {
                e.preventDefault();
                break;
            }
            // Backward tab
            if (e.shiftKey) {
                if (
                    document.activeElement === firstFocusableElement ||
                    document.activeElement.classList.contains('shepherd-element')
                ) {
                    e.preventDefault();
                    // lastFocusableElement.focus();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    e.preventDefault();
                    // firstFocusableElement.focus();
                }
            }
            break;
        case KEY_ESC:
            if (tour.options.exitOnEsc) {
                e.stopPropagation();
                step.cancel();
            }
            break;
        case LEFT_ARROW:
            if (tour.options.keyboardNavigation) {
                e.stopPropagation();
                tour.back();
            }
            break;
        case RIGHT_ARROW:
            if (tour.options.keyboardNavigation) {
                e.stopPropagation();
                tour.next();
            }
            break;
        default:
            break;
        }
    };
</script>

<!-- <link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
/> -->

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div
    aria-describedby={!isUndefined(step.options.text) ? descriptionId : null}
    aria-labelledby={step.options.title ? labelId : null}
    bind:this={element}
    class:shepherd-has-cancel-icon={hasCancelIcon}
    class:shepherd-has-title={hasTitle}
    class:shepherd-element={true}
    {...dataStepId}
    role="dialog"
    tabindex="0"
>
    {#if step.options.arrow && step.options.attachTo && step.options.attachTo.element && step.options.attachTo.on}
        <div class="shepherd-arrow" data-popper-arrow></div>
    {/if}
    <ShepherdContent {descriptionId} {labelId} {step} />
</div>

<style global>

    @font-face {
        font-family: 'Material Symbols Outlined';
        font-style: normal;
        src: 
            url('assets/MaterialSymbolsOutlined[FILL,GRAD,opsz,wght].woff2') format('woff2'),
            url('assets/MaterialSymbolsOutlined[FILL,GRAD,opsz,wght].ttf') format('truetype');
    }

    .shepherd-material-symbols-outlined {
        font-family: 'Material Symbols Outlined';
        font-weight: normal;
        font-variation-settings: "FILL" 0,"wght" 200,"GRAD" 0,"opsz" 24;
        font-style: normal;
        font-size: 24px;
        display: inline-block;
        line-height: 1;
        text-transform: none;
        letter-spacing: normal;
        word-wrap: normal;
        white-space: nowrap;
        direction: ltr;
    }



    :root {

        --tour-primary : #007bff;

        --tour-grey-darkest     : #212529;
        --tour-grey-dark        : #60637C;
        --tour-grey-mid-darkest : #6C757D;
        --tour-grey-mid-dark    : #888888;
        --tour-grey-mid         : #C7C9D6;
        --tour-grey-mid-light   : #D6D6D6;
        --tour-grey-light       : #EFEFF4;
        --tour-grey-lightest    : #F8F9FA;

        --tour-blue-darkest  : #1F3674;
        --tour-blue-dark     : #004BB2;
        --tour-blue-mid      : var(--tour-primary);
        --tour-blue-light    : #6EA9FF;
        --tour-blue-lightest : #F1F6FF;

        --tour-success : #34c759;
        --tour-cyan    : #17a2b8;


        --tour-header-bg  : var(--tour-grey-lightest);
        /* --tour-pointer-bg : #fcfcfc; */
        --tour-pointer-bg: white;


        --tour-btn-active-shadow-col : #6161624d;

        --tour-font: "Helvetica Neue",
            Helvetica, Arial, "Lucida Grande", sans-serif;
    }

    .shepherd-element,
    .shepherd-header,
    .shepherd-footer,
    .shepherd-content {
        border-radius: 0.75rem;
    }

    .shepherd-header {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }

    .shepherd-footer {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }

    .shepherd-element {
        background: #fff;
        /* border-radius: 5px; */

        /* box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2); */
        box-shadow: 0px 0px 20px 2px rgb(0 0 0 / 15%);
        max-width: 560px;
        opacity: 0;
        outline: none;
        transition:
            opacity 0.3s,
            visibility 0.3s;

        visibility: hidden;
        width: 100%;
        z-index: 9999;


    }

    .shepherd-large-container {
        max-width: 660px;
        max-height: 650px;
    }

    .shepherd-enabled.shepherd-element {
        opacity: 1;
        visibility: visible;
    }

    .shepherd-element[data-popper-reference-hidden]:not(.shepherd-centered) {
        opacity: 0;
        pointer-events: none;
        visibility: hidden;
    }

    .shepherd-element,
    .shepherd-element *,
    .shepherd-element *:after,
    .shepherd-element *:before {
        box-sizing: border-box;
    }

    .shepherd-arrow {
        --arrow-size: 1.5rem;
        --shift: -1;

        position: absolute;
        width: var(--arrow-size);
        height: var(--arrow-size);
        background-color: var(--tour-pointer-bg);
        z-index: -1;

        /* clip-path: polygon(100% 0%, 100% 100%, 50% 50%); */

        transition: clip-path 275ms ease-in-out;

    }




    .shepherd-element[data-popper-placement^='top'] > .shepherd-arrow {
        bottom: calc(var(--shift) * var(--arrow-size));
        /* clip-path: polygon(
            0% 0%,
            0% 50%,
            50% 100%,
            100% 50%,
            100% 0%
        ); */

        clip-path: polygon(100% 0, 50% 50%, 0 0);

    }

    .shepherd-element[data-popper-placement^='bottom'] > .shepherd-arrow {
        top: calc(var(--shift) * var(--arrow-size));
        clip-path: polygon(100% 100%, 50% 50%, 0 100%);



    }

    .shepherd-element[data-popper-placement^='left'] > .shepherd-arrow {
        right: calc(var(--shift) * var(--arrow-size));
        clip-path: polygon(0 100%, 50% 50%, 0 0);

    }

    .shepherd-element[data-popper-placement^='right'] > .shepherd-arrow {
        left: calc(var(--shift) * var(--arrow-size));
        /* clip-path: polygon(100% 100%, 50% 50%, 100% 0); */
        clip-path: polygon(50% 40%, 100% 100%, 100% 0);

    }


    .shepherd-element[data-sharp-corner='TL'] {
        border-top-left-radius: 0;
    }
    .shepherd-element[data-sharp-corner='TR'] {
        border-top-right-radius: 0;
    }
    .shepherd-element[data-sharp-corner='BL'] {
        border-bottom-left-radius: 0;
    }
    .shepherd-element[data-sharp-corner='BR'] {
        border-bottom-right-radius: 0;
    }



    .shepherd-element.shepherd-centered > .shepherd-arrow {
        opacity: 0;
    }

    /**
    * Arrow on top of tooltip centered horizontally, with title color
    */
    /* .shepherd-element.shepherd-has-title[data-popper-placement^='top'] > .shepherd-arrow::before {
        border-bottom-right-radius: var(--arrow-border-radius);
    }
    .shepherd-element.shepherd-has-title[data-popper-placement^='bottom'] > .shepherd-arrow::before {
        border-top-left-radius: var(--arrow-border-radius);
    }
    .shepherd-element.shepherd-has-title[data-popper-placement^='left'] > .shepherd-arrow::before {
        border-top-right-radius: var(--arrow-border-radius);
    }
    .shepherd-element.shepherd-has-title[data-popper-placement^='right'] > .shepherd-arrow::before {
        border-bottom-left-radius: var(--arrow-border-radius);
    } */

    .shepherd-target-click-disabled.shepherd-enabled.shepherd-target,
    .shepherd-target-click-disabled.shepherd-enabled.shepherd-target * {
        pointer-events: none;
    }

</style>
