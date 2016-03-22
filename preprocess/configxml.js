<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
// @if ENV == 'local'
    <widget id="com.ionicframework.mobile70705l" version="0.0.1" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">
        <name>TeamifyLocal</name>
        //@endif
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
    
    <platform name="ios">
        <icon src="resources/ios/icon/icon.png" width="57" height="57"/>
        <icon src="resources/ios/icon/icon@2x.png" width="114" height="114"/>
        <icon src="resources/ios/icon/icon-40.png" width="40" height="40"/>
        <icon src="resources/ios/icon/icon-40@2x.png" width="80" height="80"/>
        <icon src="resources/ios/icon/icon-50.png" width="50" height="50"/>
        <icon src="resources/ios/icon/icon-50@2x.png" width="100" height="100"/>
        <icon src="resources/ios/icon/icon-60.png" width="60" height="60"/>
        <icon src="resources/ios/icon/icon-60@2x.png" width="120" height="120"/>
        <icon src="resources/ios/icon/icon-60@3x.png" width="180" height="180"/>
        <icon src="resources/ios/icon/icon-72.png" width="72" height="72"/>
        <icon src="resources/ios/icon/icon-72@2x.png" width="144" height="144"/>
        <icon src="resources/ios/icon/icon-76.png" width="76" height="76"/>
        <icon src="resources/ios/icon/icon-76@2x.png" width="152" height="152"/>
        <icon src="resources/ios/icon/icon-small.png" width="29" height="29"/>
        <icon src="resources/ios/icon/icon-small@2x.png" width="58" height="58"/>
        <icon src="resources/ios/icon/icon-small@3x.png" width="87" height="87"/>
        <splash src="resources/ios/splash/Default-568h@2x~iphone.png" width="640" height="1136"/>
        <splash src="resources/ios/splash/Default-667h.png" width="750" height="1334"/>
        <splash src="resources/ios/splash/Default-736h.png" width="1242" height="2208"/>
        <splash src="resources/ios/splash/Default-Landscape-736h.png" width="2208" height="1242"/>
        <splash src="resources/ios/splash/Default-Landscape@2x~ipad.png" width="2048" height="1536"/>
        <splash src="resources/ios/splash/Default-Landscape~ipad.png" width="1024" height="768"/>
        <splash src="resources/ios/splash/Default-Portrait@2x~ipad.png" width="1536" height="2048"/>
        <splash src="resources/ios/splash/Default-Portrait~ipad.png" width="768" height="1024"/>
        <splash src="resources/ios/splash/Default@2x~iphone.png" width="640" height="960"/>
        <splash src="resources/ios/splash/Default~iphone.png" width="320" height="480"/>
    </platform>
    <icon src="resources/ios/icon/icon-small@3x.png"/>




</widget>