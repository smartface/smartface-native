const NativeBuildConfig = requireClass(Android.getActivity().getPackageName()+".BuildConfig");

function AndroidConfig() {}

AndroidConfig.isEmulator = (NativeBuildConfig.FLAVOR.toLowerCase().indexOf("emulator") !== -1);
AndroidConfig.packageName = Android.getActivity().getPackageName();

module.exports = AndroidConfig;