<script>
    import { getEmbedURL } from "src/utils/general";

    export let url;
    export let classes;
    export let width;
    export let height;

</script>

<style global>
    .shepherd-video-container {
        padding: 1rem 2rem;
        /* margin-bottom: 1rem; */
    }


    .video-container {
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
    }

    .iframe-video,
    .native-video {
        display: block;
        border-radius: 0.25rem;


        aspect-ratio: var(--aspect-ratio);


        width: var(--width);
        max-width: 100%;

        height: fit-content;

    }


</style>

<div class="shepherd-video-container">

    <div class="video-container {{classes}}">
        {#if getEmbedURL(url)}
            <iframe
                class="iframe-video"
                src={getEmbedURL(url)}
                title="Embedded video player"
                frameborder="0"
                allowfullscreen
                allow="
                    accelerometer;
                    autoplay;
                    clipboard-write;
                    encrypted-media;
                    gyroscope;
                    picture-in-picture;
                    web-share
                "
                style="
                    --width: {width}px;
                    --height: {height}px;
                    --aspect-ratio: {width/height};
                "
            ></iframe>
        {:else}
             <!-- else content here -->
            <!-- svelte-ignore a11y-media-has-caption -->
            <video
                src={url}
                class="native-video"
                controls="controls"
                disablepictureinpicture
                style="
                    --width: {width}px;
                    --height: {height}px;
                    --aspect-ratio: {width/height};
                "
            ></video>
        {/if}

    </div>
</div>
