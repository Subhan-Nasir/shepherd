<script>

    export let numSteps;

    export let currentStepIndex;
    export let previousStepIndex;


    let movingForward = currentStepIndex > previousStepIndex;

    let defaultBg = "#c0c0c0";
    let fillBg = "#4095bf";

    let defaultSize = "0.5rem";
    let bigSize = "1.1rem";

    let fillBgAnimated = defaultBg;
    let bigSizeAnimated = defaultSize;
    let defaultSizeAnimated = bigSize;
    let defaultBgAnimated = fillBg;

    setTimeout(()=>{
        fillBgAnimated = fillBg;
        bigSizeAnimated = bigSize;
        defaultBgAnimated = defaultBg;
        defaultSizeAnimated = defaultSize;

    }, 5)


</script>

<style global>

    .shepherd-dots {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        color: white;
        flex: 1;

    }

    .shepherd-dot{
        width: var(--dot-size, 0.5rem);
        aspect-ratio: 1/1;
        border-radius: 50%;
        background-color: var(--dot-bg, #c0c0c0);

        transition:  all 500ms ease-in-out;
        
    }

</style>

<div class="shepherd-dots">
    {#each [...Array(numSteps).keys()] as i }
        {#if i < currentStepIndex}
            <div class="shepherd-dot"
            style="--dot-size: {defaultSize}; --dot-bg: {fillBg}"
            ></div> 
        
        {/if}

        {#if i === currentStepIndex}
            <div class="shepherd-dot" 
                style="--dot-size: {bigSizeAnimated}; --dot-bg: {fillBgAnimated}"
                >
            </div> 
        {/if}

        {#if i > currentStepIndex && i === previousStepIndex && !movingForward}
            <div class="shepherd-dot"
                style="--dot-size: {defaultSizeAnimated}; --dot-bg: {defaultBgAnimated}"
            ></div> 

        {:else if i > currentStepIndex}
            <div class="shepherd-dot"
                style="--dot-size: {defaultSize}; --dot-bg: {defaultBg}"
            ></div> 
        {/if}


    {/each}
</div>

