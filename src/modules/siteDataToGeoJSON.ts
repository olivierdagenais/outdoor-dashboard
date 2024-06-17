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
    const result = doc.evaluate(
        "//siteData/dateTime[@name='xmlCreation' and @zone='UTC']/timeStamp/text()",
        doc,
        null,
        2
    );
    forecast.properties["updated"] = utcTimeStampToIso8601(result.stringValue);
    return forecast;
}

// 20240614010141 -> 2024-06-14T01:01:41+00:00
export function utcTimeStampToIso8601(timeStamp: string): string {
    const result =
        timeStamp.slice(0, 4) +
        "-" + timeStamp.slice(4, 6) +
        "-" + timeStamp.slice(6, 8) +
        "T" + timeStamp.slice(8, 10) +
        ":" + timeStamp.slice(10, 12) +
        ":" + timeStamp.slice(12, 14) +
        "+00:00";
    return result;
}
