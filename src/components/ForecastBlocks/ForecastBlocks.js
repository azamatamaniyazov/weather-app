import DailyWeathers from "./DailyWeather/DailyWeathers";
import LeftBlock from "./LeftBlock/LeftBlock";

function ForecastBlocks({ cityId }) {
  return (
    <div className="blocks">
      <LeftBlock cityId={cityId} />
      <DailyWeathers cityId={cityId} />
    </div>
  );
}

export default ForecastBlocks;
