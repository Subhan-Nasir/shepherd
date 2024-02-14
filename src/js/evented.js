
import { isUndefined } from './utils/type-check';

export class Evented {

    /**
     * @type {object | null}
     */
    activeTour;

    /**
     * 
     * @param {*} event 
     * @param {*} [handler] 
     * @param {*} [ctx] 
     * @param {boolean} [once] 
     * @returns 
     */
    on(event, handler, ctx, once = false) {
        if (isUndefined(this.bindings)) {
            this.bindings = {};
        }
        if (isUndefined(this.bindings[event])) {
            this.bindings[event] = [];
        }
        this.bindings[event].push({ handler, ctx, once });

        return this;
    }


    /**
     * 
     * @param {*} event 
     * @param {*} handler 
     * @param {*} ctx 
     * @returns 
     */
    once(event, handler, ctx) {
        return this.on(event, handler, ctx, true);
    }

    /**
     * 
     * @param {*} event 
     * @param {*} handler 
     * @returns 
     */
    off(event, handler) {
        if (isUndefined(this.bindings) || isUndefined(this.bindings[event])) {
            return this;
        }

        if (isUndefined(handler)) {
            delete this.bindings[event];
        } else {
            this.bindings[event].forEach((binding, index) => {
                if (binding.handler === handler && this.bindings) {
                    this.bindings[event].splice(index, 1);
                }
            });
        }

        return this;
    }


    /**
     * 
     * @param {*} event 
     * @param  {...any} args 
     * @returns 
     */
    trigger(event, ...args) {
        if (!isUndefined(this.bindings) && this.bindings[event]) {
            this.bindings[event].forEach((binding, index) => {
                const { ctx, handler, once } = binding;

                const context = ctx || this;

                handler.apply(context, args);

                if (once && this.bindings) {
                    this.bindings[event].splice(index, 1);
                }
            });
        }

        return this;
    }
}
