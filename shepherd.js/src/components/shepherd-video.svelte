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

</style>

<div class="shepherd-video-container">
    
    <div class="embed-responsive embed-responsive-16by9 {classes}">
        {#if getEmbedURL(url)}
            <iframe
                class="embed-responsive-item"
                width="{width > 500 ? 500 : width}"
                height="{height > 350 ? 350 : height}"
                src={url}
                title="Embedded video player"
                frameborder="0"
                allow="accelerometer;
                autoplay;
                clipboard-write;
                encrypted-media;
                gyroscope;
                picture-in-picture;
                web-share"
                allowfullscreen
            ></iframe>
        {:else}
             <!-- else content here -->
            <!-- svelte-ignore a11y-media-has-caption -->
            <video
                src={url}
                width="{width > 500 ? 500 : width}"
                height="{height > 350 ? 350 : height}"
                class="embed-responsive-item"
                controls="controls"
                disablepictureinpicture
                style="display: block;"
            ></video>
        {/if}

    </div>
</div>
