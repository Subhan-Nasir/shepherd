<script>

    import ShepherdFooter from './shepherd-footer.svelte';
    import ShepherdHeader from './shepherd-header.svelte';
    import ShepherdText from './shepherd-text.svelte';
    import { isUndefined } from '../utils/type-check.js';
    import ShepherdImage from './shepherd-image.svelte';
    
    export let descriptionId, labelId, step;

    let imgWidth = 475;
    let imgHeight = imgWidth * (9/16);

    getRandomPicUrl() {
        return `https://source.unsplash.com/random/sig=${getRandomNumber()}/?space`
    }

    getRandomNumber(max = 50){
        return (Math.floor(Math.random() * max));
    };


    let imgURL = getRandomPicUrl();

</script>

<style global>
    .shepherd-content {
        border-radius: 5px;
        outline: none;
        padding: 0;
        box-shadow: 3px 1px 20px 3px hsl(0deg 0% 0% / 15%);
    }
</style>

<div
  class="shepherd-content"
>
    {#if !isUndefined(step.options.title) || (step.options.cancelIcon && step.options.cancelIcon.enabled)}
        <ShepherdHeader
            {labelId}
            {step}
        />
    {/if}

    {#if !isUndefined(step.options.text)}
        <ShepherdText
            {descriptionId}
            {step}
        />
    {/if}

    <ShepherdImage 
        url={imgURL}
        height={imgHeight}
        width={imgWidth}
        alt="random"
    />

    {#if Array.isArray(step.options.buttons) && step.options.buttons.length}
        <ShepherdFooter
            {step}
        />
    {/if}
</div>
