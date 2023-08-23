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
        background: transparent;
        border: none;
        color: rgba(128, 128, 128, 0.75);
        font-size: 2em;
        cursor: pointer;
        font-weight: normal;
        margin: 0;
        padding: 0;
        transition: all 0.5s ease;

        width: 2rem;
        aspect-ratio: 1/1;
        border-radius: 50%;
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


    .material-symbols-outlined {
        font-variation-settings:
            'FILL' 1,
            'wght' 700,
            'GRAD' 200,
            'opsz' 48


    }





</style>

<button
  aria-label="{cancelIcon.label ? cancelIcon.label : 'Close Tour'}"
  class="shepherd-cancel-icon material-symbols-outlined"
  on:click={handleCancelClick}
  type="button"
>
close

</button>
