export default {
  expo: {
    name: "Bambou",
    slug: "bambou",
    version: "1.0.1",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      package: "fr.bambouapp.bambou",
      versionCode: 2,
      permissions: ["com.google.android.gms.permission.AD_ID"],
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      icon: "./assets/icon.png",
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      eas: {
        projectId: "34a75170-a551-45ef-aeb9-dc2475343b6f",
      },
    },
    plugins: ["expo-font"],
  },
};
