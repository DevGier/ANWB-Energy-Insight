<script>
  import moment from "moment";
  import Energy from "./components/Energy.svelte";
  import Sun from "./components/Sun.svelte";
</script>

<main>
  <div class="container">
    <header class="header">
      <div class="header__logo">
        <i class="ri-flashlight-line"></i> ANWB Energy Insights
      </div>
    </header>

    <Energy></Energy>

    <Sun></Sun>

    <footer class="footer">&copy; Tim de Gier {moment().format("YYYY")}</footer>
  </div>
</main>
