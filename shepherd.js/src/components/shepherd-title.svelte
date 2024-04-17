<script>
    import { afterUpdate } from 'svelte';
    import { isFunction } from '../utils/type-check.ts';

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
        grid-area: title;
        place-self: center start;
        color: var(--tour-grey-darkest);
        display: flex;
        font-size: 0.875rem;
        font-family: var(--tour-font);
        font-weight: 500;
        flex: 1 0 auto;
        margin: 0;
        padding: 0;
        place-content: center;
    }
</style>

<!-- svelte-ignore a11y-missing-content -->
<h3 bind:this={element} id={labelId} class="shepherd-title"></h3>
