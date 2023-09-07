<script>
    import ShepherdProgress from './shepherd-progress.svelte';
    import ShepherdProgressDots from './shepherd-progress-dots.svelte';
    import ShepherdButton from './shepherd-button.svelte';
    

    export let step;
    
    $: buttons = step.options.buttons;
    
    $: backButton = buttons.find(btn => {return (btn.type === "back" || btn.customRole === "back")});
    $: nextButton = buttons.find(btn => {return (btn.type === "next" || btn.customRole === "next")});
    $: finishButton = buttons.find(btn => {return btn.customRole === "finish"});

    // Filter to remove falsy values
    $: navButtons = [backButton, nextButton, finishButton].filter(btn => !!btn);


    $: addtionalButtons = buttons.filter(btn => {return !navButtons.includes(btn)})

    $: console.log("NAV BUTTONS: " + navButtons );
    $: console.log("ADDITIONAL BUTTONS: " + addtionalButtons);





    let tour = step.getTour();
    let allSteps = tour.steps;
    let progressBarEnabled = tour.options.enableProgressBar;

    let numSteps = allSteps.length;
    let currentStepIndex = allSteps.indexOf(step);
    let previousStepIndex = tour.previousStepIndex

    let previousPercentage = `${Math.round(100*(previousStepIndex+1)/numSteps)}%`
    let newPercentage = `${Math.round(100*(currentStepIndex + 1)/numSteps)}%`


</script>

<style global>

    :root {
        --arrow-btn-min-width: 40px; 
    }

    .shepherd-footer {
        display: flex;
        justify-content: center;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;

        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;


        padding: 0;
        margin-top: 1rem;
        overflow: hidden;

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
        padding-bottom: 1rem;
    }


    .footer-arrows-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        background-color: transparent;
        /* border-top: 1px solid #f1f1f1 ; */
        padding: 0.5rem 1rem;
        overflow: hidden;
    }

    .arrow-button, .finish-button {
        min-width: var(--arrow-btn-min-width);
        aspect-ratio: 1/1;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        margin: 0;
        font-size: 2.25rem !important;
        /* background: #eeeeee; */
        /* color: #0000002b; */
        background-color: hsl(200 50% 50%);
        color: white;
        /* border-radius: 50%; */
    }

    .arrow-button:hover,
    .arrow-button:focus{
        background-color: hsl(211.29deg 100% 50%) !important;
    }
    
    .arrow-button:active {
        background-color: hsl(217, 100%, 37%) !important;
    }


    .finish-button{
        background-color: #67e213;
    }

    .finish-button:hover,
    .finish-button:focus{
        background-color: #619b3a !important;
    }

    .finish-button:active{
        background-color: #485d3a !important;
    }

    .spacer {
        min-width: var(--arrow-btn-min-width);
        aspect-ratio: 1/1;
    }

    .space-apart {
        justify-content: space-between;
        margin-bottom: 2rem;
    }



</style>

<footer class="shepherd-footer">

    {#if !progressBarEnabled }
        {#if addtionalButtons && addtionalButtons.length > 0}
            <div class="shepherd-footer-buttons">
                {#each addtionalButtons as config}
                    <ShepherdButton
                        {config}
                        {step}
                    />
                {/each}
            </div>
        {/if}

        {#if navButtons && navButtons.length > 1}
            <div class="footer-arrows-container">
                {#each navButtons as config}
                    <ShepherdButton
                        {config}
                        {step}
                    />
                {/each}
            </div>
        {/if}

        {#if navButtons && navButtons.length === 1}
            
            {#if backButton}

                <div class="footer-arrows-container">
                        <ShepherdButton
                            config={backButton}
                            {step}
                        />

                        <span class="spacer"></span>
                </div>

            {:else}
                <div class="footer-arrows-container">
                    <span class="spacer"></span>

                    <ShepherdButton
                        config={navButtons[0]}
                        {step}
                    />
                </div>
            {/if}
                
        
        {/if}

    {/if}



    {#if progressBarEnabled}

        <div class="additional-buttons">
            {#each addtionalButtons as btn}
                <ShepherdButton config={btn} step={step}/>
            {/each}
        </div>

        <div class="footer-arrows-container">

            {#if backButton}
                <ShepherdButton
                    config={backButton}
                    step={step}
                />
            {:else}
                <!-- spacer to center progress bar using justify-content: space-between -->
                <span class="spacer"></span>
            {/if}
            
            {#if numSteps >= 3}
                <ShepherdProgress previousPercentage={previousPercentage} newPercentage={newPercentage}/>
            {:else}
                <ShepherdProgressDots currentStepIndex={currentStepIndex} numSteps={numSteps} previousStepIndex={previousStepIndex}/>
            {/if}
                
            {#if nextButton}
                <ShepherdButton
                config={nextButton}
                step={step}
                />
            {:else if finishButton}

                <ShepherdButton
                    config={finishButton}
                    step={step}
                />
            {:else}
                <!-- spacer to center progress bar using justify-content: space-between -->
                <span class="spacer"></span>
            {/if}


        </div>


    {/if}

</footer>
