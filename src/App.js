import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import TempratureAndDetails from "./components/TempratureAndDetails";
import Forcast from "./components/Forcast";
import getFormatedWeatherData from "./services/weatherServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useEffect, useState } from "react";
import Loader from "./components/Loader";

function App() {
  const [query, setQuery] = useState({ q: "Tanta" });
  const [units, setUnits] = useState("metric");
  const [weatherData, setWeatherData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  function formatBackground() {
    if (!weatherData) return "from-cyan-7 00 to-blue-700";
    let threshold = units === "metric" ? 30 : 80;
    if (weatherData.temp <= threshold) return "from-cyan-700 to-blue-700";

    return "from-yellow-900 to-orange-700";
  }

  useEffect(() => {
    async function fetchWeather() {
      try {
        setIsLoading(true);
        const message = query.q ? query.q : "current Location";
        toast.info("Featching weather for " + message);
        await getFormatedWeatherData({ ...query, units }).then((data) => {
          toast.success(
            `Successfully featched weather for ${data.name}, ${data.country}`
          );
          setWeatherData(data);
          // console.log(data);
        });
      } catch (err) {
        toast.error("Error");
      } finally {
        setIsLoading(false);
      }
    }
    fetchWeather();
  }, [query, units]);

  return (
    <div
      className={`${formatBackground()} w-full h-screen pt-10 bg-gradient-to-br`}
    >
      <div
        className={`${formatBackground()} transition mx-auto max-w-screen-md p-10 px-32 bg-gradient-to-br h-fit shadow-2xl shadow-gray-700`}
      >
        {isLoading && <Loader />}
        <TopButtons setQuery={setQuery} />
        <Inputs units={units} setQuery={setQuery} setUnits={setUnits} />
        {weatherData && (
          <>
            <TimeAndLocation weatherData={weatherData} query={query.q} />

            <TempratureAndDetails weatherData={weatherData} />
            {weatherData.forcastWeather && (
              <>
                <Forcast
                  title="3-hours forcast"
                  type="hourly"
                  data={weatherData.forcastWeather.hours}
                />
                <Forcast
                  title="daily forcast"
                  type="daily"
                  data={weatherData.forcastWeather.days}
                />
              </>
            )}
            <ToastContainer
              autoClose={5000}
              theme="colored"
              newestOnTop={true}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
