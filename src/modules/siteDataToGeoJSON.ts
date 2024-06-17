import {Feature, Geometry, GeoJsonProperties} from "geojson";

class Forecast implements Feature {
    geometry: Geometry;
    properties: GeoJsonProperties;
    type: "Feature";
}

export function siteDataToGeoJSON(doc: Document): Feature {
    const forecast = new Forecast();
    forecast.type = "Feature";
    forecast.properties = {};
    return forecast;
}
