import HorizontalLine from "../ui/HorizontalLine";

export default function FAQS() {
  return (
    <>
      <HorizontalLine />
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="col-span-2  p-4 border-b-2 md:border-b-0 md:border-r-2 border-[#202026]">
          <div className="text-4xl font-normal">Frequently Asked Questions</div>
          <div className="text-base py-2">
            Find everything you need to know about BugTrace, from security to
            supported assets.
          </div>
        </div>
        <div className="relative">
          <button className="font-normal  text-lg text-[#00ffb2] cursor-pointer border-[#202026] md:border-t-2 w-full md:absolute md:right-0 md:bottom-0 py-4 hover:bg-[#66ffd1] hover:text-black">
            Start Monitoring Now →
          </button>
        </div>
      </div>

      <HorizontalLine />
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="md:border-r-2 border-[#202026]">
          <details className="p-4 border-b-2 border-[#202026]">
            <summary className="cursor-pointer">
              What types of errors does BugTrace detect?
            </summary>
            <div className="text-[#d5d5d5]">
              BugTrace captures frontend JavaScript errors, API failures, server
              crashes, and post-production bugs like API limit exceed or service
              downtime.
            </div>
          </details>

          <details className="p-4 border-b-2 border-[#202026]">
            <summary className="cursor-pointer">
              Does BugTrace work with my tech stack?
            </summary>
            <div className="text-[#d5d5d5]">
              Yes — BugTrace works with Next.js, React, Node.js, and most modern
              web frameworks. You can also integrate it with custom backend
              services via our API.
            </div>
          </details>

          <details className="p-4 border-b-2 border-[#202026]">
            <summary className="cursor-pointer">
              How quickly will I see error reports?
            </summary>
            <div className="text-[#d5d5d5]">
              All errors are processed and displayed in your dashboard in
              real-time — usually within a few milliseconds of occurring.
            </div>
          </details>

          <details className="p-4 border-b-2 border-[#202026]">
            <summary className="cursor-pointer">
              Will BugTrace impact my app’s performance?
            </summary>
            <div className="text-[#d5d5d5]">
              No. Our lightweight SDK is optimized to run asynchronously, so it
              won’t block rendering or slow down your site.
            </div>
          </details>

          <details className="p-4 sm:border-b-2 md:border-b-0 border-[#202026]">
            <summary className="cursor-pointer">
              Can I track errors from production only?
            </summary>
            <div className="text-[#d5d5d5]">
              Yes — you can configure environments (development, staging,
              production) and choose which ones to monitor.
            </div>
          </details>
        </div>
        <div>
          <details className="p-4 border-b-2 border-[#202026]">
            <summary className="cursor-pointer">
              How is BugTrace different from Sentry or LogRocket?
            </summary>
            <div className="text-[#d5d5d5]">
              BugTrace is lightweight, fast to set up, and focuses on delivering
              exactly what you need without extra complexity or bloat.
            </div>
          </details>

          <details className="p-4 border-b-2 border-[#202026]">
            <summary className="cursor-pointer">Is there a free plan?</summary>
            <div className="text-[#d5d5d5]">
              Yes — our free plan includes X tracked errors per month for 1
              project. Upgrade for more projects and higher limits.
            </div>
          </details>

          <details className="p-4 border-b-2 border-[#202026]">
            <summary className="cursor-pointer">
              Does BugTrace store sensitive user data?
            </summary>
            <div className="text-[#d5d5d5]">
              No — we do not store personal identifiable information (PII)
              unless you explicitly include it in your error logs.
            </div>
          </details>

          <details className="p-4 border-b-2 border-[#202026]">
            <summary className="cursor-pointer">
              Can I use BugTrace with a team?
            </summary>
            <div className="text-[#d5d5d5]">
              Absolutely — you can invite multiple team members to a project and
              collaborate on fixing bugs.
            </div>
          </details>

          <details className="p-4">
            <summary className="cursor-pointer">How do I get started?</summary>
            <div className="text-[#d5d5d5]">
              Sign up, create a project, copy the script tag or SDK init code,
              and start tracking bugs in minutes.
            </div>
          </details>
        </div>
      </div>
      {/* <HorizontalLine /> */}
    </>
  );
}
