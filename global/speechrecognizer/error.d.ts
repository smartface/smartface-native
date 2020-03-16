export = SpeechRecognizerError;
// declare const SpeechRecognizerError: SpeechRecognizerErrorType & {android: AndroidErrors}
declare enum SpeechRecognizerError {
	INSUFFICIENT_PERMISSIONS = "INSUFFICIENT_PERMISSIONS",
	NETWORK = "NETWORK",
	NETWORK_TIMEOUT = "NETWORK_TIMEOUT",
	SPEECH_TIMEOUT = "SPEECH_TIMEOUT",
	CLIENT = "CLIENT",
	SERVER = "SERVER"
}

declare namespace SpeechRecognizerError {
	enum android {
		AUDIO = "AUDIO",
		NO_MATCH = "NO_MATCH",
		RECOGNIZER_BUSY = "RECOGNIZER_BUSY"
	}
}
