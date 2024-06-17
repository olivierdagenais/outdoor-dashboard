import {assert, test} from "vitest";
import {JSDOM} from "jsdom";
import {siteDataToGeoJSON} from "./siteDataToGeoJSON";
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
