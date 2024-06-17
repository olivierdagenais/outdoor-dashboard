import {Feature, GeoJsonProperties, Geometry} from "geojson";

class Forecast implements Feature {
    constructor() {
        this.type = "Feature";
        this.properties = {};
    }

    geometry: Geometry;
    properties: GeoJsonProperties;
    type: "Feature";
}

class SiteData {
    constructor(doc: Document) {
        this.doc = doc;
        const xPathResult = doc.evaluate(
            "//siteData",
            this.doc,
            null,
            9
        );
        this.siteData = xPathResult.singleNodeValue;
    }

    doc: Document;
    siteData: Node;

    getString(expression: string): String | null {
        const xPathResult = this.doc.evaluate(
            expression,
            this.siteData,
            null,
            2
        );
        const result = xPathResult.stringValue;
        return result;
    }

    getDateTime(name: string, scope?: String | null): String | null {
        const relativeExpression
            = `dateTime[@name='${name}' and @zone='UTC']/timeStamp/text()`;
        const absoluteExpression = scope
            ? scope + "/" + relativeExpression
            : relativeExpression
        ;
        const stringValue = this.getString(absoluteExpression);
        return stringValue ? utcTimeStampToIso8601(stringValue) : null;
    }
}

export function siteDataToGeoJSON(doc: Document): Feature {
    const forecast = new Forecast();
    const siteData = new SiteData(doc);
    forecast.properties["updated"] = siteData.getDateTime("xmlCreation");
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
