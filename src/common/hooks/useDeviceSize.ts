import { useEffect, useReducer } from "react";

const listeners = new Set<() => void>();
const deviceChecks = {
  isMobile: true,
  isTablet: true,
  isDesktop: true,
  isDesktopBig: true,
};

computeDeviceChecks();

function computeDeviceChecks() {
  deviceChecks.isMobile = window.innerWidth <= 768;
  deviceChecks.isTablet = window.innerWidth <= 1024;
  deviceChecks.isDesktop = window.innerWidth <= 1920;
  deviceChecks.isDesktopBig = window.innerWidth > 1920;

  for (const listener of listeners) {
    listener();
  }
}

window.addEventListener("resize", computeDeviceChecks);

export function useDevices() {
  const rerender = useReducer((x) => x + 1, 0)[1];

  useEffect(() => {
    listeners.add(rerender);

    return () => {
      listeners.delete(rerender);
    };
  }, [rerender]);

  return { ...deviceChecks };
}

export function useDevice() {
  const { isMobile, isTablet, isDesktop } = useDevices();

  return isMobile
    ? "mobile"
    : isTablet
    ? "tablet"
    : isDesktop
    ? "desktop"
    : "desktopBig";
}
