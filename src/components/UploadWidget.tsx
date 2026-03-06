import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_UPLOAD_PRESET,
} from "@/constants";
import { UploadWidgetValue } from "@/types";
import { Button } from "@/components/ui/button";
import { UploadCloud, XIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const UploadWidget = ({
  value = null,
  onChange,
  disabled = false,
}: {
  value: {
    url: string;
    publicId: string;
  } | null;
  onChange: (file: any, field: any) => void;
  disabled?: boolean;
}) => {
  const widgetRef = useRef<CloudinaryWidget | null>(null);
  const onChangeRef = useRef(onChange);

  const [preview, setPreview] = useState<UploadWidgetValue | null>(value);

  useEffect(() => {
    setPreview(value);
  }, [value]);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const initializeWidget = () => {
      if (!window.cloudinary || widgetRef.current) return false;

      widgetRef.current = window.cloudinary?.createUploadWidget(
        {
          cloudName: CLOUDINARY_CLOUD_NAME,
          uploadPreset: CLOUDINARY_UPLOAD_PRESET,
          multiple: false,
          folder: "uploads",
          maxFileSize: 5_000_000,
          clientAllowedFormats: ["png", "jpeg", "jpg", "webp"],
        },
        (error, result) => {
          if (!error && result.event === "success") {
            const payload: UploadWidgetValue = {
              url: result.info.secure_url,
              publicId: result.info.public_id,
            };

            setPreview(payload);
            onChangeRef.current?.(payload);
          }
        },
      );
      return true;
    };

    if (initializeWidget()) return;

    const intervalId = window.setInterval(() => {
      if (initializeWidget()) {
        window.clearInterval(intervalId);
      }
    }, 500);

    return () => window.clearInterval(intervalId);
  }, []);

  const openWidget = () => {
    if (disabled) return;

    widgetRef.current?.open();
  };

  const removeFromCloudinary = () => {
    setPreview(null);
  };

  const handleKeyEvent = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openWidget();
    }
  };

  return (
    <div className="space-y-2">
      {preview ? (
        <div className="upload-preview relative">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full -top-4 -right-4 absolute"
            aria-label="Submit"
            onClick={removeFromCloudinary}
          >
            <XIcon />
          </Button>
          <img src={preview.url} alt="Uploaded file" />
        </div>
      ) : (
        <div
          className="upload-dropzone"
          role="button"
          tabIndex={0}
          onClick={openWidget}
          onKeyDown={handleKeyEvent}
        >
          <div className="upload-prompt">
            <UploadCloud className="icon" />
            <div>
              <p>Click to upload photo</p>
              <p>PNG, JPG up to 5MB</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
