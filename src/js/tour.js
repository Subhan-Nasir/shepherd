import { Evented } from './evented.js';
import { Step } from './step.js';
import autoBind from './utils/auto-bind.js';
import {
    isHTMLElement,
    isFunction,
    isString,
    isUndefined
} from './utils/type-check.js';
import { cleanupSteps } from './utils/cleanup.js';
import { normalizePrefix, uuid } from './utils/general.js';
import ShepherdModal from './components/shepherd-modal.svelte';
import "./utils/jsdoc-types.js"

const Shepherd = new Evented();


/**
 * Class representing the site tour
 * @extends {Evented}
 */
export class Tour extends Evented {
    /**
     * @param {TourOptions} options The options for the tour
     * 
    */
    //  * @returns {Tour}
    constructor(options = {}) {
        // @ts-ignore
        super(options);

        autoBind(this);

        const defaultTourOptions = {
            exitOnEsc: true,
            keyboardNavigation: true,
            enableProgressBar: false,
        };

        this.options = Object.assign({}, defaultTourOptions, options);
        this.classPrefix = normalizePrefix(this.options.classPrefix ?? "");
        this.steps = [];
        if(this.options.steps){
            this.addSteps(this.options.steps);
        }

        // Pass these events onto the global Shepherd object
        const events = [
            'active',
            'cancel',
            'complete',
            'inactive',
            'show',
            'start'
        ];
        events.map((event) => {
            ((e) => {

                this.on(e, (/**@type {object} */opts) => {
                    opts = opts || {};
                    opts.tour = this;
                    Shepherd.trigger(e, opts);
                });
            })(event);
        });

        this.previousStepIndex = null;

        this._setTourID();

        return this;
    }

    /**
     * Adds a new step to the tour
     * @param {Object|Step} options An object containing step options or a Step instance
     * @param {number} [index] The optional index to insert the step at. If undefined, the step
     * is added to the end of the array.
     * @return {Step} The newly added step
     */
    addStep(options, index) {
        let step = options;

        if (!(step instanceof Step)) {
            step = new Step(this, step);
        } else {
            step.tour = this;
        }

        if (!isUndefined(index)) {
            this.steps.splice(index, 0, step);
        } else {
            this.steps.push(step);
        }

        return step;
    }

    /**
     * Add multiple steps to the tour
     * @param {Array<object> | Array<Step>} steps The steps to add to the tour
     */
    addSteps(steps) {
        if (Array.isArray(steps)) {
            steps.forEach((step) => {
                this.addStep(step);
            });
        }

        return this;
    }

    /**
     * Go to the previous step in the tour
     */
    back() {
        const index = this.steps.indexOf(this.currentStep);
        this.previousStepIndex = index;
        this.show(index - 1, false);
    }

    /**
     * Calls _done() triggering the 'cancel' event
     * If `confirmCancel` is true, will show a window.confirm before cancelling
     * If `confirmCancel` is a function, will call it and wait for the return value,
     * and only cancel when the value returned is true
     */
    async cancel() {
        if (this.options.confirmCancel) {


            
            
            const cancelMessage =
            this.options.confirmCancelMessage ||
            'Are you sure you want to stop the tour?';
            
            // const confirmCancelIsFunction = typeof this.options.confirmCancel === 'function';
            // const stopTour = isFunction(this.options.confirmCancel);
            //     ? await this.options.confirmCancel()
            //     : window.confirm(cancelMessage);
            // if (stopTour) {
            //     this._done('cancel');
            // }

            if(typeof this.options.confirmCancel === "function"){
                await this.options.confirmCancel();
                this._done("cancel");
            } else {
                window.confirm(cancelMessage);
            }

        } else {
            this._done('cancel');
        }
    }

    /**
     * Calls _done() triggering the `complete` event
     */
    complete() {
        this._done('complete');
    }

    /**
     * Gets the step from a given id
     * @param {Number|String} id The id of the step to retrieve
     * @return {Step} The step corresponding to the `id`
     */
    getById(id) {
        return this.steps.find((step) => {
            return step.id === id;
        });
    }

    /**
     * Gets the current step
     * @returns {Step|null}
     */
    getCurrentStep() {
        return this.currentStep;
    }

    /**
     * Hide the current step
     */
    hide() {
        const currentStep = this.getCurrentStep();

        if (currentStep) {
            return currentStep.hide();
        }
    }

    /**
     * Check if the tour is active
     * @return {boolean}
     */
    isActive() {
        return Shepherd.activeTour === this;
    }

    /**
     * Go to the next step in the tour
     * If we are at the end, call `complete`
     */
    next() {
        const index = this.steps.indexOf(this.currentStep);
        this.previousStepIndex = index;
        if (index === this.steps.length - 1) {
            this.complete();
        } else {
            this.show(index + 1, true);
        }
    }

    /**
     * Removes the step from the tour
     * @param {String} name The id for the step to remove
     */
    removeStep(name) {

        const current = this.getCurrentStep();
        const currentStepIndex = this.steps.indexOf(current);


        // Find the step, destroy it and remove it from this.steps
        this.steps.some((step, i) => {
            if (step.id === name) {
                if (step.isOpen()) {
                    step.hide();
                }

                step.destroy();
                this.steps.splice(i, 1);

                return true;
            }
        });

        if (current && current.id === name) {

            const newStepIndex = currentStepIndex - 1 >= 0 ? currentStepIndex -1 : 0;

            this.currentStep = undefined;

            // If we have steps left, show the first one, otherwise just cancel the tour
            this.steps.length ? this.show(newStepIndex) : this.cancel();

        }
    }

    /**
     * Show a specific step in the tour
     * @param {Number|String} key The key to look up the step by
     * @param {Boolean} forward True if we are going forward, false if backward
     */
    show(key = 0, forward = true) {
        const step = isString(key) ? this.getById(key) : this.steps[key];

        if (step) {

            this._updateStateBeforeShow();

            const shouldSkipStep =
                isFunction(step.options.showOn) && !step.options.showOn();

            // If `showOn` returns false, we want to skip the step, otherwise, show the step like normal
            if (shouldSkipStep) {
                this._skipStep(step, forward);
            } else {
                this.trigger('show', {
                    step,
                    previous: this.currentStep
                });

                this.currentStep = step;
                step.show();
            }
        }
    }

    /**
     * Start the tour
     */
    start() {
        this.trigger('start');

        // Save the focused element before the tour opens
        this.focusedElBeforeOpen = document.activeElement;

        this.currentStep = null;

        this._setupModal();

        this._setupActiveTour();
        this.next();
    }

    /**
     * Called whenever the tour is cancelled or completed, basically anytime we exit the tour
     * @param {String} event The event name to trigger
     * @private
     */
    _done(event) {
        const index = this.steps.indexOf(this.currentStep);
        if (Array.isArray(this.steps)) {
            this.steps.forEach((step) => step.destroy());
        }

        cleanupSteps(this);

        this.trigger(event, { index });

        Shepherd.activeTour = null;
        this.trigger('inactive', { tour: this });

        if (this.modal) {
            this.modal.hide();
        }

        if (event === 'cancel' || event === 'complete') {
            if (this.modal) {
                const modalContainer = document.querySelector(
                    '.shepherd-modal-overlay-container'
                );

                if (modalContainer) {
                    modalContainer.remove();
                }
            }
        }

        // Focus the element that was focused before the tour started
        if (isHTMLElement(this.focusedElBeforeOpen)) {
            this.focusedElBeforeOpen.focus();
        }
    }

    /**
     * Make this tour "active"
     * @private
     */
    _setupActiveTour() {
        this.trigger('active', { tour: this });

        Shepherd.activeTour = this;
    }
 
    /**
     * _setupModal create the modal container and instance
     * @private
     */
    _setupModal() {
        // console.log("SHEPHERD MODAL PROPS");
        // console.log("CLASS PREFIX: " + this.classPrefix);
        // console.log("OPACITY: " + this.options.overlayOpacity);
        // console.log("STYLES: " + this.styles);


        this.modal = new ShepherdModal({
            target: this.options.modalContainer || document.body,
            props: {
                // classPrefix: this.classPrefix,
                // styles: this.styles,
                opacity: this.options.overlayOpacity
            },
        });

        if(this.options.cancelOnOutsideClick){
            document.getElementById("tourModalOverlay")?.addEventListener("click", ()=>{
                this.cancel();
            })
        }
        if(this.options.cancelOnMouseLeave){
            document.getElementById("tourModalOverlay")?.addEventListener("mouseenter", ()=>{
                this.cancel();
            })
        }
    }

    /**
     * Called when `showOn` evaluates to false, to skip the step or complete the tour if it's the last step
     * @param {Step} step The step to skip
     * @param {Boolean} forward True if we are going forward, false if backward
     * @private
     */
    _skipStep(step, forward) {
        const index = this.steps.indexOf(step);

        if (index === this.steps.length - 1) {
            this.complete();
        } else {
            const nextIndex = forward ? index + 1 : index - 1;
            this.show(nextIndex, forward);
        }
    }

    /**
     * Before showing, hide the current step and if the tour is not
     * already active, call `this._setupActiveTour`.
     * @private
     */
    _updateStateBeforeShow() {
        if (this.currentStep) {
            this.currentStep.hide();
        }

        if (!this.isActive()) {
            this._setupActiveTour();
        }
    }

    /**
     * Sets this.id to `${tourName}--${uuid}`
     * @private
     */
    _setTourID() {
        const tourName = this.options.tourName || 'tour';

        this.id = `${tourName}--${uuid()}`;
    }

    getName() {
        return this.options.tourName;
    }

    getID() {
        return this.id;
    }


}

export { Shepherd };
