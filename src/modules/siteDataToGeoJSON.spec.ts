import {assert, test} from "vitest";
import {JSDOM} from "jsdom";
import {siteDataToGeoJSON, utcTimeStampToIso8601} from "./siteDataToGeoJSON";
import {Feature} from "geojson";

function testSiteDataToGeoJSON(xml: string): Feature {
    const dom: JSDOM = new JSDOM(xml);
    const doc: Document = dom.window.document;

    return siteDataToGeoJSON(doc);
}

test("siteDataToGeoJSON is a feature", () => {
    const xml = `<siteData />`;

    const actual = testSiteDataToGeoJSON(xml);

    assert.isNotNull(actual);
    assert.equal(actual.type, "Feature");
});

test("utcTimeStampToIso8601 2024 June 14, 01:01 UTC", () => {
    const input = "20240614010141";

    const actual = utcTimeStampToIso8601(input);

    assert.equal(actual, "2024-06-14T01:01:41+00:00");
});
