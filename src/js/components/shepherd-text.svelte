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
      element.innerHTML = text.join(" ");
    }
  });
</script>

<style global>
  .shepherd-text {
    color: var(--tour-grey-darkest);
    background-color: white;
    font-size: 0.875rem;
    font-weight: 400;
    /* line-height: 1.3em; */
    padding: 1rem 1.5rem;
    padding-bottom: 0;
  }

  .shepherd-text p {
    margin-top: 0;
  }

  .shepherd-text ul {
    list-style-type: disc;
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

