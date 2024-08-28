<script lang="ts">
    import { onMount } from 'svelte';
    import Chart from 'chart.js/auto';
  
    export let data: { labels: string[], datasets: any[] };
    export let options: any;
  
    let canvas: HTMLCanvasElement;
  
    onMount(() => {
      const ctx = canvas.getContext('2d');
      if (ctx)
      new Chart(ctx, {
        type: 'bar',
        data,
        options,
      });
    });
  </script>
  
  <canvas bind:this={canvas} class="bg-white"></canvas>
  