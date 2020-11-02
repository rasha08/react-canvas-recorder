// @ts-nocheck
import React from 'react'

interface CanvasRecorder {
  start: () => void
  stop: () => void
  save: () => Blob
  createStream: <T extends HTMLCanvasElement>(canvas: T) => void
  captureMediaStream: <T extends MediaStream>(mediaStream: T) => void
  recordScreen: () => void
}

/* eslint-disable */
const CanvasRecorder = (): CanvasRecorder => {
  const start = startRecording
  const stop = stopRecording
  const save = download
  let stream
  var recordedBlobs = []
  var supportedType = null
  var mediaRecorder = null

  const createStream = (canvas) => {
    stream = canvas.captureStream(150)
  }

  const captureMediaStream = (mediaStream) => {
    stream = mediaStream
  }

  const recordScreen = async () => {
    stream = await navigator.mediaDevices.getDisplayMedia({
      video: { mediaSource: 'screen' }
    })
  }

  function startRecording() {
    let types = [
      'video/webm',
      'video/webm,codecs=vp9',
      'video/vp8',
      'video/webm;codecs=vp8',
      'video/webm;codecs=daala',
      'video/webm;codecs=h264',
      'video/mpeg'
    ]
    for (let i in types) {
      if (MediaRecorder.isTypeSupported(types[i])) {
        supportedType = types[i]
        break
      }
    }
    if (supportedType == null) {
      console.log('No supported type found for MediaRecorder')
    }
    let options = {
      mimeType: supportedType,
      videoBitsPerSecond: 25000000000 // 2.5Mbps
    }
    recordedBlobs = []
    try {
      mediaRecorder = new MediaRecorder(stream, options)
    } catch (e) {
      console.error('Exception while creating MediaRecorder:', e)
      alert('MediaRecorder is not supported by this browser.')
      return
    }
    mediaRecorder.onstop = handleStop
    mediaRecorder.ondataavailable = handleDataAvailable
    mediaRecorder.start(100) // collect 100ms of data blobs
  }
  function handleDataAvailable(event) {
    if (event.data && event.data.size > 0) {
      recordedBlobs.push(event.data)
    }
  }
  function handleStop(event) {
    const superBuffer = new Blob(recordedBlobs, { type: supportedType })
  }

  function stopRecording() {
    mediaRecorder.stop()
  }

  function download(file_name) {
    return new Blob(recordedBlobs, { type: supportedType })
  }
  return {
    start,
    stop,
    save,
    createStream
  }
}
export default CanvasRecorder()
