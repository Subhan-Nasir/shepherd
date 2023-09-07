<script>
    import ShepherdProgress from './shepherd-progress.svelte';
    import ShepherdButton from './shepherd-button.svelte';
    import { add_iframe_resize_listener } from 'svelte/internal';

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


    let previousPercentage = `${Math.round(100*(tour.previousStepIndex+1)/allSteps.length)}%`
    let newPercentage = `${Math.round(100*(allSteps.indexOf(step) + 1)/allSteps.length)}%`


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

        {#if navButtons && navButtons.length > 0}
            <div class="footer-arrows-container">
                {#each navButtons as config}
                    <ShepherdButton
                        {config}
                        {step}
                    />
                {/each}
            </div>
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
                
            <ShepherdProgress previousPercentage={previousPercentage} newPercentage={newPercentage}/>
                
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
