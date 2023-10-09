import moment from "moment";

function getDeadlineDifference(deadline) {
  const now = moment();
  const diff = moment(deadline).diff(now);
  
  const duration = moment.duration(diff);
  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();
  
  return (
    <div>
      {diff < 0 ? (
        <div className="flex items-center gap-8">
          <div className="flex flex-col justify-center items-center">
            <div className="text-2xl font-bold">0</div>
            <div className="text-[1rem] font-normal text-zinc-400">Days</div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="text-2xl font-bold">0</div>
            <div className="text-[1rem] font-normal text-zinc-400">Hours</div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="text-2xl font-bold">0</div>
            <div className="text-[1rem] font-normal text-zinc-400">Minutes</div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-8">
            <div className="flex flex-col justify-center items-center">
              <div className="text-2xl font-bold">{days}</div>
              <div className="text-[1rem] font-normal text-zinc-400">Days</div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="text-2xl font-bold">{hours}</div>
              <div className="text-[1rem] font-normal text-zinc-400">Hours</div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="text-2xl font-bold">{minutes}</div>
              <div className="text-[1rem] font-normal text-zinc-400">
                Minutes
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default getDeadlineDifference;
