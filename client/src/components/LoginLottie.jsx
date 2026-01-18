import Lottie from "lottie-react";
import animationData from "../assets/lottie-image.json";

const LoginLottie = () => {
    return (
        <Lottie
            animationData={animationData}
            loop={true}
            autoplay={true}
            className="w-full h-full"
        />
    );
}

export default LoginLottie