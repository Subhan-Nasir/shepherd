<script>
    export let url;
    export let classes;
    export let width;
    export let height;

</script>

<style global>
    .shepherd-video-container {
        padding: 0 1.5rem;
        /* margin-bottom: 1rem; */
    }

    .shepherd-video {
        width: 100%;
        height: auto;
        border-radius: 0.5rem;
        margin-top: 1rem;
    }

</style>

<div class="shepherd-video-container">

    <!-- svelte-ignore a11y-media-has-caption -->
    <video
        src={url}
        width="{width}"
        height="{height}"
        class="shepherd-video {classes}"
        controls
    >
    </video>


</div>

