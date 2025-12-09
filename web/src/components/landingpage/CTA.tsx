export default function CTA() {
  return (
    <>
      <div className="bg-gradient-to-b pointer-events-none from-white/12 w-full h-1/10 to-transparent blur-4xl">
        <div className="px-8 py-[80px] flex  justify-center item-center ">
          <div className="flex flex-col item-center text-center gap-5">
            <p className="font-normal text-4xl">
              Start catching bugs before your user do.
            </p>
            <p className="text-base sm:w-2xl text-[#d5d5d5]">
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
