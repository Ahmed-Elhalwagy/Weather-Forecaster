import { DateTime } from "luxon";

function Forcast({ type, title, data }) {
  return (
    <div>
      <div className="flex justify-start items-center mt-6">
        <p className="text-white font-medium uppercase">{title}</p>
      </div>
      <hr className="my-2" />
      <div className="flex flex-row justify-between items-center text-white 10">
        {data &&
          data.map((t, i) => {
            return (
              <div className="flex flex-col justify-center items-center">
                {type === "hourly" ? (
                  <p className="font-extralight">
                    {DateTime.fromSeconds(t.dt).toLocaleString(
                      DateTime.TIME_SIMPLE
                    )}
                  </p>
                ) : (
                  <p className="font-extralight">
                    {
                      DateTime.fromSeconds(t.dt)
                        .toLocaleString(DateTime.DATE_HUGE)
                        .split(",")[0]
                    }
                  </p>
                )}
                <img
                  src={`http://openweathermap.org/img/wn/${t.weather[0].icon}@2x.png`}
                  alt="clear"
                  className="w-12 my-1"
                />
                <p className="font-medium">{t.main.temp?.toFixed()}°</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Forcast;
