<script>
    import ShepherdCancelIcon from './shepherd-cancel-icon.svelte';
    import ShepherdTitle from './shepherd-title.svelte';

    export let labelId, step;
    let title, cancelIcon;

    $: {
        title = step.options.title;
        cancelIcon = step.options.cancelIcon;
    }

</script>


<style global>
    .shepherd-header {
        align-items: center;
        /* border-top-left-radius: 5px; */
        /* border-top-right-radius: 5px; */
        /* display: flex;
        justify-content: flex-end;
        line-height: 2em; */
        padding: 0.75rem 0.75rem 0;

        display: grid;
        grid-template-columns: 1fr auto;
        grid-template-areas: "title close-btn";

    }

    .shepherd-has-title .shepherd-content .shepherd-header {
        /* background: #eeeeee; */
        background: var(--tour-header-bg);
        padding: 0.75rem 1.5rem;
    }

</style>

<header class="shepherd-header">
    {#if title}
        <ShepherdTitle {labelId} {title} />
    {/if}

    {#if cancelIcon && cancelIcon.enabled}
        <ShepherdCancelIcon {cancelIcon} {step} />
    {/if}

</header>
