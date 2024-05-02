---
toc: false
---

<style>
.grid-container {
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 50% 50%;
}
* { 
  margin: 0;
  height: 100%;
}
body {
  width: 100%;
}

#observablehq-center, #observablehq-main {
  margin: 0;
  max-width: 100%;
}
.card {
  margin: 0;
  padding: 0;
  border: none;
  border-radius: 0;
}
figure {
  position: relative !important;
}
</style>

<div class="grid-container">
  <div class="card" style="grid-column: 1 / 1; grid-row: 1 / span 2;">
    <iframe
      height="100%"
      width="100%"
      scrolling="no"
      align="top"
      frameborder="0"
      allowtransparency="true"
      src="https://weather.gc.ca/city/pages/on-118_metric_e.html#mainContent">
      Observations: Ottawa, Ontario, Canada
    </iframe>
  </div>
  <div class="card" style="grid-column: 2 / 2; grid-row: 1 / 1;">
    <iframe
        height="100%"
        width="100%"
        scrolling="no"
        align="top"
        frameborder="0"
        allowtransparency="true"
        src="https://weather.gc.ca/forecast/hourly/on-118_metric_e.html#wb-cont">
        Forecast: Ottawa, Ontario, Canada
      </iframe>
  </div>
  <div class="card" style="grid-column: 2 / 2; grid-row: 2 / 2;">
    <iframe
      height="100%"
      width="100%"
      scrolling="no"
      align="top"
      frameborder="0"
      allowtransparency="true"
      src="https://map.purpleair.com/1/m/i/mAQI/a10/p604800/cC0#10.22/45.2686/-75.9445">
      PurpleAir Real-Time Air Quality Map - Eagleson at Stonehaven
    </iframe>
  </div>
</div>
