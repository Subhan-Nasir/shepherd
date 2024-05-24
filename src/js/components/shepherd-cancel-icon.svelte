<script>
  export let cancelIcon, step;

  /**
   * Add a click listener to the cancel link that cancels the tour
   */
    const handleCancelClick = (e) => {
        e.preventDefault();
        step.cancel();
    };
</script>

<style global>
    .shepherd-cancel-icon {
        grid-area: close-btn;
        background: transparent;
        border: none;
        color: rgba(128, 128, 128, 0.75);
        font-size: 2em;
        cursor: pointer;
        font-weight: normal;
        margin: 0;
        padding: 0;
        transition: all 350ms ease-in-out;

        width: 2rem;
        aspect-ratio: 1/1;
        border-radius: 50%;
        
        place-self: start center;

        font-variation-settings:
            'FILL' 0,
            'wght' 400,
            'GRAD' 0,
            'opsz' 24 !important;

    }

    .shepherd-cancel-icon:hover {
        background: #808080;
    }

    .shepherd-has-title .shepherd-content .shepherd-cancel-icon {
        color: rgba(128, 128, 128, 0.75);
    }

    .shepherd-has-title .shepherd-content .shepherd-cancel-icon:hover {
        /* color: rgba(0, 0, 0, 0.75); */
        color: white;
    }

    .shepherd-text-cancel {
        background-color: transparent;
        border: none;


        color: var(--tour-primary);

        font-family: var(--tour-font);
        font-size: 0.875rem;
        font-weight: 400;
    }


</style>

<!-- <button
    aria-label="{cancelIcon.label ? cancelIcon.label : 'Close Tour'}"
    class="shepherd-cancel-icon shepherd-material-symbols-outlined"
    on:click={handleCancelClick}
    type="button"
>
close

</button> -->

<button
    aria-label="{cancelIcon.label ? cancelIcon.label : 'Close Tour'}"
    class="shepherd-text-cancel"
    on:click={handleCancelClick}
    type="button"
>
    Dismiss

</button>



