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

class TypedValue {
    // https://codes.wmo.int/common/unit
    unitCode:
        | "wmoUnit:degC"
        | "wmoUnit:percent"
        | "wmoUnit:m"
    ;
    value: number;
}

class Period {
    number: number;
    startTime: string | null;
    endTime: string;
    temperature: number;
    temperatureUnit: string;
    probabilityOfPrecipitation: TypedValue;
    windSpeed: string;
    windDirection: string;
    shortForecast: string;
    icon: string;
}

export class SiteData {
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

    getString(expression: string): string {
        return SiteData.getString(this.siteData, expression);
    }

    static getString(node: Node, expression: string): string {
        const doc = node.ownerDocument;
        const xPathResult = doc.evaluate(
            expression,
            node,
            null,
            2
        );
        const result = xPathResult.stringValue;
        return result;
    }

    getDateTime(name: string, scope?: string | null): string {
        const relativeExpression
            = `dateTime[@name='${name}' and @zone='UTC']/timeStamp/text()`;
        const absoluteExpression = scope
            ? scope + "/" + relativeExpression
            : relativeExpression
        ;
        const stringValue = this.getString(absoluteExpression);
        return <string>utcTimeStampToIso8601(stringValue);
    }

    static hourlyForecastToPeriod(hourlyForecast: Node): Period {
        const result = new Period();
        const startTimeRaw = SiteData.getString(
            hourlyForecast,
            "./@dateTimeUTC"
        );
        result.startTime = utcTimeStampToIso8601(startTimeRaw);
        const temperatureRaw = SiteData.getString(
            hourlyForecast,
            "./temperature/text()"
        );
        result.temperature = Number(temperatureRaw);
        result.temperatureUnit = SiteData.getString(
            hourlyForecast,
            "./temperature/@units"
        );
        const iconCode = SiteData.getString(
            hourlyForecast,
            "./iconCode/text()"
        );
        // https://eccc-msc.github.io/open-data/msc-data/citypage-weather/readme_citypageweather-datamart_en/#icons-of-the-xml-product
        result.icon = `https://meteo.gc.ca/weathericons/${iconCode}.gif`;
        const windSpeedValue = SiteData.getString(
            hourlyForecast,
            ".//wind/speed/text()"
        );
        const windSpeedUnits = SiteData.getString(
            hourlyForecast,
            ".//wind/speed/@units"
        );
        result.windSpeed = `${windSpeedValue} ${windSpeedUnits}`;
        result.windDirection = SiteData.getString(
            hourlyForecast,
            ".//wind/direction/text()"
        );
        result.shortForecast = SiteData.getString(
            hourlyForecast,
            "./condition/text()"
        );
        return result;
    }
}

export function siteDataToGeoJSON(doc: Document): Feature {
    const forecast = new Forecast();
    const siteData = new SiteData(doc);
    forecast.properties["generatedAt"] = siteData.getDateTime("xmlCreation");
    forecast.properties["updated"] = siteData.getDateTime("forecastIssue", "hourlyForecastGroup");
    return forecast;
}

// 20240614010141 -> 2024-06-14T01:01:41+00:00
export function utcTimeStampToIso8601(timeStamp: string | null): string | null {
    if (!timeStamp) {
        return null;
    }
    const seconds = timeStamp.slice(12, 14);
    const result =
        timeStamp.slice(0, 4) +
        "-" + timeStamp.slice(4, 6) +
        "-" + timeStamp.slice(6, 8) +
        "T" + timeStamp.slice(8, 10) +
        ":" + timeStamp.slice(10, 12) +
        ":" + (seconds ? seconds : "00") +
        "+00:00";
    return result;
}
