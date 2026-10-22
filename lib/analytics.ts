/**
 * Privacy-first interaction telemetry and event logging
 * No third-party cookies or fingerprinting.
 */

export type AnalyticsEvent =
  | 'view_section'
  | 'click_cta'
  | 'copy_code'
  | 'open_command_palette'
  | 'toggle_architecture_tab'
  | 'adjust_concurrency_slider'
  | 'submit_contact';

export function trackEvent(name: AnalyticsEvent, metadata?: Record<string, string | number | boolean>) {
  if (typeof window === 'undefined') return;

  // Log in development or custom serverless collector
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Telemetry] ${name}:`, metadata);
  }

  // Can be piped to custom Beacon or lightweight analytics if configured
  try {
    if (window.navigator?.sendBeacon && process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
      window.navigator.sendBeacon(
        process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT,
        JSON.stringify({ event: name, metadata, timestamp: Date.now() })
      );
    }
  } catch {
    // Fail silently
  }
}
