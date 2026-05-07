type PlausibleCallback = (result?: { status: number } | { error: unknown }) => void;

interface PlausibleOptions {
  callback?: PlausibleCallback;
  props?: Record<string, string>;
  revenue?: { amount: number | string; currency: string };
  interactive?: boolean;
}

interface Window {
  plausible?: (eventName: string, options?: PlausibleOptions) => void;
}

declare module "*.png";
declare module "*.jpeg";
declare module "*.jpg";
declare module "*.webp";

declare module "*.svg" {
  const content: string;
  export default content;
}
