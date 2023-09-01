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
            imageLoaded = true;
        }
    })




</script>

<style global>
    /* .shepherd-content {
        border-radius: 5px;
        outline: none;
        padding: 0;
        box-shadow: 3px 1px 20px 3px hsl(0deg 0% 0% / 15%);
    } */


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
        background: linear-gradient(
            90deg,
            hsla(0,0%,100%,0) 25%,
            hsl(0, 0%, 100%) 50%,
            hsla(0,0%,100%,0) 75%);
        animation: shimmer 2s infinite;
        content: '';
        z-index: -1;
    }

    @keyframes shimmer {
        100% {
            transform: translateX(100%);
        }
    }


    .image-wrapper {
        height: var(--height);
        aspect-ratio: var(--aspect-ratio);
    }

    .image-container {
        max-width: 100%;
        height: auto;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .img-fluid, .image-wrapper{
        border-radius: 0;
        max-height: 250px;
        object-fit: scale-down;
        z-index: 20;
    }

</style>

    <div class='image-container'>

        <div class="image-wrapper" class:skeleton-box={!imageLoaded} style="--height:{height}px; --aspect-ratio: {width}/{height};">

            <img 
                class="img-fluid"
                height="{height}px"
                width="{width}px"
                src={url}
                alt={alt}
                bind:this={imageElement}
            >
            
        </div>
    
    </div>

