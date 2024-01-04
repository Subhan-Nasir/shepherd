<script>
    export let url;
    export let classes;
</script>

<style global>
    .shepherd-video-container {
        padding: 0 2rem;
        margin-bottom: 1rem;
    }

</style>

<div class="shepherd-video-container">
    
    <div class="embed-responsive embed-responsive-16by9 {classes}">
        <iframe
            class="embed-responsive-item"
            width="500"
            height="350"
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
    </div>
</div>

