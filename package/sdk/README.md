# BugTrace SDK

A lightweight SDK for tracking and reporting bugs in Node.js and Browser applications.

## Installation

```bash
npm install bugtrace-sdk
```

## Usage

### Node.js

To use BugTrace in a Node.js application:

1. Import `NodeInit` and initialize it with your API Key.
2. The SDK will automatically capture uncaught exceptions.
3. You can also manually capture errors using `captureError`.

```typescript
import { NodeInit, captureError } from "bugtrace-sdk/node";

// Initialize with your API Key
NodeInit("YOUR_API_KEY");

// Manual error capture
try {
  throw new Error("Something went wrong!");
} catch (error) {
  captureError(error);
}
```

### Browser

To use BugTrace in a browser application:

1. Import `BrowserInit` and initialize it with your API Key.
2. The SDK will automatically listen for window errors.
3. You can also manually capture errors using `captureError`.

```typescript
import { BrowserInit, captureError } from "bugtrace-sdk/browser";

// Initialize with your API Key
BrowserInit("YOUR_API_KEY");

// Manual error capture
try {
  throw new Error("UI Error");
} catch (error) {
  captureError(error);
}
```

## Configuration

Currently, the SDK sends reports to `http://localhost:3000/api/bugs`. Ensure your backend is running on this URL to receive error reports.
