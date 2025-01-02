<script>
  import ShepherdCancelIcon from './shepherd-cancel-icon.svelte';
  import ShepherdTitle from './shepherd-title.svelte';

  export let labelId, step;
  let title, cancelIcon, badge;

  $: {
    title = step.options.title;
    cancelIcon = step.options.cancelIcon;
    badge = step.options.badge;
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

  .shepherd-header.has-badge {
    grid-template-columns: auto 1fr auto;
    grid-template-areas: "badge title close-btn";
  }

  .shepherd-has-title .shepherd-content .shepherd-header {
    /* background: #eeeeee; */
    background: var(--tour-header-bg);
    padding: 0.75rem 1.5rem;
  }

  .shepherd-badge {

    grid-area: badge;
    background-color: var(--bg-color, var(--tour-badge-bg));
    color: var(--text-color);

    margin-right: 0.5rem;
    padding: 0.125rem 0.5rem;
    border-radius: 0.25rem;

    font-family: var(--tour-font);
    font-size: 0.75rem;
    font-weight: 500;
  }


</style>


<header class="shepherd-header" class:has-badge={badge}>

  {#if title}
    {#if badge}
      <span
          class="shepherd-badge"
          style="
              --bg-color: {badge.backgroundColor};
              --text-color: {badge.textColor};
          "
      >
        {badge.text}
      </span>
    {/if}

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