<script>
  import { afterUpdate } from 'svelte';
  import { isFunction } from '../utils/type-check';
  
  export let labelId, element, title;
  
  afterUpdate(() => {
    if (isFunction(title)) {
      title = title();
    }
    
    element.innerHTML = title;
  });
</script>

<style global>
  .shepherd-title {
    color: var(--tour-grey-dark);
    display: flex;
    font-size: 1.5rem;
    font-family: sans-serif;
    font-weight: bold;
    flex: 1 0 auto;
    margin: 0;
    padding: 0;
    place-content: center;
  }
</style>

    <h3
        bind:this={element}
        id="{labelId}"
        class="shepherd-title"
    >
</h3>
