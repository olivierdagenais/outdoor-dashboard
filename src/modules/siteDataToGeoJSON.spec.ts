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

test("siteDataToGeoJSON with s0000430_e_2024-06-13T21-03.xml", () => {
    // noinspection HttpUrlsUsage,SpellCheckingInspection
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<siteData xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="https://dd.weather.gc.ca/citypage_weather/schema/site.xsd">
   <license>https://dd.weather.gc.ca/doc/LICENCE_GENERAL.txt</license>
   <dateTime name="xmlCreation" zone="UTC" UTCOffset="0">
      <year>2024</year>
      <month name="June">06</month>
      <day name="Friday">14</day>
      <hour>01</hour>
      <minute>01</minute>
      <timeStamp>20240614010141</timeStamp>
      <textSummary>Friday June 14, 2024 at 01:01 UTC</textSummary>
   </dateTime>
   <dateTime name="xmlCreation" zone="EDT" UTCOffset="-4">
      <year>2024</year>
      <month name="June">06</month>
      <day name="Thursday">13</day>
      <hour>21</hour>
      <minute>01</minute>
      <timeStamp>20240613210141</timeStamp>
      <textSummary>Thursday June 13, 2024 at 21:01 EDT</textSummary>
   </dateTime>
   <location>
      <continent>North America</continent>
      <country code="ca">Canada</country>
      <province code="on">Ontario</province>
      <name code="s0000430" lat="45.40N" lon="75.69W">Ottawa (Kanata - Orléans)</name>
      <region>Ottawa North - Kanata - Orléans</region>
   </location>
   <warnings url="https://weather.gc.ca/warnings/report_e.html?onrm104">
      <event type="watch" priority="high" description="SEVERE THUNDERSTORM WATCH" expiryTime="20240614070242" url="https://weather.gc.ca/warnings/report_e.html?onrm104#1458014391495319789202406130503">
         <dateTime name="eventIssue" zone="UTC" UTCOffset="0">
            <year>2024</year>
            <month name="June">06</month>
            <day name="Thursday">13</day>
            <hour>20</hour>
            <minute>41</minute>
            <timeStamp>20240613204142</timeStamp>
            <textSummary>Thursday June 13, 2024 at 20:41 UTC</textSummary>
         </dateTime>
         <dateTime name="eventIssue" zone="EDT" UTCOffset="-4">
            <year>2024</year>
            <month name="June">06</month>
            <day name="Thursday">13</day>
            <hour>16</hour>
            <minute>41</minute>
            <timeStamp>20240613164142</timeStamp>
            <textSummary>Thursday June 13, 2024 at 16:41 EDT</textSummary>
         </dateTime>
      </event>
   </warnings>
   <currentConditions>
      <station code="yow" lat="45.32N" lon="75.67W">Ottawa Macdonald-Cartier Int&apos;l Airport</station>
      <dateTime name="observation" zone="UTC" UTCOffset="0">
         <year>2024</year>
         <month name="June">06</month>
         <day name="Friday">14</day>
         <hour>01</hour>
         <minute>00</minute>
         <timeStamp>20240614010000</timeStamp>
         <textSummary>Friday June 14, 2024 at 01:00 UTC</textSummary>
      </dateTime>
      <dateTime name="observation" zone="EDT" UTCOffset="-4">
         <year>2024</year>
         <month name="June">06</month>
         <day name="Thursday">13</day>
         <hour>21</hour>
         <minute>00</minute>
         <timeStamp>20240613210000</timeStamp>
         <textSummary>Thursday June 13, 2024 at 21:00 EDT</textSummary>
      </dateTime>
      <condition>Mostly Cloudy</condition>
      <iconCode format="gif">33</iconCode>
      <temperature unitType="metric" units="C">21.8</temperature>
      <dewpoint unitType="metric" units="C">17.6</dewpoint>
      <humidex unitType="metric">28</humidex>
      <pressure unitType="metric" units="kPa" change="0.20" tendency="falling">100.5</pressure>
      <visibility unitType="metric" units="km">24.1</visibility>
      <relativeHumidity units="%">77</relativeHumidity>
      <wind>
         <speed unitType="metric" units="km/h">14</speed>
         <gust unitType="metric" units="km/h"></gust>
         <direction>SSW</direction>
         <bearing units="degrees">194.0</bearing>
      </wind>
   </currentConditions>
   <forecastGroup>
      <dateTime name="forecastIssue" zone="UTC" UTCOffset="0">
         <year>2024</year>
         <month name="June">06</month>
         <day name="Thursday">13</day>
         <hour>19</hour>
         <minute>30</minute>
         <timeStamp>20240613193000</timeStamp>
         <textSummary>Thursday June 13, 2024 at 19:30 UTC</textSummary>
      </dateTime>
      <dateTime name="forecastIssue" zone="EDT" UTCOffset="-4">
         <year>2024</year>
         <month name="June">06</month>
         <day name="Thursday">13</day>
         <hour>15</hour>
         <minute>30</minute>
         <timeStamp>20240613153000</timeStamp>
         <textSummary>Thursday June 13, 2024 at 15:30 EDT</textSummary>
      </dateTime>
      <regionalNormals>
         <textSummary>Low 13. High 24.</textSummary>
         <temperature unitType="metric" units="C" class="high">24</temperature>
         <temperature unitType="metric" units="C" class="low">13</temperature>
      </regionalNormals>
      <forecast>
         <period textForecastName="Tonight">Thursday night</period>
         <textSummary>A few showers becoming mixed with thunderstorms early this evening and ending near midnight then cloudy with 30 percent chance of showers. Risk of a thunderstorm early this evening. Wind southwest 20 km/h. Low 16.</textSummary>
         <cloudPrecip>
            <textSummary>A few showers becoming mixed with thunderstorms early this evening and ending near midnight then cloudy with 30 percent chance of showers. Risk of a thunderstorm early this
evening.</textSummary>
         </cloudPrecip>
         <abbreviatedForecast>
            <iconCode format="gif">19</iconCode>
            <pop units="%"></pop>
            <textSummary>Showers or thunderstorms</textSummary>
         </abbreviatedForecast>
         <temperatures>
            <textSummary>Low 16.</textSummary>
            <temperature unitType="metric" units="C" class="low">16</temperature>
         </temperatures>
         <winds>
            <textSummary>Wind southwest 20 km/h.</textSummary>
            <wind index="1" rank="major">
               <speed unitType="metric" units="km/h">20</speed>
               <gust unitType="metric" units="km/h">00</gust>
               <direction>SW</direction>
               <bearing units="degrees">22</bearing>
            </wind>
            <wind index="2" rank="major">
               <speed unitType="metric" units="km/h">15</speed>
               <gust unitType="metric" units="km/h">00</gust>
               <direction>W</direction>
               <bearing units="degrees">27</bearing>
            </wind>
         </winds>
         <precipitation>
            <textSummary/>
            <precipType start="19" end="33">rain</precipType>
         </precipitation>
         <windChill/>
         <relativeHumidity units="%">100</relativeHumidity>
         <humidex/>
      </forecast>
      <forecast>
         <period textForecastName="Friday">Friday</period>
         <textSummary>Mainly cloudy. 30 percent chance of showers in the afternoon with risk of a thunderstorm. High 23. Humidex 27. UV index 6 or high.</textSummary>
         <cloudPrecip>
            <textSummary>Mainly cloudy. 30 percent chance of showers in the afternoon with risk of a thunderstorm.</textSummary>
         </cloudPrecip>
         <abbreviatedForecast>
            <iconCode format="gif">09</iconCode>
            <pop units="%">30</pop>
            <textSummary>Chance of showers</textSummary>
         </abbreviatedForecast>
         <temperatures>
            <textSummary>High 23.</textSummary>
            <temperature unitType="metric" units="C" class="high">23</temperature>
         </temperatures>
         <winds>
            <wind index="1" rank="major">
               <speed unitType="metric" units="km/h">15</speed>
               <gust unitType="metric" units="km/h">00</gust>
               <direction>W</direction>
               <bearing units="degrees">27</bearing>
            </wind>
            <wind index="2" rank="major">
               <speed unitType="metric" units="km/h">15</speed>
               <gust unitType="metric" units="km/h">00</gust>
               <direction>NW</direction>
               <bearing units="degrees">32</bearing>
            </wind>
         </winds>
         <precipitation>
            <textSummary/>
            <precipType start="40" end="46">rain</precipType>
         </precipitation>
         <windChill/>
         <uv category="high">
            <index>6</index>
            <textSummary>UV index 6 or high.</textSummary>
         </uv>
         <relativeHumidity units="%">75</relativeHumidity>
         <humidex>
            <calculated>27</calculated>
            <textSummary>Humidex 27.</textSummary>
         </humidex>
      </forecast>
      <forecast>
         <period textForecastName="Friday night">Friday night</period>
         <textSummary>Partly cloudy. Low 10.</textSummary>
         <cloudPrecip>
            <textSummary>Partly cloudy.</textSummary>
         </cloudPrecip>
         <abbreviatedForecast>
            <iconCode format="gif">32</iconCode>
            <pop units="%"></pop>
            <textSummary>Partly cloudy</textSummary>
         </abbreviatedForecast>
         <temperatures>
            <textSummary>Low 10.</textSummary>
            <temperature unitType="metric" units="C" class="low">10</temperature>
         </temperatures>
         <winds>
            <wind index="1" rank="major">
               <speed unitType="metric" units="km/h">15</speed>
               <gust unitType="metric" units="km/h">00</gust>
               <direction>NW</direction>
               <bearing units="degrees">32</bearing>
            </wind>
            <wind index="2" rank="major">
               <speed unitType="metric" units="km/h">05</speed>
               <gust unitType="metric" units="km/h">00</gust>
               <direction>VR</direction>
               <bearing units="degrees">99</bearing>
            </wind>
            <wind index="3" rank="minor">
               <speed unitType="metric" units="km/h">15</speed>
               <gust unitType="metric" units="km/h">00</gust>
               <direction>N</direction>
               <bearing units="degrees">36</bearing>
            </wind>
         </winds>
         <precipitation>
            <textSummary/>
            <precipType start="" end=""/>
         </precipitation>
         <windChill/>
         <relativeHumidity units="%">80</relativeHumidity>
         <humidex/>
      </forecast>
      <forecast>
         <period textForecastName="Saturday">Saturday</period>
         <textSummary>Sunny. High 23.</textSummary>
         <cloudPrecip>
            <textSummary>Sunny.</textSummary>
         </cloudPrecip>
         <abbreviatedForecast>
            <iconCode format="gif">00</iconCode>
            <pop units="%"></pop>
            <textSummary>Sunny</textSummary>
         </abbreviatedForecast>
         <temperatures>
            <textSummary>High 23.</textSummary>
            <temperature unitType="metric" units="C" class="high">23</temperature>
         </temperatures>
         <winds/>
         <precipitation>
            <textSummary/>
            <precipType start="" end=""/>
         </precipitation>
         <windChill/>
         <relativeHumidity units="%">30</relativeHumidity>
         <humidex/>
      </forecast>
      <forecast>
         <period textForecastName="Saturday night">Saturday night</period>
         <textSummary>Clear. Low 10.</textSummary>
         <cloudPrecip>
            <textSummary>Clear.</textSummary>
         </cloudPrecip>
         <abbreviatedForecast>
            <iconCode format="gif">30</iconCode>
            <pop units="%"></pop>
            <textSummary>Clear</textSummary>
         </abbreviatedForecast>
         <temperatures>
            <textSummary>Low 10.</textSummary>
            <temperature unitType="metric" units="C" class="low">10</temperature>
         </temperatures>
         <winds/>
         <precipitation>
            <textSummary/>
            <precipType start="" end=""/>
         </precipitation>
         <windChill/>
         <relativeHumidity units="%">65</relativeHumidity>
         <humidex/>
      </forecast>
      <forecast>
         <period textForecastName="Sunday">Sunday</period>
         <textSummary>Cloudy. High 26.</textSummary>
         <cloudPrecip>
            <textSummary>Cloudy.</textSummary>
         </cloudPrecip>
         <abbreviatedForecast>
            <iconCode format="gif">02</iconCode>
            <pop units="%"></pop>
            <textSummary>A mix of sun and cloud</textSummary>
         </abbreviatedForecast>
         <temperatures>
            <textSummary>High 26.</textSummary>
            <temperature unitType="metric" units="C" class="high">26</temperature>
         </temperatures>
         <winds/>
         <precipitation>
            <textSummary/>
            <precipType start="" end=""/>
         </precipitation>
         <windChill/>
         <relativeHumidity units="%">35</relativeHumidity>
         <humidex/>
      </forecast>
      <forecast>
         <period textForecastName="Sunday night">Sunday night</period>
         <textSummary>Cloudy with 30 percent chance of showers. Low 16.</textSummary>
         <cloudPrecip>
            <textSummary>Cloudy with 30 percent chance of showers.</textSummary>
         </cloudPrecip>
         <abbreviatedForecast>
            <iconCode format="gif">12</iconCode>
            <pop units="%">30</pop>
            <textSummary>Chance of showers</textSummary>
         </abbreviatedForecast>
         <temperatures>
            <textSummary>Low 16.</textSummary>
            <temperature unitType="metric" units="C" class="low">16</temperature>
         </temperatures>
         <winds/>
         <precipitation>
            <textSummary/>
            <precipType start="94" end="106">rain</precipType>
         </precipitation>
         <windChill/>
         <relativeHumidity units="%">65</relativeHumidity>
         <humidex/>
      </forecast>
      <forecast>
         <period textForecastName="Monday">Monday</period>
         <textSummary>Cloudy with 30 percent chance of showers. High 30.</textSummary>
         <cloudPrecip>
            <textSummary>Cloudy with 30 percent chance of showers.</textSummary>
         </cloudPrecip>
         <abbreviatedForecast>
            <iconCode format="gif">12</iconCode>
            <pop units="%">30</pop>
            <textSummary>Chance of showers</textSummary>
         </abbreviatedForecast>
         <temperatures>
            <textSummary>High 30.</textSummary>
            <temperature unitType="metric" units="C" class="high">30</temperature>
         </temperatures>
         <winds/>
         <precipitation>
            <textSummary/>
            <precipType start="106" end="118">rain</precipType>
         </precipitation>
         <windChill/>
         <relativeHumidity units="%">45</relativeHumidity>
         <humidex/>
      </forecast>
      <forecast>
         <period textForecastName="Monday night">Monday night</period>
         <textSummary>Cloudy periods. Low 20.</textSummary>
         <cloudPrecip>
            <textSummary>Cloudy periods.</textSummary>
         </cloudPrecip>
         <abbreviatedForecast>
            <iconCode format="gif">32</iconCode>
            <pop units="%"></pop>
            <textSummary>Cloudy periods</textSummary>
         </abbreviatedForecast>
         <temperatures>
            <textSummary>Low 20.</textSummary>
            <temperature unitType="metric" units="C" class="low">20</temperature>
         </temperatures>
         <winds/>
         <precipitation>
            <textSummary/>
            <precipType start="" end=""/>
         </precipitation>
         <windChill/>
         <relativeHumidity units="%">75</relativeHumidity>
         <humidex/>
      </forecast>
      <forecast>
         <period textForecastName="Tuesday">Tuesday</period>
         <textSummary>A mix of sun and cloud. High 32.</textSummary>
         <cloudPrecip>
            <textSummary>A mix of sun and cloud.</textSummary>
         </cloudPrecip>
         <abbreviatedForecast>
            <iconCode format="gif">02</iconCode>
            <pop units="%"></pop>
            <textSummary>A mix of sun and cloud</textSummary>
         </abbreviatedForecast>
         <temperatures>
            <textSummary>High 32.</textSummary>
            <temperature unitType="metric" units="C" class="high">32</temperature>
         </temperatures>
         <winds/>
         <precipitation>
            <textSummary/>
            <precipType start="" end=""/>
         </precipitation>
         <windChill/>
         <relativeHumidity units="%">55</relativeHumidity>
         <humidex/>
      </forecast>
      <forecast>
         <period textForecastName="Tuesday night">Tuesday night</period>
         <textSummary>Cloudy periods. Low 22.</textSummary>
         <cloudPrecip>
            <textSummary>Cloudy periods.</textSummary>
         </cloudPrecip>
         <abbreviatedForecast>
            <iconCode format="gif">32</iconCode>
            <pop units="%"></pop>
            <textSummary>Cloudy periods</textSummary>
         </abbreviatedForecast>
         <temperatures>
            <textSummary>Low 22.</textSummary>
            <temperature unitType="metric" units="C" class="low">22</temperature>
         </temperatures>
         <winds/>
         <precipitation>
            <textSummary/>
            <precipType start="" end=""/>
         </precipitation>
         <windChill/>
         <relativeHumidity units="%">85</relativeHumidity>
         <humidex/>
      </forecast>
      <forecast>
         <period textForecastName="Wednesday">Wednesday</period>
         <textSummary>A mix of sun and cloud. High 33.</textSummary>
         <cloudPrecip>
            <textSummary>A mix of sun and cloud.</textSummary>
         </cloudPrecip>
         <abbreviatedForecast>
            <iconCode format="gif">02</iconCode>
            <pop units="%"></pop>
            <textSummary>A mix of sun and cloud</textSummary>
         </abbreviatedForecast>
         <temperatures>
            <textSummary>High 33.</textSummary>
            <temperature unitType="metric" units="C" class="high">33</temperature>
         </temperatures>
         <winds/>
         <precipitation>
            <textSummary/>
            <precipType start="" end=""/>
         </precipitation>
         <windChill/>
         <relativeHumidity units="%">50</relativeHumidity>
         <humidex/>
      </forecast>
   </forecastGroup>
   <hourlyForecastGroup>
      <dateTime name="forecastIssue" zone="UTC" UTCOffset="0">
         <year>2024</year>
         <month name="June">06</month>
         <day name="Thursday">13</day>
         <hour>19</hour>
         <minute>30</minute>
         <timeStamp>20240613193000</timeStamp>
         <textSummary>Thursday June 13, 2024 at 19:30 UTC</textSummary>
      </dateTime>
      <dateTime name="forecastIssue" zone="EDT" UTCOffset="-4">
         <year>2024</year>
         <month name="June">06</month>
         <day name="Thursday">13</day>
         <hour>15</hour>
         <minute>30</minute>
         <timeStamp>20240613153000</timeStamp>
         <textSummary>Thursday June 13, 2024 at 15:30 EDT</textSummary>
      </dateTime>
      <hourlyForecast dateTimeUTC="202406140200">
         <condition>A few showers or thunderstorms</condition>
         <iconCode format="png">19</iconCode>
         <temperature unitType="metric" units="C">20</temperature>
         <lop category="High" units="%">80</lop>
         <windChill unitType="metric"/>
         <humidex unitType="metric">26</humidex>
         <wind>
            <speed unitType="metric" units="km/h">20</speed>
            <direction windDirFull="Southwest">SW</direction>
            <gust unitType="metric" units="km/h"/>
         </wind>
      </hourlyForecast>
      <hourlyForecast dateTimeUTC="202406140300">
         <condition>A few showers or thunderstorms</condition>
         <iconCode format="png">19</iconCode>
         <temperature unitType="metric" units="C">18</temperature>
         <lop category="High" units="%">80</lop>
         <windChill unitType="metric"/>
         <humidex unitType="metric"/>
         <wind>
            <speed unitType="metric" units="km/h">20</speed>
            <direction windDirFull="Southwest">SW</direction>
            <gust unitType="metric" units="km/h"/>
         </wind>
      </hourlyForecast>
      <hourlyForecast dateTimeUTC="202406140400">
         <condition>Chance of showers</condition>
         <iconCode format="png">12</iconCode>
         <temperature unitType="metric" units="C">18</temperature>
         <lop category="Low" units="%">30</lop>
         <windChill unitType="metric"/>
         <humidex unitType="metric"/>
         <wind>
            <speed unitType="metric" units="km/h">20</speed>
            <direction windDirFull="Southwest">SW</direction>
            <gust unitType="metric" units="km/h"/>
         </wind>
      </hourlyForecast>
      <hourlyForecast dateTimeUTC="202406140500">
         <condition>Chance of showers</condition>
         <iconCode format="png">36</iconCode>
         <temperature unitType="metric" units="C">17</temperature>
         <lop category="Low" units="%">30</lop>
         <windChill unitType="metric"/>
         <humidex unitType="metric"/>
         <wind>
            <speed unitType="metric" units="km/h">20</speed>
            <direction windDirFull="Southwest">SW</direction>
            <gust unitType="metric" units="km/h"/>
         </wind>
      </hourlyForecast>
      <hourlyForecast dateTimeUTC="202406140600">
         <condition>Chance of showers</condition>
         <iconCode format="png">36</iconCode>
         <temperature unitType="metric" units="C">17</temperature>
         <lop category="Low" units="%">30</lop>
         <windChill unitType="metric"/>
         <humidex unitType="metric"/>
         <wind>
            <speed unitType="metric" units="km/h">20</speed>
            <direction windDirFull="Southwest">SW</direction>
            <gust unitType="metric" units="km/h"/>
         </wind>
      </hourlyForecast>
      <hourlyForecast dateTimeUTC="202406140700">
         <condition>Chance of showers</condition>
         <iconCode format="png">36</iconCode>
         <temperature unitType="metric" units="C">17</temperature>
         <lop category="Low" units="%">30</lop>
         <windChill unitType="metric"/>
         <humidex unitType="metric"/>
         <wind>
            <speed unitType="metric" units="km/h">20</speed>
            <direction windDirFull="Southwest">SW</direction>
            <gust unitType="metric" units="km/h"/>
         </wind>
      </hourlyForecast>
      <hourlyForecast dateTimeUTC="202406140800">
         <condition>Chance of showers</condition>
         <iconCode format="png">36</iconCode>
         <temperature unitType="metric" units="C">16</temperature>
         <lop category="Low" units="%">30</lop>
         <windChill unitType="metric"/>
         <humidex unitType="metric"/>
         <wind>
            <speed unitType="metric" units="km/h">20</speed>
            <direction windDirFull="Southwest">SW</direction>
            <gust unitType="metric" units="km/h"/>
         </wind>
      </hourlyForecast>
      <hourlyForecast dateTimeUTC="202406140900">
         <condition>Mainly cloudy</condition>
         <iconCode format="png">03</iconCode>
         <temperature unitType="metric" units="C">16</temperature>
         <lop category="Low" units="%">20</lop>
         <windChill unitType="metric"/>
         <humidex unitType="metric"/>
         <wind>
            <speed unitType="metric" units="km/h">15</speed>
            <direction windDirFull="West">W</direction>
            <gust unitType="metric" units="km/h"/>
         </wind>
      </hourlyForecast>
      <hourlyForecast dateTimeUTC="202406141000">
         <condition>Mainly cloudy</condition>
         <iconCode format="png">03</iconCode>
         <temperature unitType="metric" units="C">16</temperature>
         <lop category="Low" units="%">20</lop>
         <windChill unitType="metric"/>
         <humidex unitType="metric"/>
         <wind>
            <speed unitType="metric" units="km/h">15</speed>
            <direction windDirFull="West">W</direction>
            <gust unitType="metric" units="km/h"/>
         </wind>
      </hourlyForecast>
      <hourlyForecast dateTimeUTC="202406141100">
         <condition>Mainly cloudy</condition>
         <iconCode format="png">03</iconCode>
         <temperature unitType="metric" units="C">17</temperature>
         <lop category="Low" units="%">20</lop>
         <windChill unitType="metric"/>
         <humidex unitType="metric"/>
         <wind>
            <speed unitType="metric" units="km/h">15</speed>
            <direction windDirFull="West">W</direction>
            <gust unitType="metric" units="km/h"/>
         </wind>
         <uv>
            <index>1</index>
         </uv>
      </hourlyForecast>
      <hourlyForecast dateTimeUTC="202406141200">
         <condition>Cloudy</condition>
         <iconCode format="png">10</iconCode>
         <temperature unitType="metric" units="C">17</temperature>
         <lop category="Low" units="%">20</lop>
         <windChill unitType="metric"/>
         <humidex unitType="metric"/>
         <wind>
            <speed unitType="metric" units="km/h">15</speed>
            <direction windDirFull="West">W</direction>
            <gust unitType="metric" units="km/h"/>
         </wind>
         <uv>
            <index>2</index>
         </uv>
      </hourlyForecast>
      <hourlyForecast dateTimeUTC="202406141300">
         <condition>Cloudy</condition>
         <iconCode format="png">10</iconCode>
         <temperature unitType="metric" units="C">18</temperature>
         <lop category="Low" units="%">20</lop>
         <windChill unitType="metric"/>
         <humidex unitType="metric"/>
         <wind>
            <speed unitType="metric" units="km/h">15</speed>
            <direction windDirFull="West">W</direction>
            <gust unitType="metric" units="km/h"/>
         </wind>
         <uv>
            <index>3</index>
         </uv>
      </hourlyForecast>
      <hourlyForecast dateTimeUTC="202406141400">
         <condition>Cloudy</condition>
         <iconCode format="png">10</iconCode>
         <temperature unitType="metric" units="C">19</temperature>
         <lop category="Low" units="%">20</lop>
         <windChill unitType="metric"/>
         <humidex unitType="metric"/>
         <wind>
            <speed unitType="metric" units="km/h">15</speed>
            <direction windDirFull="West">W</direction>
            <gust unitType="metric" units="km/h"/>
         </wind>
         <uv>
            <index>4</index>
         </uv>
      </hourlyForecast>
      <hourlyForecast dateTimeUTC="202406141500">
         <condition>Cloudy</condition>
         <iconCode format="png">10</iconCode>
         <temperature unitType="metric" units="C">20</temperature>
         <lop category="Low" units="%">20</lop>
         <windChill unitType="metric"/>
         <humidex unitType="metric"/>
         <wind>
            <speed unitType="metric" units="km/h">15</speed>
            <direction windDirFull="West">W</direction>
            <gust unitType="metric" units="km/h"/>
         </wind>
         <uv>
            <index>5</index>
         </uv>
      </hourlyForecast>
      <hourlyForecast dateTimeUTC="202406141600">
         <condition>Chance of showers. Risk of thunderstorms</condition>
         <iconCode format="png">19</iconCode>
         <temperature unitType="metric" units="C">21</temperature>
         <lop category="Low" units="%">30</lop>
         <windChill unitType="metric"/>
         <humidex unitType="metric">25</humidex>
         <wind>
            <speed unitType="metric" units="km/h">15</speed>
            <direction windDirFull="West">W</direction>
            <gust unitType="metric" units="km/h"/>
         </wind>
         <uv>
            <index>5</index>
         </uv>
      </hourlyForecast>
      <hourlyForecast dateTimeUTC="202406141700">
         <condition>Chance of showers. Risk of thunderstorms</condition>
         <iconCode format="png">09</iconCode>
         <temperature unitType="metric" units="C">22</temperature>
         <lop category="Low" units="%">30</lop>
         <windChill unitType="metric"/>
         <humidex unitType="metric">26</humidex>
         <wind>
            <speed unitType="metric" units="km/h">15</speed>
            <direction windDirFull="West">W</direction>
            <gust unitType="metric" units="km/h"/>
         </wind>
         <uv>
            <index>6</index>
         </uv>
      </hourlyForecast>
      <hourlyForecast dateTimeUTC="202406141800">
         <condition>Chance of showers. Risk of thunderstorms</condition>
         <iconCode format="png">09</iconCode>
         <temperature unitType="metric" units="C">23</temperature>
         <lop category="Low" units="%">30</lop>
         <windChill unitType="metric"/>
         <humidex unitType="metric">27</humidex>
         <wind>
            <speed unitType="metric" units="km/h">15</speed>
            <direction windDirFull="Northwest">NW</direction>
            <gust unitType="metric" units="km/h"/>
         </wind>
         <uv>
            <index>5</index>
         </uv>
      </hourlyForecast>
      <hourlyForecast dateTimeUTC="202406141900">
         <condition>Chance of showers. Risk of thunderstorms</condition>
         <iconCode format="png">09</iconCode>
         <temperature unitType="metric" units="C">22</temperature>
         <lop category="Low" units="%">30</lop>
         <windChill unitType="metric"/>
         <humidex unitType="metric">26</humidex>
         <wind>
            <speed unitType="metric" units="km/h">15</speed>
            <direction windDirFull="Northwest">NW</direction>
            <gust unitType="metric" units="km/h"/>
         </wind>
         <uv>
            <index>4</index>
         </uv>
      </hourlyForecast>
      <hourlyForecast dateTimeUTC="202406142000">
         <condition>Chance of showers. Risk of thunderstorms</condition>
         <iconCode format="png">09</iconCode>
         <temperature unitType="metric" units="C">21</temperature>
         <lop category="Low" units="%">30</lop>
         <windChill unitType="metric"/>
         <humidex unitType="metric">25</humidex>
         <wind>
            <speed unitType="metric" units="km/h">15</speed>
            <direction windDirFull="Northwest">NW</direction>
            <gust unitType="metric" units="km/h"/>
         </wind>
         <uv>
            <index>2</index>
         </uv>
      </hourlyForecast>
      <hourlyForecast dateTimeUTC="202406142100">
         <condition>Chance of showers. Risk of thunderstorms</condition>
         <iconCode format="png">09</iconCode>
         <temperature unitType="metric" units="C">20</temperature>
         <lop category="Low" units="%">30</lop>
         <windChill unitType="metric"/>
         <humidex unitType="metric"/>
         <wind>
            <speed unitType="metric" units="km/h">15</speed>
            <direction windDirFull="Northwest">NW</direction>
            <gust unitType="metric" units="km/h"/>
         </wind>
         <uv>
            <index>1</index>
         </uv>
      </hourlyForecast>
      <hourlyForecast dateTimeUTC="202406142200">
         <condition>A mix of sun and cloud</condition>
         <iconCode format="png">02</iconCode>
         <temperature unitType="metric" units="C">19</temperature>
         <lop category="Low" units="%">20</lop>
         <windChill unitType="metric"/>
         <humidex unitType="metric"/>
         <wind>
            <speed unitType="metric" units="km/h">15</speed>
            <direction windDirFull="Northwest">NW</direction>
            <gust unitType="metric" units="km/h"/>
         </wind>
      </hourlyForecast>
      <hourlyForecast dateTimeUTC="202406142300">
         <condition>A mix of sun and cloud</condition>
         <iconCode format="png">02</iconCode>
         <temperature unitType="metric" units="C">19</temperature>
         <lop category="Low" units="%">20</lop>
         <windChill unitType="metric"/>
         <humidex unitType="metric"/>
         <wind>
            <speed unitType="metric" units="km/h">15</speed>
            <direction windDirFull="Northwest">NW</direction>
            <gust unitType="metric" units="km/h"/>
         </wind>
      </hourlyForecast>
      <hourlyForecast dateTimeUTC="202406150000">
         <condition>A mix of sun and cloud</condition>
         <iconCode format="png">02</iconCode>
         <temperature unitType="metric" units="C">18</temperature>
         <lop category="Low" units="%">20</lop>
         <windChill unitType="metric"/>
         <humidex unitType="metric"/>
         <wind>
            <speed unitType="metric" units="km/h">5</speed>
            <direction windDirFull="Variable direction">VR</direction>
            <gust unitType="metric" units="km/h"/>
         </wind>
      </hourlyForecast>
      <hourlyForecast dateTimeUTC="202406150100">
         <condition>Partly cloudy</condition>
         <iconCode format="png">32</iconCode>
         <temperature unitType="metric" units="C">17</temperature>
         <lop category="Low" units="%">20</lop>
         <windChill unitType="metric"/>
         <humidex unitType="metric"/>
         <wind>
            <speed unitType="metric" units="km/h">5</speed>
            <direction windDirFull="Variable direction">VR</direction>
            <gust unitType="metric" units="km/h"/>
         </wind>
      </hourlyForecast>
   </hourlyForecastGroup>
   <yesterdayConditions>
      <temperature unitType="metric" units="C" class="high">21.5</temperature>
      <temperature unitType="metric" units="C" class="low">12.5</temperature>
      <precip unitType="metric" units="mm">0.0</precip>
   </yesterdayConditions>
   <riseSet>
      <disclaimer>The information provided here, for the times of the rise and set of the sun, is an estimate included as a convenience to our clients. Values shown here may differ from the official sunrise/sunset data available from (http://hia-iha.nrc-cnrc.gc.ca/sunrise_e.html)</disclaimer>
      <dateTime name="sunrise" zone="UTC" UTCOffset="0">
         <year>2024</year>
         <month name="June">06</month>
         <day name="Friday">14</day>
         <hour>09</hour>
         <minute>14</minute>
         <timeStamp>20240614091400</timeStamp>
         <textSummary>Friday June 14, 2024 at 09:14 UTC</textSummary>
      </dateTime>
      <dateTime name="sunrise" zone="EDT" UTCOffset="-4">
         <year>2024</year>
         <month name="June">06</month>
         <day name="Thursday">13</day>
         <hour>05</hour>
         <minute>14</minute>
         <timeStamp>20240613051400</timeStamp>
         <textSummary>Thursday June 13, 2024 at 05:14 EDT</textSummary>
      </dateTime>
      <dateTime name="sunset" zone="UTC" UTCOffset="0">
         <year>2024</year>
         <month name="June">06</month>
         <day name="Saturday">15</day>
         <hour>00</hour>
         <minute>53</minute>
         <timeStamp>20240615005300</timeStamp>
         <textSummary>Saturday June 15, 2024 at 00:53 UTC</textSummary>
      </dateTime>
      <dateTime name="sunset" zone="EDT" UTCOffset="-4">
         <year>2024</year>
         <month name="June">06</month>
         <day name="Thursday">13</day>
         <hour>20</hour>
         <minute>52</minute>
         <timeStamp>20240613205200</timeStamp>
         <textSummary>Thursday June 13, 2024 at 20:52 EDT</textSummary>
      </dateTime>
   </riseSet>
   <almanac>
      <temperature class="extremeMax" period="1939-2011" unitType="metric" units="C" year="1988">34.5</temperature>
      <temperature class="extremeMin" period="1939-2011" unitType="metric" units="C" year="1946">4.4</temperature>
      <temperature class="normalMax" unitType="metric" units="C">23.6</temperature>
      <temperature class="normalMin" unitType="metric" units="C">12.5</temperature>
      <temperature class="normalMean" unitType="metric" units="C">18.1</temperature>
      <precipitation class="extremeRainfall" period="1939-2011" unitType="metric" units="mm" year="2005">41.0</precipitation>
      <precipitation class="extremeSnowfall" period="1939-2011" unitType="metric" units="cm" year="1939">0.0</precipitation>
      <precipitation class="extremePrecipitation" period="1939-2011" unitType="metric" units="mm" year="2005">41.0</precipitation>
      <precipitation class="extremeSnowOnGround" period="1955-2011" unitType="metric" units="cm" year="1955">0.0</precipitation>
      <pop units="%">44.0</pop>
   </almanac>
</siteData>`;

    const actual: Feature = testSiteDataToGeoJSON(xml);

    assert.isNotNull(actual);
    assert.equal(actual.type, "Feature");
    assert.equal(actual.properties["generatedAt"], "2024-06-14T01:01:41+00:00");
    assert.equal(actual.properties["updated"], "2024-06-13T19:30:00+00:00");
    // TODO: more useful assertions
});

test("utcTimeStampToIso8601 2024 June 14, 01:01 UTC", () => {
    const input = "20240614010141";

    const actual = utcTimeStampToIso8601(input);

    assert.equal(actual, "2024-06-14T01:01:41+00:00");
});

test("utcTimeStampToIso8601 2024 June 14, 01:01 UTC, no seconds", () => {
    const input = "202406140101";

    const actual = utcTimeStampToIso8601(input);

    assert.equal(actual, "2024-06-14T01:01:00+00:00");
});
