<script>
    export let url;

</script>

<style global>
    .video-container {
        padding: 0 2rem;
    }

</style>

<div class="video-container">
    
    <div class="embed-responsive embed-responsive-16by9">
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

