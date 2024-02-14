import merge from 'deepmerge';
import { Evented } from './evented.js';
import autoBind from './utils/auto-bind.js';
import {
    isElement,
    isHTMLElement,
    isFunction,
    isUndefined
} from './utils/type-check.js';
import { bindAdvance } from './utils/bind.js';
import { parseAttachTo, normalizePrefix, uuid } from './utils/general.js';
import {
    setupTooltip,
    destroyTooltip,
    mergeTooltipConfig
} from './utils/floating-ui.js';
import ShepherdElement from './components/shepherd-element.svelte';
import "./utils/jsdoc-types.js"



/**
 * A class representing steps to be added to a tour.
 * @extends {Evented}
 */
export class Step extends Evented {
    /**
     * Create a step
     * @param {object} tour The tour for the step
     * @param {TourStepOptions} options The options for the step
     */
    constructor(tour, options = {}) {
        // @ts-ignore
        super(tour, options);
        this.tour = tour;
        this.classPrefix = this.tour.options
            ? normalizePrefix(this.tour.options.classPrefix)
            : '';
        this.styles = tour.styles;

        /**
         * Resolved attachTo options. Due to lazy evaluation, we only resolve the options during `before-show` phase.
         * Do not use this directly, use the _getResolvedAttachToOptions method instead.
         * @type {null|[]|{element:string, on:string}[]}
         * @private
         */
        this._resolvedAttachTo = null;

        autoBind(this);

        this._setOptions(options);

        /** @type {HTMLElement | null} */
        this.el = null;

        /** @type {HTMLElement | null | undefined} */
        this.target = null;

        return this;
    }

    /**
     * Cancel the tour
     * Triggers the `cancel` event
     */
    cancel() {
        this.tour.cancel();
        this.trigger('cancel');
    }

    /**
     * Complete the tour
     * Triggers the `complete` event
     */
    complete() {
        this.tour.complete();
        this.trigger('complete');
    }

    /**
     * Remove the step, delete the step's element, and destroy the FloatingUI instance for the step.
     * Triggers `destroy` event
     */
    destroy() {
        destroyTooltip(this);

        if (isHTMLElement(this.el)) {
            this.el.remove();
            this.el = null;
        }

        this._updateStepTargetOnHide();

        if (this.shepherdElementComponent) {
            this.shepherdElementComponent.$destroy();
        }

        this.trigger('destroy');
    }

    /**
     * Returns the tour for the step
     * @return {object} The tour instance
     */
    getTour() {
        return this.tour;
    }

    /**
     * Hide the step
     */
    hide() {
        this.tour.modal.hide();

        this.trigger('before-hide');

        if (this.el) {
            this.el.hidden = true;
        }

        this._updateStepTargetOnHide();

        console.log("SHEPHERD HIDE");
        if (this.shepherdElementComponent) {
            this.shepherdElementComponent.removeKeyboardListener();
        }

        this.trigger('hide');

    }

    /**
     * Resolves attachTo options.
     * @returns {[]|{element: string, on: string}[]}
     * @private
     */
    _resolveAttachToOptions() {
        this._resolvedAttachTo = parseAttachTo(this);
        return this._resolvedAttachTo;
    }

    /**
     * A selector for resolved attachTo options.
     * @returns {[]|{element:string, on:string}[]}
     * @private
     */
    _getResolvedAttachToOptions() {
        if (this._resolvedAttachTo === null) {
            return this._resolveAttachToOptions();
        }

        return this._resolvedAttachTo;
    }

    /**
     * Check if the step is open and visible
     * @return {boolean} True if the step is open and visible
     */
    isOpen() {
        return Boolean(this.el && !this.el.hidden);
    }

    /**
     * Wraps `_show` and ensures `beforeShowPromise` resolves before calling show
     * @return {*|Promise}
     */
    show() {
        if (isFunction(this.options.beforeShowPromise)) {
            return Promise.resolve(this.options.beforeShowPromise()).then(() =>
                this._show()
            );
        }
        return Promise.resolve(this._show());
    }

    /**
     * Updates the options of the step.
     *
     * @param {Object} options The options for the step
     */
    updateStepOptions(options) {
        Object.assign(this.options, options);

        if (this.shepherdElementComponent) {
            this.shepherdElementComponent.$set({ step: this });
        }
    }

    /**
     * Returns the element for the step
     * @return {HTMLElement|null|undefined} The element instance. undefined if it has never been shown, null if it has been destroyed
     */
    getElement() {
        return this.el;
    }

    /**
     * Returns the target for the step
     * @return {HTMLElement|null|undefined} The element instance. undefined if it has never been shown, null if query string has not been found
     */
    getTarget() {
        return this.target;
    }

    /**
     * Creates Shepherd element for step based on options
     *
     * @return {HTMLElement} The DOM element for the step tooltip
     * @private
     */
    _createTooltipContent() {
        const descriptionId = `${this.id}-description`;
        const labelId = `${this.id}-label`;

        this.shepherdElementComponent = new ShepherdElement({
            target: this.tour.options.stepsContainer || document.body,
            props: {
                classPrefix: this.classPrefix,
                descriptionId,
                labelId,
                step: this
                // styles: this.styles
            }
        });

        // return this.shepherdElementComponent.getElement();
        return /**@type {HTMLElement} */ (this.shepherdElementComponent.getElement());
    }

    /**
     * If a custom scrollToHandler is defined, call that, otherwise do the generic
     * scrollIntoView call.
     *
     * @param {boolean|Object} scrollToOptions If true, uses the default `scrollIntoView`,
     * if an object, passes that object as the params to `scrollIntoView` i.e. `{ behavior: 'smooth', block: 'center' }`
     * @private
     */
    _scrollTo(scrollToOptions) {
        const attachToOptions = this._getResolvedAttachToOptions();

        const element = attachToOptions.find(option => {
            if(option.element && option.on){
                return true;
            }
            return false;
        })?.element;

        if (isFunction(this.options.scrollToHandler) && element) {
            this.options.scrollToHandler(element);
        } else if (
            isElement(element) &&
            typeof element.scrollIntoView === 'function'
        ) {
            element.scrollIntoView(scrollToOptions);
        }
    }

    /**
     * _getClassOptions gets all possible classes for the step
     * @param {Object} stepOptions The step specific options
     * @returns {String} unique string from array of classes
     * @private
     */
    _getClassOptions(stepOptions) {
        const defaultStepOptions =
            this.tour && this.tour.options && this.tour.options.defaultStepOptions;
        const stepClasses = stepOptions.classes ? stepOptions.classes : '';
        const defaultStepOptionsClasses =
            defaultStepOptions && defaultStepOptions.classes
                ? defaultStepOptions.classes
                : '';
        const allClasses = [
            ...stepClasses.split(' '),
            ...defaultStepOptionsClasses.split(' ')
        ];
        const uniqClasses = new Set(allClasses);

        return Array.from(uniqClasses).join(' ').trim();
    }

    /**
     * Sets the options for the step, maps `when` to events, sets up buttons
     * @param {Object} options The options for the step
     * @private
     */
    _setOptions(options = {}) {
        let tourOptions =
            this.tour && this.tour.options && this.tour.options.defaultStepOptions;

        tourOptions = merge({}, tourOptions || {});

        this.options = Object.assign(
            {
                arrow: true
            },
            tourOptions,
            options,
            mergeTooltipConfig(tourOptions, options)
        );

        const { when } = this.options;

        this.options.classes = this._getClassOptions(options);

        this.destroy();
        this.id = this.options.id || `step-${uuid()}`;

        if (when) {
            Object.keys(when).forEach((event) => {
                this.on(event, when[event], this);
            });
        }
    }

    /**
     * Create the element and set up the FloatingUI instance
     * @private
     */
    _setupElements() {
        if (!isUndefined(this.el)) {
            this.destroy();
        }

        this.el = this._createTooltipContent();

        if (this.options.advanceOn) {
            bindAdvance(this);
        }

        // The tooltip implementation details are handled outside of the Step
        // object.
        setupTooltip(this);
    }

    /**
     * Triggers `before-show`, generates the tooltip DOM content,
     * sets up a FloatingUI instance for the tooltip, then triggers `show`.
     * @private
     */
    _show() {
        this.trigger('before-show');

        // Force resolve to make sure the options are updated on subsequent shows.
        this._resolveAttachToOptions();
        this._setupElements();

        if (!this.tour.modal) {
            this.tour._setupModal();
        }

        this.tour.modal.setupForStep(this);
        this._styleTargetElementForStep(this);
        // this.el.hidden = false;
        if(this.el){
            this.el.hidden = false;
        }

        // start scrolling to target before showing the step
        if (this.options.scrollTo) {
            setTimeout(() => {
                this._scrollTo(this.options.scrollTo);
            });
        }

        // this.el.hidden = false;
        if(this.el){
            this.el.hidden = false
        }

        const content = this.shepherdElementComponent?.getElement();
        const target = this.target || document.body;
        target.classList.add(`${this.classPrefix}shepherd-enabled`);
        target.classList.add(`${this.classPrefix}shepherd-target`);
        content.classList.add('shepherd-enabled');

        this.trigger('show');
    }

    /**
     * Modulates the styles of the passed step's target element, based on the step's options and
     * the tour's `modal` option, to visually emphasize the element
     *
     * @param step The step object that attaches to the element
     * @private
     */
    _styleTargetElementForStep(step) {
        const targetElement = step.target;

        if (!targetElement) {
            return;
        }

        if (step.options.highlightClass) {
            targetElement.classList.add(step.options.highlightClass);
        }

        targetElement.classList.remove('shepherd-target-click-disabled');

        if (step.options.canClickTarget === false) {
            targetElement.classList.add('shepherd-target-click-disabled');
        }
    }

    /**
     * When a step is hidden, remove the highlightClass and 'shepherd-enabled'
     * and 'shepherd-target' classes
     * @private
     */
    _updateStepTargetOnHide() {
        const target = this.target || document.body;

        if (this.options.highlightClass) {
            target.classList.remove(this.options.highlightClass);
        }

        target.classList.remove(
            'shepherd-target-click-disabled',
            `${this.classPrefix}shepherd-enabled`,
            `${this.classPrefix}shepherd-target`
        );
    }
}
