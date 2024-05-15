import process from "node:process";

export {};

/**
 * Based on "Weather forecast data by city in XML format" at
 * https://eccc-msc.github.io/open-data/msc-data/citypage-weather/readme_citypageweather-datamart_en/
 */
const cityPageBaseUrl = "https://dd.weather.gc.ca/citypage_weather/xml";
// TODO: we could find the nearest point to the current location from
// https://collaboration.cmc.ec.gc.ca/cmc/cmos/public_doc/msc-data/citypage-weather/site_list_en.geojson
// then extract the province and "SiteNameCode" to create the value for below
const provinceSlashCityFile = "ON/s0000430_e.xml";

async function fetchXml(url: RequestInfo | URL) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`fetch failed: ${response.status}`);
    }
    return await response.text();
}

const siteData = await fetchXml(`${cityPageBaseUrl}/${provinceSlashCityFile}`);

process.stdout.write(siteData);
