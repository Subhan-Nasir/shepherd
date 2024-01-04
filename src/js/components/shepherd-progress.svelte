<script>

    import ShepherdButton from './shepherd-button.svelte';

    // export let previousPercentage;
    // export let newPercentage;

    export let previousStep;
    export let currentStep;
    export let numSteps;

    let previousPercentage = `${Math.round(100*previousStep/numSteps)}%`;
    let newPercentage = `${Math.round(100*currentStep/numSteps)}%`;


    let percentage = previousPercentage;
    setTimeout(()=>{percentage = newPercentage}, 5);

</script>

<style>

    :root {
        --progress-width: 150px;
        --progress-height: 1.5rem;
        --progress-border-radius: calc(var(--progress-height)*0.5);
    }


    .shepherd-progress {
        position: relative;
        border: 0;
        width: var(--progress-width, 100px);
        height: 1.5rem;
        line-height: 1;
        font-family: sans-serif;
        font-weight: bold;
        font-size: 0.875rem;
        background-color: #DDEEF3;
        overflow: hidden;
        border-radius: var(--progress-border-radius)

    }
    .shepherd-progress .shepherd-progress-text {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);

        width: var(--progress-width, 100px);
        text-align: center;
        color: black;

    }

    .shepherd-progress .shepherd-progress-bar {
        height: 100%;
        overflow: hidden;
        width: var(--width, 0%);
        background-color: #3E95BB;
        /*   border-radius: 999px; */
        /*   box-shadow: 0 0 0 1px white; */
        overflow: hidden;
        position: relative;

        transition: width 300ms ease-in;
        border-radius: var(--progress-border-radius);
    }
    .shepherd-progress .shepherd-progress-bar .shepherd-progress-text {
        color: white;
    }


</style>

<div class="shepherd-progress">
    <div class="shepherd-progress-text">{currentStep} of {numSteps}</div>
    <div class="shepherd-progress-bar" style="--width:{percentage};">
        <!-- <div class="shepherd-progress-text">{percentage}</div> -->
        <div class="shepherd-progress-text">{currentStep} of {numSteps}</div>
    </div>
</div>



