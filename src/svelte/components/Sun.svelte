<script>
  import Chart from "chart.js/auto";
  import { onMount } from "svelte";
  import moment from "moment";

  let chartCanvas;

  let sunShine;
  let hours;

  async function getSunData() {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=51.9725&longitude=4.9486&hourly=sunshine_duration&timezone=Europe%2FBerlin&past_hours=12&forecast_days=1&forecast_hours=12`
    );
    const result = await response.json();

    sunShine = result.hourly.sunshine_duration.map((sun) =>
      parseFloat(sun / 3600).toFixed(2)
    );
    hours = result.hourly.time.map((time) => moment(time).format("HH:mm"));
  }

  async function createChart() {
    ctx = chartCanvas.getContext("2d");

    var ctx = document.getElementById("sunchart").getContext("2d");

    var gradient = ctx.createLinearGradient(0, 0, 0, 500);
    gradient.addColorStop(0, "rgba(251,251,0, 1)");
    gradient.addColorStop(1, "rgba(251,251,0,0)");

    new Chart(ctx, {
      type: "line",
      data: {
        labels: hours,
        datasets: [
          {
            backgroundColor: gradient,
            label: "Zon",
            fill: true,
            borderColor: "rgba(251,251,0, 1)",
            data: sunShine,
            color: "#fff",
            tension: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: window.innerWidth < 768 ? 1 / 1 : 2 / 1,
        plugins: {
          legend: {
            display: true,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              display: false,
            },
            grace: "5%",
          },
          x: {
            grid: {
              display: false,
            },
            grace: "5%",
          },
        },
        tension: 0.3,
      },
    });
  }

  Chart.defaults.color = "#fff";
  Chart.defaults.borderColor = "rgba(255,255,255,.1)";

  onMount(async () => {
    await getSunData();
    await createChart();
  });
</script>

<div class="energy">
  <h2 class="energy__title">Verwachte zon</h2>
  <canvas bind:this={chartCanvas} id="sunchart"></canvas>
  <small>Incl. BTW</small>
</div>
