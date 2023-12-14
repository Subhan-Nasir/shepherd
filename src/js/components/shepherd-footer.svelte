<script>
    import ShepherdProgress from './shepherd-progress.svelte';
    import ShepherdProgressDots from './shepherd-progress-dots.svelte';
    import ShepherdButton from './shepherd-button.svelte';
    

    export let step;
    
    // $: buttons = step.options.buttons;
    
    // $: backButton = buttons.find(btn => {return (btn.type === "back" || btn.position === "left")});
    // $: nextButton = buttons.find(btn => {return (btn.type === "next" || btn.position === "right")});
    // $: finishButton = buttons.find(btn => {return btn.position === "addtional"});


    // $: navButtons = [backButton, nextButton, finishButton].filter(btn => !!btn);
    // $: addtionalButtons = buttons.filter(btn => {return !navButtons.includes(btn)});

    // $: leftButton = backButton ?? null;
    // $: rightButton = nextButton ?? finishButton ?? null;
    // $: footerPresent = (progressBarEnabled || leftButton || rightButton) ? true : false;


    $: buttons = step.options.buttons;

    $: leftButton = buttons.find(btn => {return (btn.type === "back" || btn.position === "left")}) ?? null;
    $: rightButton = buttons.find(btn => {return (btn.type === "next" || btn.position === "right")}) ?? null;
    $: footerPresent = (progressBarEnabled || leftButton || rightButton) ? true : false;
    $: addtionalButtons = buttons.filter(btn => {return btn !== leftButton && btn !== rightButton}).filter(btn => !!btn);


    let tour = step.getTour();
    let allSteps = tour.steps;
    let progressBarEnabled = tour.options.enableProgressBar;
    let progressBarStyle = tour.options.progressBarStyle;

    let numSteps = allSteps.length;
    let currentStepIndex = allSteps.indexOf(step);
    let previousStepIndex = tour.previousStepIndex;

    let previousPercentage = `${Math.round(100*(previousStepIndex+1)/numSteps)}%`;
    let newPercentage = `${Math.round(100*(currentStepIndex + 1)/numSteps)}%`;

    function isIconButton(btn){

        if(btn && btn.classes.includes("icon-button")){
            return true;
        }

        return false;
    }

    function isTextButton(btn){
        return btn.classes.includes("text-button");
    }



</script>

<style global>

    :root {
        --icon-btn-min-width: 40px; 
        --icon-btn-max-width: 60px;

       --text-btn-min-width: 100px;
       --text-btn-max-width: 200px;
    }

    .shepherd-footer {
        display: flex;
        justify-content: center;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0;

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

    .additional-buttons-container {
        display: flex;
        flex-direction: row;
        gap: 0.25rem;
        /* flex-grow: 1; */
        width: 100%;
        justify-content: center;
        padding-bottom: var(--padding-bottom);
    }

    .additional-buttons-container > * {
        margin: 0;
    }

    .additional-buttons-container.align-right {
        justify-content: end;
        padding: 1rem;
    }

    .footer-buttons-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;


        align-items: center;
        justify-items: center;


        width: 100%;
        background-color: transparent;
        padding: 0.5rem 1rem;
        overflow: hidden;
    }

    .icon-button {
        /* min-width: var(--arrow-btn-min-width); */
        max-width: 50px;
        aspect-ratio: 1/1;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        margin: 0;
        font-size: 2.25rem !important;
        background-color: var(--tour-cyan);
        color: white;

    }

    .icon-button:hover,
    .icon-button:focus{
        background-color: hsl(211.29deg 100% 50%) !important;
    }
    
    .icon-button:active {
        background-color: hsl(217, 100%, 37%) !important;
        box-shadow: 0 0 0 4px var(--tour-btn-active-shadow-col);
    }


    .finish-button{
        background-color: var(--tour-success);
    }

    .finish-button:hover,
    .finish-button:focus{
        background-color: #619b3a !important;
    }

    .finish-button:active{
        background-color: #485d3a !important;
        box-shadow: 0 0 0 4px var(--active-shadow-col);
    }

    .spacer-small {
        min-width: var(--icon-btn-min-width);
        max-width: var(--icon-btn-max-width);
        aspect-ratio: 1/1;
        border: 2px solid red;
    }

    .spacer-large {
        min-width: var(--text-btn-min-width);
        max-width: var(--text-btn-max-width);
        height: 1rem;
    }

    .space-apart {
        justify-content: space-between;
        margin-bottom: 2rem;
    }

    .left-button-container, .right-button-container {
        display: flex;
        align-items: center;
        flex: 1;
    }

    .left-button-container{
        justify-content: flex-start;
    }

    .right-button-container{
        justify-content: flex-end;
    }

    .progress-bar-container{
        display: flex;
        justify-content: center;
        align-items: center;
    }


    .btn.text-arrow-button {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    /* Arrow icon */
    .text-arrow-button > span {
        font-variation-settings:
            'FILL' 0,
            'wght' 700,
            'GRAD' 200,
            'opsz' 48
    }



</style>

<footer class="shepherd-footer">



    {#if addtionalButtons && addtionalButtons.length > 0}
        <div class="additional-buttons-container" class:align-right={!footerPresent}>
            {#each addtionalButtons as config}
                <ShepherdButton
                    {config}
                    {step}
                />
            {/each}
        </div>
    {/if}

    {#if footerPresent}

        <div class="footer-buttons-container">

            <div class="left-button-container">
                {#if leftButton}
                    <ShepherdButton config={leftButton} step={step}/>
                {/if}

            </div>

            <div class="progress-bar-container">
                {#if progressBarEnabled}
                    {#if progressBarStyle === "fill"}
                        <ShepherdProgress previousPercentage={previousPercentage} newPercentage={newPercentage}/>
                    {:else if progressBarStyle == "dots"}
                        <ShepherdProgressDots currentStepIndex={currentStepIndex} numSteps={numSteps} previousStepIndex={previousStepIndex}/>
                    {/if}
                {/if}
            </div>

            <div class="right-button-container">
                {#if rightButton}
                    <ShepherdButton config={rightButton} step={step}/>
                {/if}

            </div>




        </div>
        
    {/if}


    

</footer>
