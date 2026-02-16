export default function CTA() {
  return (
    <>
      <div className="bg-gradient-to-b from-[#1a1920] to-[#1C4438] pointer-events-none  w-full h-4/10 to-transparent blur-4xl">
        <div className=" py-8 flex item-center  justify-center ">
          <div className="flex flex-col  text-center gap-7 max-w-lg">
            <p className="font-normal text-5xl leading-15">
              Start catching bugs before your user do.
            </p>
            <p className="text-base  text-[#d5d5d5] leading-relaxed ">
              BugTrace helps you identify and resolve frontend and backend
              errors in real-time. No setup headaches — just add a script and
              go.
            </p>
            <div className="justify-center">
              <button className="border-2 px-4 py-2 bg-[#00ffb2] text-black border-[#00ffb2] rounded-full font-semibold cursor-pointer max-w-max ">
                Get Started for Free
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
