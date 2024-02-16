/**
 * Cleanup the steps and set pointerEvents back to 'auto'
 * @param {object} tour The tour object
 */
export function cleanupSteps(tour) {
  if (tour) {
    const { steps } = tour;


    steps.forEach((/** @type {object} */ step) => {
      if (
        step.options &&
        step.options.canClickTarget === false &&
        step.options.attachTo
      ) {
        if (step.target instanceof HTMLElement) {
          // step.target.classList.remove('shepherd-target-click-disabled');
          step.enableTargetClicks();
        }
      }
    });
  }
}
