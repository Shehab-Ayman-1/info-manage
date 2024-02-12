import Success from "@/assets/audio/success.mp3";
import Fail from "@/assets/audio/fail.mp3";

export const Audio = () => {
   return (
      <div className="absolute -bottom-10 -left-10">
         <audio src={Success} className="audio-alert-success" />
         <audio src={Fail} className="audio-alert-fail" />
      </div>
   );
};
