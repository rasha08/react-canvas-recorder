# react-canvas-recorder

> Canvas Element Recorder for React, with really simple API

[![NPM](https://img.shields.io/npm/v/react-canvas-recorder.svg)](https://www.npmjs.com/package/react-canvas-recorder) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-canvas-recorder
```

```bash
yarn add react-canvas-recorder
```

## About

It a wrapper around _MediaRecorder_ for supported browsers check: [![MOZ](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder)](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder)

### API

```ts
interface CanvasRecorder {
  start: () => void
  stop: () => void
  save: () => Blob
  createStream: <T extends HTMLCanvasElement>(canvas: T) => void
  captureMediaStream: <T extends MediaStream>(mediaStream: T) => void
  recordScreen: () => void
}
```

## Usage

### Record canvas element

```tsx
import React, { Component, useRef, useCallback } from 'react'
import recorder from 'react-canvas-recorder';

const Component () => {
  const ref = useRef()

  const startRecording = useCallback(() => {
    recorder.createStream(ref.current);
    recorder.start();
  }, [ref])

  const stopRecording = useCallback(() => {
    recorder.stop();
    const file = recorder.save();
    // Do something with the file
  }, [])


  return (
    <>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>

      <canvas ref={ref} />
    </>
  )
}
```

### Record entire screen

```tsx
import React, { Component, useRef, useCallback } from 'react'
import recorder from 'react-canvas-recorder';

const Component () => {

  const startRecording = useCallback(async () => {
    await recorder.recordScreen();
    recorder.start();
  }, [ref])

  const stopRecording = useCallback(() => {
    recorder.stop();
    const file = recorder.save();
    // Do something with the file
  }, [])


  return (
    <>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>

      <div>Some Content...</div>
    </>
  )
}
```

## License

MIT © [rasha08](https://github.com/rasha08)
