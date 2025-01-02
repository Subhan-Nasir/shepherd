<script>

  export let currentStep;
  export let numSteps;

</script>

<style global>
  .shepherd-progress-text{
    color: var(--tour-grey-dark);
    font-weight: bold;
  }
</style>

<div class="shepherd-progress-text">
  {currentStep} of {numSteps}
</div>

