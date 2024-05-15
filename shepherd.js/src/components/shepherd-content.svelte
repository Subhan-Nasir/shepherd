<script>
    import ShepherdFooter from './shepherd-footer.svelte';
    import ShepherdHeader from './shepherd-header.svelte';
    import ShepherdText from './shepherd-text.svelte';
    import { isUndefined } from '../utils/type-check.ts';
    import ShepherdImage from './shepherd-image.svelte';
    import ShepherdVideo from './shepherd-video.svelte';

    export let descriptionId, labelId, step;

    let image = step.options.image;
    let video = step.options.video;

</script>

<style global>
    .shepherd-content {
        border-radius: 5px;
        outline: none;
        padding: 0;
        box-shadow: 16px 20px 20px 4px rgba(0,0,0,.15);
    }
    .extra-padding {
        padding-bottom: 1rem;
    }

</style>

<div
    class="shepherd-content"
    class:extra-padding={!(Array.isArray(step.options.buttons) && step.options.buttons.length > 0)}
>
    {#if !isUndefined(step.options.title) || (step.options.cancelIcon && step.options.cancelIcon.enabled)}
        <ShepherdHeader {labelId} {step}/>
    {/if}

    {#if !isUndefined(step.options.text)}
        <ShepherdText {descriptionId} {step}/>
    {/if}

    {#if !isUndefined(image)}
        <ShepherdImage 
            url={image.url}
            height={image.height}
            width={image.width}
            alt="Image/screenshot"
            classes={image.classes}
        />
    {/if}

    {#if !isUndefined(video)}
        <ShepherdVideo url={video.url} width={video.width} height={video.height} classes={video.classes}/>
    {/if}

    {#if Array.isArray(step.options.buttons) && step.options.buttons.length}
        <ShepherdFooter {step}/>
    {/if}
</div>
