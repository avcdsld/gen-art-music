/** [p5.sound]  Version: 1.0.0 - 2023-06-08 */ 
 /**
 *  <p>p5.sound extends p5 with <a href="http://caniuse.com/audio-api"
 *  target="_blank">Web Audio</a> functionality including audio input,
 *  playback, analysis and synthesis.
 *  </p>
 *  <ul>
 *  <li><a href="#/p5.SoundFile"><b>p5.SoundFile</b></a>: Load and play sound files.</li>
 *  <li><a href="#/p5.Amplitude"><b>p5.Amplitude</b></a>: Get the current volume of a sound.</li>
 *  <li><a href="#/p5.AudioIn"><b>p5.AudioIn</b></a>: Get sound from an input source, typically
 *    a computer microphone.</li>
 *  <li><a href="#/p5.FFT"><b>p5.FFT</b></a>: Analyze the frequency of sound. Returns
 *    results from the frequency spectrum or time domain (waveform).</li>
 *  <li><a href="#/p5.Oscillator"><b>p5.Oscillator</b></a>: Generate Sine,
 *    Triangle, Square and Sawtooth waveforms. Base class of
 *    <li><a href="#/p5.Noise">p5.Noise</a> and <a href="#/p5.Pulse">p5.Pulse</a>.
 *    </li>
 *  <li>
 *    <a href="#/p5.MonoSynth">p5.MonoSynth</a> and <a href="#/p5.PolySynth">p5.PolySynth</a>: Play musical notes
 *  </li>
 *  <li><a href="#/p5.Envelope"><b>p5.Envelope</b></a>: An Envelope is a series
 *    of fades over time. Often used to control an object's
 *    output gain level as an "ADSR Envelope" (Attack, Decay,
 *    Sustain, Release). Can also modulate other parameters.</li>
 *  <li><a href="#/p5.Delay"><b>p5.Delay</b></a>: A delay effect with
 *    parameters for feedback, delayTime, and lowpass filter.</li>
 *  <li><a href="#/p5.Filter"><b>p5.Filter</b></a>: Filter the frequency range of a
 *    sound.
 *  </li>
 *  <li><a href="#/p5.Reverb"><b>p5.Reverb</b></a>: Add reverb to a sound by specifying
 *    duration and decay. </li>
 *  <b><li><a href="#/p5.Convolver">p5.Convolver</a>:</b> Extends
 *  <a href="#/p5.Reverb">p5.Reverb</a> to simulate the sound of real
 *    physical spaces through convolution.</li>
 *  <b><li><a href="#/p5.SoundRecorder">p5.SoundRecorder</a></b>: Record sound for playback
 *    / save the .wav file.
 *  <b><li><a href="#/p5.SoundLoop">p5.SoundLoop</a>, <a href="#/p5.Phrase">p5.Phrase</a></b>, <b><a href="#/p5.Part">p5.Part</a></b> and
 *  <b><a href="#/p5.Score">p5.Score</a></b>: Compose musical sequences.
 *  </li>
 *  <li><a href="#/p5/userStartAudio">userStartAudio</a>: Enable audio in a
 *  browser- and user-friendly way.</a>
 *  <p>p5.sound is on <a href="https://github.com/processing/p5.js-sound/">GitHub</a>.
 *  Download the latest version
 *  <a href="https://github.com/processing/p5.js-sound/blob/master/lib/p5.sound.js">here</a>.</p>
 *
 *  @module p5.sound
 *  @submodule p5.sound
 *  @for p5.sound
 *  @main
 */

/**
 *  p5.sound 
 *  https://p5js.org/reference/#/libraries/p5.sound
 *
 *  From the Processing Foundation and contributors
 *  https://github.com/processing/p5.js-sound/graphs/contributors
 *
 *  MIT License (MIT)
 *  https://github.com/processing/p5.js-sound/blob/master/LICENSE
 *
 *  Some of the many audio libraries & resources that inspire p5.sound:
 *   - TONE.js (c) Yotam Mann. Licensed under The MIT License (MIT). https://github.com/TONEnoTONE/Tone.js
 *   - buzz.js (c) Jay Salvat. Licensed under The MIT License (MIT). http://buzz.jaysalvat.com/
 *   - Boris Smus Web Audio API book, 2013. Licensed under the Apache License http://www.apache.org/licenses/LICENSE-2.0
 *   - wavesurfer.js https://github.com/katspaugh/wavesurfer.js
 *   - Web Audio Components by Jordan Santell https://github.com/web-audio-components
 *   - Wilm Thoben's Sound library for Processing https://github.com/processing/processing/tree/master/java/libraries/sound
 *
 *   Web Audio API: http://w3.org/TR/webaudio/
 */

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 39);
/******/ })
/************************************************************************/
/******/ ({

/***/ 39:
/***/ (function(module, exports) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// import dependencies via preval.require so that they're available as values at compile time
var processorNames = {
  "recorderProcessor": "recorder-processor",
  "soundFileProcessor": "sound-file-processor",
  "amplitudeProcessor": "amplitude-processor"
};
var RingBuffer = {
  "default":
  /*#__PURE__*/
  function () {
    /**
     * @constructor
     * @param  {number} length Buffer length in frames.
     * @param  {number} channelCount Buffer channel count.
     */
    function RingBuffer(length, channelCount) {
      _classCallCheck(this, RingBuffer);

      this._readIndex = 0;
      this._writeIndex = 0;
      this._framesAvailable = 0;
      this._channelCount = channelCount;
      this._length = length;
      this._channelData = [];

      for (var i = 0; i < this._channelCount; ++i) {
        this._channelData[i] = new Float32Array(length);
      }
    }
    /**
     * Getter for Available frames in buffer.
     *
     * @return {number} Available frames in buffer.
     */


    _createClass(RingBuffer, [{
      key: "push",

      /**
       * Push a sequence of Float32Arrays to buffer.
       *
       * @param  {array} arraySequence A sequence of Float32Arrays.
       */
      value: function push(arraySequence) {
        // The channel count of arraySequence and the length of each channel must
        // match with this buffer obejct.
        // Transfer data from the |arraySequence| storage to the internal buffer.
        var sourceLength = arraySequence[0] ? arraySequence[0].length : 0;

        for (var i = 0; i < sourceLength; ++i) {
          var writeIndex = (this._writeIndex + i) % this._length;

          for (var channel = 0; channel < this._channelCount; ++channel) {
            this._channelData[channel][writeIndex] = arraySequence[channel][i];
          }
        }

        this._writeIndex += sourceLength;

        if (this._writeIndex >= this._length) {
          this._writeIndex = 0;
        } // For excessive frames, the buffer will be overwritten.


        this._framesAvailable += sourceLength;

        if (this._framesAvailable > this._length) {
          this._framesAvailable = this._length;
        }
      }
      /**
       * Pull data out of buffer and fill a given sequence of Float32Arrays.
       *
       * @param  {array} arraySequence An array of Float32Arrays.
       */

    }, {
      key: "pull",
      value: function pull(arraySequence) {
        // The channel count of arraySequence and the length of each channel must
        // match with this buffer obejct.
        // If the FIFO is completely empty, do nothing.
        if (this._framesAvailable === 0) {
          return;
        }

        var destinationLength = arraySequence[0].length; // Transfer data from the internal buffer to the |arraySequence| storage.

        for (var i = 0; i < destinationLength; ++i) {
          var readIndex = (this._readIndex + i) % this._length;

          for (var channel = 0; channel < this._channelCount; ++channel) {
            arraySequence[channel][i] = this._channelData[channel][readIndex];
          }
        }

        this._readIndex += destinationLength;

        if (this._readIndex >= this._length) {
          this._readIndex = 0;
        }

        this._framesAvailable -= destinationLength;

        if (this._framesAvailable < 0) {
          this._framesAvailable = 0;
        }
      }
    }, {
      key: "framesAvailable",
      get: function get() {
        return this._framesAvailable;
      }
    }]);

    return RingBuffer;
  }()
}["default"];

var RecorderProcessor =
/*#__PURE__*/
function (_AudioWorkletProcesso) {
  _inherits(RecorderProcessor, _AudioWorkletProcesso);

  function RecorderProcessor(options) {
    var _this;

    _classCallCheck(this, RecorderProcessor);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RecorderProcessor).call(this));
    var processorOptions = options.processorOptions || {};
    _this.numOutputChannels = options.outputChannelCount || 2;
    _this.numInputChannels = processorOptions.numInputChannels || 2;
    _this.bufferSize = processorOptions.bufferSize || 1024;
    _this.recording = false;

    _this.clear();

    _this.port.onmessage = function (event) {
      var data = event.data;

      if (data.name === 'start') {
        _this.record(data.duration);
      } else if (data.name === 'stop') {
        _this.stop();
      }
    };

    return _this;
  }

  _createClass(RecorderProcessor, [{
    key: "process",
    value: function process(inputs) {
      if (!this.recording) {
        return true;
      } else if (this.sampleLimit && this.recordedSamples >= this.sampleLimit) {
        this.stop();
        return true;
      }

      var input = inputs[0];
      this.inputRingBuffer.push(input);

      if (this.inputRingBuffer.framesAvailable >= this.bufferSize) {
        this.inputRingBuffer.pull(this.inputRingBufferArraySequence);

        for (var channel = 0; channel < this.numOutputChannels; ++channel) {
          var inputChannelCopy = this.inputRingBufferArraySequence[channel].slice();

          if (channel === 0) {
            this.leftBuffers.push(inputChannelCopy);

            if (this.numInputChannels === 1) {
              this.rightBuffers.push(inputChannelCopy);
            }
          } else if (channel === 1 && this.numInputChannels > 1) {
            this.rightBuffers.push(inputChannelCopy);
          }
        }

        this.recordedSamples += this.bufferSize;
      }

      return true;
    }
  }, {
    key: "record",
    value: function record(duration) {
      if (duration) {
        this.sampleLimit = Math.round(duration * sampleRate);
      }

      this.recording = true;
    }
  }, {
    key: "stop",
    value: function stop() {
      this.recording = false;
      var buffers = this.getBuffers();
      var leftBuffer = buffers[0].buffer;
      var rightBuffer = buffers[1].buffer;
      this.port.postMessage({
        name: 'buffers',
        leftBuffer: leftBuffer,
        rightBuffer: rightBuffer
      }, [leftBuffer, rightBuffer]);
      this.clear();
    }
  }, {
    key: "getBuffers",
    value: function getBuffers() {
      var buffers = [];
      buffers.push(this.mergeBuffers(this.leftBuffers));
      buffers.push(this.mergeBuffers(this.rightBuffers));
      return buffers;
    }
  }, {
    key: "mergeBuffers",
    value: function mergeBuffers(channelBuffer) {
      var result = new Float32Array(this.recordedSamples);
      var offset = 0;
      var lng = channelBuffer.length;

      for (var i = 0; i < lng; i++) {
        var buffer = channelBuffer[i];
        result.set(buffer, offset);
        offset += buffer.length;
      }

      return result;
    }
  }, {
    key: "clear",
    value: function clear() {
      var _this2 = this;

      this.leftBuffers = [];
      this.rightBuffers = [];
      this.inputRingBuffer = new RingBuffer(this.bufferSize, this.numInputChannels);
      this.inputRingBufferArraySequence = new Array(this.numInputChannels).fill(null).map(function () {
        return new Float32Array(_this2.bufferSize);
      });
      this.recordedSamples = 0;
      this.sampleLimit = null;
    }
  }]);

  return RecorderProcessor;
}(_wrapNativeSuper(AudioWorkletProcessor));

registerProcessor(processorNames.recorderProcessor, RecorderProcessor);

/***/ })

/******/ });
//# sourceMappingURL=recorderProcessor.js.map 