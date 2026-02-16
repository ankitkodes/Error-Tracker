import CodeSnippet from "../copy-code-snippet";

export default function NodeSetup() {
  const nodejs = {
    id: 1,
    package: "npm install bugtrace-sdk",
    intializecode: `import ErrorTracker from '@your-org/error-tracker';

ErrorTracker.init({
  apiKey: "pk_live_************",
  environment: "production"
});`,
    codesnippet: `try{
riskyfunction();
} catch(err) {
 ErrorTracker.captureError(err);
}`,
  };

  return (
    <>
      <div className="">
        <div className="border rounded-md px-4 py-4 my-4">
          <div className="font-medium mb-4">1.Install the SDK</div>
          <CodeSnippet code={nodejs.package} />
          <div className="text-gray-500 text-xs py-2">
            works with Node.js 14+
          </div>
        </div>
        <div className="border rounded-md px-4 py-4 my-4">
          <div className="font-medium mb-4">2.Initialize the SDK</div>
          <CodeSnippet code={nodejs.intializecode} />
        </div>
        <div className="border rounded-md px-4 py-4 my-4">
          <div className="font-medium mb-4">3.Capture Errors</div>
          <div className="text-sm font-medium">Automatic error capture</div>
          <div className="text-xs text-gray-500 py-2">
            The SDK automatically captures unhandled error and exceptions.
          </div>
          <div className="text-sm">Manual capture</div>
          <CodeSnippet code={nodejs.codesnippet} />
          <div className="text-gray-500 text-xs py-2">
            works with Node.js 14+
          </div>
        </div>
      </div>
    </>
  );
}
