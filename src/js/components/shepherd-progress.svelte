<script>
    import ShepherdButton from './shepherd-button.svelte';

    export let previousPercentage;
    export let newPercentage;

    let percentage = previousPercentage;
    setTimeout(()=>{percentage = newPercentage}, 5);

</script>

<style>

    :root {
        --progress-width: 150px;
    }


    .shepherd-progress {
        position: relative;
        border: 0;
        width: var(--progress-width, 100px);
        height: 1.5rem;
        line-height: 1;
        font-family: sans-serif;
        font-weight: bold;
        font-size: 0.875rem;
        background-color: lightgrey;
        border-radius: 0.375rem;
        overflow: hidden;

    }
    .shepherd-progress .shepherd-progress-text {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);

        width: var(--progress-width, 100px);
        text-align: center;
        color: black;

    }

    .shepherd-progress .shepherd-progress-bar {
        height: 100%;
        overflow: hidden;
        width: var(--width, 0%);
        background-color: blueviolet;
        /*   border-radius: 999px; */
        /*   box-shadow: 0 0 0 1px white; */
        overflow: hidden;
        position: relative;

        transition: width 300ms ease-in;
    }
    .shepherd-progress .shepherd-progress-bar .shepherd-progress-text {
        color: white;
    }

</style>

<div class="shepherd-progress">
    <div class="shepherd-progress-text">{percentage}</div>
    <div class="shepherd-progress-bar" style="--width:{percentage};">
        <div class="shepherd-progress-text">{percentage}</div>
    </div>
</div>

