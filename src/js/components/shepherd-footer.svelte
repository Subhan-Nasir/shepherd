<script>
    import ShepherdButton from './shepherd-button.svelte';

    export let step;
    $: buttons = step.options.buttons;

  
    let tour = step.getTour();
    let allSteps = tour.steps;
    // let progressBarEnabled = tour.options.enableProgressBar;
    let progressBarEnabled = true;

    // Previous step
    let percentage = `${Math.round(100*(allSteps.indexOf(step))/allSteps.length)}%`
    // Current step
    let percentageNew = `${Math.round(100*(allSteps.indexOf(step) + 1)/allSteps.length)}%`

    // To trigger progress bar animation
    setTimeout(()=> {percentage=percentageNew},5);




</script>

<style global>
    .shepherd-footer {
        display: flex;
        justify-content: center;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;

        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;


        padding: 0 0.75rem 0.75rem;

    }

    .shepherd-footer .shepherd-button:last-child {
        margin-right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .shepherd-footer-buttons {
        display: flex;
        flex-direction: row;
        gap: 0.25rem;
        /* flex-grow: 1; */
        width: 100%;
        justify-content: center;
    }

    .shepherd-progress {
        height: 20px;
        max-width: 100px;
        min-width: 60px;
        border-radius: 10px;
        background-color: #e6e6e6;
        overflow: hidden;
        position: relative;
    }

    .shepherd-progress-bar {
        height: 100%;
        width: var(--width, 0%);
        background-color: rgb(79, 55, 98);
        transition: width 400ms ease-in;
    }

    .shepherd-progress::after {
        content: attr(data-content);
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 0.75rem;
        font-weight: bold;
        mix-blend-mode: difference;

    }


</style>

<footer class="shepherd-footer">

    {#if buttons}
        <div class="shepherd-footer-buttons">
        {#each buttons as config}
          <ShepherdButton
            {config}
            {step}
          />
        {/each}
        </div>
    {/if}

    {#if progressBarEnabled}
        <div class="shepherd-progress" data-content="{percentage}">
            <div class="shepherd-progress-bar" style="--width: {percentage};"></div>
        </div>
    {/if}

</footer>
