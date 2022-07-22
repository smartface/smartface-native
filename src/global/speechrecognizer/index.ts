import { ISpeechRecognizer } from './speechrecognizer';

const SpeechRecognizer: ISpeechRecognizer = require(`./speechrecognizer.${Device.deviceOS.toLowerCase()}`).default;

export default SpeechRecognizer;
