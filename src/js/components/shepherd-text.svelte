<script>
  import { afterUpdate } from 'svelte';
  import { isHTMLElement, isFunction } from '../utils/type-check';

  export let descriptionId, element, step;

  afterUpdate(() => {
    let { text } = step.options;

    if (isFunction(text)) {
      text = text.call(step);
    }

    if (isHTMLElement(text)) {
      element.appendChild(text);
    } else {
      element.innerHTML = text;
    }
  });
</script>

<style global>
  .shepherd-text {
    color: rgb(102 102 102);
    font-size: 1rem;
    line-height: 1.3em;
    padding: 1rem 2rem;
    padding-bottom: 0;
  }

  .shepherd-text p {
    margin-top: 0;
  }

  .shepherd-text p:last-child {
    margin-bottom: 0;
  }
</style>

<div
  bind:this={element}
  class="shepherd-text"
  id="{descriptionId}"
>
</div>

