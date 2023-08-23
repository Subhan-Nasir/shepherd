<script>
    import ShepherdProgress from './shepherd-progress.svelte';
    import ShepherdButton from './shepherd-button.svelte';

    export let step;
    $: buttons = step.options.buttons;

    $: backButton = buttons.find(btn => {return btn.text.includes("chevron_left")});
    $: nextButton = buttons.find(btn => {return btn.text.includes("chevron_right")});



    let tour = step.getTour();
    let allSteps = tour.steps;
    let progressBarEnabled = tour.options.enableProgressBar;


    let previousPercentage = `${Math.round(100*(tour.previousStepIndex+1)/allSteps.length)}%`
    let newPercentage = `${Math.round(100*(allSteps.indexOf(step) + 1)/allSteps.length)}%`





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

    /* .shepherd-footer .shepherd-button:last-child {
        margin-right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    } */

    .shepherd-footer-buttons {
        display: flex;
        flex-direction: row;
        gap: 0.25rem;
        /* flex-grow: 1; */
        width: 100%;
        justify-content: center;
    }




    .footer-arrows-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }

    .arrow-button {
        min-width: 40px;
        aspect-ratio: 1/1;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        margin: 0;
        font-size: 2.25rem !important;
        background: #e5e5e5;
        color: #0000002b;
    }

</style>

<footer class="shepherd-footer">

    {#if buttons && !progressBarEnabled}
        <div class="shepherd-footer-buttons">
        {#each buttons as config}
          <ShepherdButton
            {config}
            {step}
          />
        {/each}
        </div>
    {/if}

    {#if buttons && progressBarEnabled}
        <div class="footer-arrows-container">

            <ShepherdButton
                config={backButton}
                step={step}
            />
            
            <ShepherdProgress previousPercentage={previousPercentage} newPercentage={newPercentage}/>
            
            <ShepherdButton
                config={nextButton}
                step={step}
            />

        </div>


    {/if}

</footer>
