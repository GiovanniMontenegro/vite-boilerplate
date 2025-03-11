import { useState, useEffect } from 'react';

export enum DEVICE {
  MOBILE = 'mobile',
  PC = 'pc',
  TABLET = 'tablet',
  BOT = 'bot',
}
export type DeviceType = 'pc' | 'tablet' | 'mobile' | 'bot';
export type OS = 'ios' | 'android' | 'other' | 'bot';
export type Browser =
  | 'chrome'
  | 'firefox'
  | 'safari'
  | 'edge'
  | 'ie'
  | 'other'
  | 'bot';

export interface DeviceInfo {
  deviceType: DeviceType;
  os: OS;
  browser: Browser;
}

const useDeviceDetection = (): DeviceInfo => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    deviceType: 'pc',
    os: 'other',
    browser: 'other',
  });

  useEffect(() => {
    const handleDeviceDetection = (): void => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isBot = /bot|googlebot|crawler|spider|robot|crawling/i.test(
        userAgent,
      );
      //CHECK OS
      let os: OS = 'other';
      if (isBot) {
        os = 'bot';
      } else if (/iPad|iPhone|iPod/.test(userAgent)) {
        os = 'ios';
      } else if (/Android/.test(userAgent)) {
        os = 'android';
      }

      //CHECK BROWSER
      let browser: Browser = 'other';

      if (isBot) {
        browser = 'bot';
      } else if (/Chrome/.test(userAgent)) {
        browser = 'chrome';
      } else if (/Firefox/.test(userAgent)) {
        browser = 'firefox';
      } else if (/Safari/.test(userAgent)) {
        browser = 'safari';
      } else if (/Edge/.test(userAgent)) {
        browser = 'edge';
      } else if (/Trident/.test(userAgent)) {
        browser = 'ie';
      }

      //CHECK DEVICE
      let deviceType: DeviceType = 'pc';
      const isMobile =
        /mobi|webos|IEMobile|opera mini|iphone|ipad|ipod|android|blackberry|windows phone/g.test(
          userAgent,
        );
      const isTablet =
        /(ipad|tablet|playbook|silk)|(android(?!.*mobile))/g.test(userAgent);

      if (isBot) {
        deviceType = 'bot';
      } else if (isTablet) {
        deviceType = 'tablet';
      } else if (isMobile) {
        deviceType = 'mobile';
      }

      setDeviceInfo({
        deviceType,
        os,
        browser,
      });
    };

    handleDeviceDetection();
    window.addEventListener('resize', handleDeviceDetection);

    return (): void => {
      window.removeEventListener('resize', handleDeviceDetection);
    };
  }, []);

  return deviceInfo;
};

export default useDeviceDetection;
