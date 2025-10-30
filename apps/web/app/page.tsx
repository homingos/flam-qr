"use client";

import { QRCode } from "@repo/qr/qr-code";
import { getContrastLevel, getContrastRatio } from "@repo/qr/utils";
import { Star } from "lucide-react";
import { useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ColorInput } from "@/components/color-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DownloadOptions } from "./download-options";
import { TemplateSelector } from "./template-selector";

type QRStyles = {
  showLogo?: boolean;
  qrLogo?: string;
  qrColor: string;
  backgroundColor: string;
  eyeColor: string;
  dotColor: string;
  customLogo?: string;
  templateId?: string;
};

const Page = () => {
  const [qrStyles, setQrStyles] = useState<QRStyles>({
    showLogo: false,
    qrColor: "#000000",
    eyeColor: "#000000",
    dotColor: "#000000",
    backgroundColor: "#ffffff",
    templateId: "default",
  });
  const [url, setUrl] = useState("https://www.flamapp.ai");

  const methods = useForm();

  // Calculate contrast ratio and level
  const contrastInfo = useMemo(() => {
    const ratio = getContrastRatio(qrStyles.qrColor, qrStyles.backgroundColor);
    const level = getContrastLevel(ratio);
    return {
      ratio: ratio.toFixed(2),
      ...level,
    };
  }, [qrStyles.qrColor, qrStyles.backgroundColor]);

  return (
    <>
      {/* Fixed GitHub Star Button - Top Right Corner */}
      <a
        className="fixed top-4 right-4 z-50 inline-flex items-center gap-2 rounded-lg border border-gray-600 bg-gray-800/90 px-3 py-2 font-medium text-sm text-white shadow-lg backdrop-blur-sm transition-all hover:border-gray-500 hover:bg-gray-700/90 md:px-4 md:py-2.5"
        href="https://github.com/homingos/flam-qr"
        rel="noopener noreferrer"
        target="_blank"
      >
        <svg
          aria-hidden="true"
          className="h-4 w-4"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            fillRule="evenodd"
          />
        </svg>
        <span className="hidden sm:inline">Star on GitHub</span>
        <span className="sm:hidden">Star</span>
        <Star className="h-4 w-4" />
      </a>

      <h1 className="fixed top-4 left-4 z-50 select-none font-bold text-lg text-white md:text-2xl">
        Flam QR
      </h1>

      <div className="relative z-10 mx-auto w-full max-w-7xl select-none p-2 md:p-6">
        <div className="rounded-xl border-0 bg-black/70 p-3 backdrop-blur-sm md:p-8">
          <div className="grid h-full w-full grid-cols-1 gap-6 lg:grid-cols-5">
            {/* Left Column - Form Options */}
            <div className="flex h-full h-full w-full flex-col gap-6 overflow-y-auto pr-0 lg:col-span-3 lg:pr-4">
              <FormProvider {...methods}>
                {/* Basic Settings Section */}
                <div className="space-y-4 rounded-xl border border-gray-200 bg-white/90 p-4 backdrop-blur-sm">
                  <h2 className="border-b pb-2 font-semibold text-gray-900 text-lg">
                    Basic Settings
                  </h2>
                  <div>
                    <Label
                      className="mb-2 block text-gray-700 text-sm"
                      htmlFor="url-input"
                    >
                      URL
                    </Label>
                    <Input
                      className="text-gray-900 placeholder:text-gray-400"
                      id="url-input"
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="Enter URL"
                      type="text"
                      value={url}
                    />
                  </div>
                </div>

                {/* Template Selection Section */}
                <div className="space-y-4 rounded-xl border border-gray-200 bg-white/90 p-4 backdrop-blur-sm">
                  <h2 className="border-b pb-2 font-semibold text-gray-900 text-lg">
                    Frames
                  </h2>
                  <TemplateSelector
                    backgroundColor={qrStyles.backgroundColor}
                    onTemplateSelect={(templateId) =>
                      setQrStyles((prev) => ({
                        ...prev,
                        templateId,
                      }))
                    }
                    qrColor={qrStyles.qrColor}
                    selectedTemplateId={qrStyles.templateId}
                  />
                </div>

                {/* Color Customization Section */}
                <div className="space-y-4 rounded-xl border border-gray-200 bg-white/90 p-4 backdrop-blur-sm">
                  <h2 className="border-b pb-2 font-semibold text-gray-900 text-lg">
                    Color Customization
                  </h2>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <ColorInput
                      color={qrStyles.qrColor}
                      label="QR Color"
                      onChange={(value) =>
                        setQrStyles((prev) => ({
                          ...prev,
                          qrColor: value,
                        }))
                      }
                    />
                    <ColorInput
                      color={qrStyles.backgroundColor}
                      label="Background Color"
                      onChange={(value) =>
                        setQrStyles((prev) => ({
                          ...prev,
                          backgroundColor: value,
                        }))
                      }
                    />
                    <ColorInput
                      color={qrStyles.eyeColor || qrStyles.qrColor}
                      label="Eye Color"
                      onChange={(value) =>
                        setQrStyles((prev) => ({
                          ...prev,
                          eyeColor: value,
                        }))
                      }
                    />
                    <ColorInput
                      color={qrStyles.dotColor || qrStyles.qrColor}
                      label="Dot Color"
                      onChange={(value) =>
                        setQrStyles((prev) => ({
                          ...prev,
                          dotColor: value,
                        }))
                      }
                    />
                  </div>

                  {/* Contrast Feedback within Color Section */}
                  <div
                    className={`flex items-center gap-3 rounded-lg px-4 py-3 ${
                      contrastInfo.warning
                        ? "border border-orange-200 bg-orange-50"
                        : "border border-green-200 bg-green-50"
                    }`}
                  >
                    <div
                      className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full ${
                        contrastInfo.warning ? "bg-orange-100" : "bg-green-100"
                      }`}
                    >
                      {contrastInfo.warning ? (
                        <span className="font-bold text-orange-600 text-sm">
                          !
                        </span>
                      ) : (
                        <span className="font-bold text-green-600 text-sm">
                          ✓
                        </span>
                      )}
                    </div>
                    <span
                      className={`font-medium text-sm ${
                        contrastInfo.warning
                          ? "text-orange-800"
                          : "text-green-800"
                      }`}
                    >
                      {contrastInfo.warning
                        ? "Hard to scan. Use more contrast colors."
                        : "Great! Your QR code is easy to scan."}
                    </span>
                  </div>
                </div>

                {/* Logo Settings Section */}
                <div className="space-y-4 rounded-xl border border-gray-200 bg-white/90 p-4 backdrop-blur-sm">
                  <h2 className="border-b pb-2 font-semibold text-gray-900 text-lg">
                    Logo Settings
                  </h2>
                  <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 transition-colors hover:bg-gray-100">
                    <Label
                      className="cursor-pointer font-medium text-gray-700 text-sm"
                      htmlFor="show-logo"
                    >
                      Show Logo
                    </Label>
                    <Switch
                      checked={qrStyles.showLogo}
                      id="show-logo"
                      onCheckedChange={(value) =>
                        setQrStyles((prev) => ({
                          ...prev,
                          showLogo: value,
                        }))
                      }
                    />
                  </div>
                </div>
              </FormProvider>
            </div>

            {/* Right Column - Sticky QR Code Preview */}
            <div className="flex w-full justify-center lg:col-span-2 lg:justify-start">
              <div className="sticky top-4 flex h-fit w-full flex-col items-center justify-center gap-4 rounded-xl border border-gray-200 bg-white/90 p-6 shadow-lg backdrop-blur-sm">
                <h2 className="text-center font-semibold text-gray-900 text-lg">
                  Preview
                </h2>
                <QRCode
                  bgColor={qrStyles.backgroundColor}
                  dotColor={qrStyles.dotColor}
                  eyeColor={qrStyles.eyeColor}
                  fgColor={qrStyles.qrColor}
                  hideLogo={!qrStyles.showLogo}
                  scale={2}
                  templateId={qrStyles.templateId}
                  url={url}
                />
                <div className="w-full border-gray-200 border-t pt-4">
                  <DownloadOptions
                    bgColor={qrStyles.backgroundColor}
                    dotColor={qrStyles.dotColor}
                    eyeColor={qrStyles.eyeColor}
                    fgColor={qrStyles.qrColor}
                    showLogo={qrStyles.showLogo ?? false}
                    templateId={qrStyles.templateId}
                    url={url}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 mx-auto w-full max-w-7xl p-4 text-center">
        <p className="text-black text-sm">
          Made with <span className="text-red-500">♥</span> in Flam
        </p>
      </footer>
    </>
  );
};

export default Page;
