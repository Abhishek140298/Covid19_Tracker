import React, { useEffect, useState } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Card,
  CardContent,
} from "@material-ui/core";
import ".//Header.css";
import { waitForDomChange } from "@testing-library/react";
import Infobox from "../infoboxes/Infobox";
import Table from "../table/Table";
import { sortData } from "../util";

export default function Header() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("WorldWide");
  const [countryinfo, setCountryInfo] = useState({});
  const [tableData, setTabledata] = useState([]);
  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          const sortedData = sortData(data);
          setTabledata(sortedData);
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all").then((response) =>
      response.json().then((data) => {
        setCountryInfo(data);
      })
    );
  }, []);
  const changeCountryCode = async (event) => {
    const countryCode = event.target.value;
    console.log("abhi", countryinfo);
    const url =
      countryCode === "WorldWide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
      });
  };
  console.log("abhishekyadav", countryinfo);
  return (
    <div className="app_header">
      <div className="left_section">
        <div className="head">
          <h1>COVID 19 TRACKER</h1>
          <FormControl className="app_dropdown">
            {/* <InputLabel className="inputLabel">{country}</InputLabel>*/}
            <Select
              className="app_dropdown_select"
              variant="outlined"
              value={country}
              onChange={changeCountryCode}
            >
              <MenuItem value="WorldWide">WorldWide</MenuItem>
              {/* <MenuItem value="WorldWide">Option 1</MenuItem>
            <MenuItem value="WorldWide">Option 2</MenuItem>
            <MenuItem value="WorldWide">Option 3</MenuItem>
            <MenuItem value="WorldWide">Option 4</MenuItem>*/}
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app_info_box">
          <Infobox
            title="CoronaVirus Cases"
            cases={countryinfo.todayCases}
            total={countryinfo.cases}
          />

          <Infobox
            title="Recovered"
            cases={countryinfo.todayRecovered}
            total={countryinfo.recovered}
          />
          <Infobox
            title="Deaths"
            cases={countryinfo.todayDeaths}
            total={countryinfo.deaths}
          />
        </div>
      </div>

      <Card className="table_content">
        <CardContent>
          <h1>Live Cases By Country</h1>
          <Table countriess={tableData} />
          <h3>WorldWide New Cases</h3>
        </CardContent>
      </Card>
    </div>
  );
}
