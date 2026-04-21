import { useCallback, useRef, useState } from "react";

export function useCameraPreview() {
  const userVideoRef = useRef<HTMLVideoElement | null>(null);
  const cameraStreamRef = useRef<MediaStream | null>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);

  const startCamera = useCallback(async () => {
    if (cameraStreamRef.current) return;
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    cameraStreamRef.current = stream;
    setIsCameraOn(true);

    if (userVideoRef.current) {
      userVideoRef.current.srcObject = stream;
      await userVideoRef.current.play().catch(() => {
        // ignore
      });
    }
  }, []);

  const stopCamera = useCallback(() => {
    cameraStreamRef.current?.getTracks().forEach((t) => t.stop());
    cameraStreamRef.current = null;
    setIsCameraOn(false);
    if (userVideoRef.current) userVideoRef.current.srcObject = null;
  }, []);

  return { userVideoRef, cameraStreamRef, isCameraOn, startCamera, stopCamera };
}
