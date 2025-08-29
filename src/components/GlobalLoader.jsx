import { useEffect } from "react";
import loader from "../assets/GIF/LXS Logo Animation.mp4"

function GlobalLoader({ onFinish }) {

  useEffect(() => {
    const fallback = setTimeout(() => {
      sessionStorage.setItem("appLoaderShown", "true");
      onFinish();
    }, 8000);

    return () => clearTimeout(fallback);
  }, [onFinish]);

  const handleVideoEnd = () => {
    sessionStorage.setItem("appLoaderShown", "true");
    onFinish();
  };

  return (
    <div className="w-screen h-screen fixed z-50 top-0 left-0 items-center justify-center bg-[rgb(8,43,61)]">
      <video
        src={loader}
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
        className="w-full h-full object-cover"
      />
    </div>
  )
}

export default GlobalLoader
