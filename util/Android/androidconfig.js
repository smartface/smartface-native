const NativeBuildConfig = requireClass(Android.getActivity().getPackageName()+".BuildConfig");

function AndroidConfig() {}

AndroidConfig.isEmulator = (NativeBuildConfig.FLAVOR.toLowerCase().indexOf("emulator") !== -1);

module.exports = AndroidConfig;