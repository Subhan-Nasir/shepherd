 <script>

    import { onMount } from 'svelte'
    export let url;
    export let height;
    export let width;
    export let alt;


    let imageElement;
    let imageLoaded = false;

    onMount(()=>{
        imageElement.onload = () => {
            imageLoaded = false;
        }
    })




</script>

<style global>
    .shepherd-content {
        border-radius: 5px;
        outline: none;
        padding: 0;
        box-shadow: 3px 1px 20px 3px hsl(0deg 0% 0% / 15%);
    }


    .skeleton {
        animation: skeleton-loading 1s linear infinite alternate;
    }

    @keyframes skeleton-loading {
        0% {
            background-color: hsl(200, 20%, 70%);
        }

        100% {
            background-color: hsl(200, 20%, 95%);
        }

    }


    .skeleton-box {
        display: inline-block;
        height: 1em;
        position: relative;
        overflow: hidden;
        background-color: #DDDBDD;
    }
    .skeleton-box::after {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        transform: translateX(-100%);
        background: linear-gradient(90deg, rgba(255,255,255,0) 30%, rgb(255 255 255) 50%, rgba(255,255,255,0) 70%);
        animation: shimmer 2s infinite;
        content: '';
    }

    @keyframes shimmer {
        100% {
            transform: translateX(100%);
        }
    }


    .image-container {
        max-width: 100%;
        max-height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .image-container > img {
        border-radius: 0;
    }

</style>

    <div class='image-container'>
        <img 
            class="img-fluid"
            class:skeleton={!imageLoaded }
            height={height}
            width={width}
            src={url}
            alt={alt}
            bind:this={imageElement}
        >
        <!-- <div class="skeleton-box img-fluid" style="height: 200px; width: 200px;" bind:this={imageElement}>
        </div> -->

    
    </div>

