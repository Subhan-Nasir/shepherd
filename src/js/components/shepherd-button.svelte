<script>
    import { isFunction } from '../utils/type-check';

    export let config, step;
    let action, classes, disabled, label, secondary, text, iconPosition, iconName;

    $: {
        action = config.action ? config.action.bind(step.tour) : null;
        classes = config.classes;
        disabled = config.disabled ? getConfigOption(config.disabled) : false;
        label = config.label ? getConfigOption(config.label) : null;
        secondary = config.secondary;
        text = config.text ? getConfigOption(config.text) : null;
        iconName = config.iconName ? getConfigOption(config.iconName) : null;
        iconPosition = config.iconPosition ? getConfigOption(config.iconPosition) : null;
    }

    function getConfigOption(option) {
        if (isFunction(option)) {
            return option = option.call(step);
        }
        return option;
    }

</script>

<style global>
    .shepherd-button {

        background-color: transparent;
        color: var(--tour-primary);

        border: 0;
        border-radius: 0.25rem;
        outline: none;
        padding: 0.625rem 0.75rem;
        margin: 0;
        margin-right: 0.5rem;


        text-align: center;
        font-family:  Roboto, Helvetica, Arial, sans-serif;
        font-weight: 500;
        font-size: 0.875rem;

        transition: all 0.5s ease;

        cursor: pointer;
    }

    .shepherd-button:not(:disabled):hover {
        color: var(--tour-blue-darkest);
    }

    .shepherd-button.shepherd-button-secondary {
        background: rgb(241, 242, 243);
        color: rgba(0, 0, 0, 0.75);
    }

    .shepherd-button.shepherd-button-secondary:not(:disabled):hover {
        background: rgb(214, 217, 219);
        color: rgba(0, 0, 0, 1);
    }

    .shepherd-button:disabled {
        cursor: not-allowed;
    }

    .full-width {
        width: 100%;
        padding: 0.5rem 0.75rem;
    }

    .link-button {
        border: 1px solid var(--tour-primary);
    }

    .link-button:not(:disabled):hover
    {
        background-color: var(--tour-primary);
        color: white;
    }

    .text-with-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
    }

</style>

<button
    aria-label="{label ? label : null}"
    class="{`shepherd-button ${(secondary ? 'shepherd-button-secondary' : '')} ${(classes || '')}`}"
    class:text-with-icon={!!iconName && iconPosition}
    disabled={disabled}
    on:click={action}
    tabindex="0"
>
    {#if iconName && iconPosition === "left"}
        <span class="shepherd-material-symbols-outlined">{iconName}</span>
    {/if}
    
    {@html text}

    {#if iconName && iconPosition === "right"}
        <span class="shepherd-material-symbols-outlined">{iconName}</span>
    {/if}
</button>
