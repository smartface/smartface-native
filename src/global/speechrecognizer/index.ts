import { SpeechRecognizerBase } from './speechrecognizer';

const SpeechRecognizer: typeof SpeechRecognizerBase = require(`./speechrecognizer.${Device.deviceOS.toLowerCase()}`).default;
type SpeechRecognizer = SpeechRecognizerBase;

export default SpeechRecognizer;
