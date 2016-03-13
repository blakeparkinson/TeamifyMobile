<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
  // @if ENV == 'dev'
<widget id="com.ionicframework.mobile70705d" version="0.0.1" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">
<name>TeamifyDev</name>
    //@endif
    // @if ENV == 'staging'
<widget id="com.ionicframework.mobile70705s" version="0.0.1" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">
<name>TeamifyStaging</name>
    //@endif
    // @if ENV == 'production'
<widget id="com.ionicframework.mobile707056" version="0.0.1" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">
<name>Teamify</name>
    //@endif
<description>
Restaurant Management Software
</description>
<author email="you@example.com" href="http://example.com.com/">
Nicholas Spitale
</author>
<content src="index.html"/>
<access origin="*"/>
<allow-navigation href="http://*/*" />
<preference name="webviewbounce" value="false"/>
<preference name="UIWebViewBounce" value="false"/>
<preference name="DisallowOverscroll" value="true"/>
<preference name="android-minSdkVersion" value="16"/>
<preference name="BackupWebStorage" value="none"/>
<feature name="StatusBar">
<param name="ios-package" value="CDVStatusBar" onload="true"/>
</feature>
</widget>