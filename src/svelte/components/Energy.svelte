<script>
  import Chart from "chart.js/auto";
  import { onMount } from "svelte";
  import moment from "moment";

  let chartCanvas;

  let energyPrices;
  let gasPrices;

  async function getEnergyData() {
    const response = await fetch(
      `https://api.energyzero.nl/v1/energyprices?fromDate=${moment().subtract(1, "day").format("YYYY-MM-DD")}T22%3A00%3A00.000Z&tillDate=${moment().format("YYYY-MM-DD")}T21%3A59%3A59.999Z&interval=4&usageType=1&inclBtw=true`
    );
    const result = await response.json();

    energyPrices = result.Prices.map((price) => price.price);
  }

  async function getGasData() {
    const response = await fetch(
      `https://api.energyzero.nl/v1/energyprices?fromDate=${moment().subtract(1, "day").format("YYYY-MM-DD")}T22%3A00%3A00.000Z&tillDate=${moment().format("YYYY-MM-DD")}T21%3A59%3A59.999Z&interval=4&usageType=3&inclBtw=true`
    );
    const result = await response.json();

    gasPrices = result.Prices.map((price) => price.price);
  }

  function createHours() {
    let hours = [];

    for (let index = 0; index < 24; index++) {
      hours.push(`${index}:00`);
    }

    return hours;
  }

  async function createChart() {
    ctx = chartCanvas.getContext("2d");

    var ctx = document.getElementById("chart").getContext("2d");

    var gradient = ctx.createLinearGradient(0, 0, 0, 500);
    gradient.addColorStop(0, "rgba(135,194,50, 1)");
    gradient.addColorStop(1, "rgba(135,194,50,0)");

    var gradient2 = ctx.createLinearGradient(0, 0, 0, 500);
    gradient2.addColorStop(0, "rgba(255,90,90, 1)");
    gradient2.addColorStop(1, "rgba(255,90,90,0)");

    new Chart(ctx, {
      type: "line",
      data: {
        labels: createHours(),
        datasets: [
          {
            backgroundColor: gradient,
            label: "Elektriciteit",
            fill: true,
            borderColor: "rgba(135,194,50, 1)",
            data: energyPrices,
            color: "#fff",
            tension: 0,
          },
          {
            backgroundColor: gradient2,
            label: "Gas",
            fill: true,
            borderColor: "rgba(255,90,90, 1)",
            data: gasPrices,
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
    await getEnergyData();
    await getGasData();
    await createChart();
  });
</script>

<div class="energy">
  <h2 class="energy__title">Energieprijs</h2>
  <canvas bind:this={chartCanvas} id="chart"></canvas>
</div>
