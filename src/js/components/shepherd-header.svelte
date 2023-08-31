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
        grid-template-columns: 2rem 1fr 2rem;

    }

    .shepherd-has-title .shepherd-content .shepherd-header {
        /* background: #eeeeee; */
        background: #00ede457;
        padding: 1em;
    }
</style>

<header class="shepherd-header">

    <!-- spacer to centre title using 3 column grid-->
    <span></span>

    {#if title}
      <ShepherdTitle
        {labelId}
        {title}
      />
    {/if}

    {#if cancelIcon && cancelIcon.enabled}
      <ShepherdCancelIcon
        {cancelIcon}
        {step}
      />
    {/if}
</header>
