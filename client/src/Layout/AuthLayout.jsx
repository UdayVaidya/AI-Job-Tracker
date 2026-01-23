import LoginLottie from "../components/LoginLottie";

export default function AuthLayout({ children, side = "left" }) {
    const isRight = side === "right";

    return (
        <div className="h-screen overflow-hidden flex items-center justify-center px-4 ">
            <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 bg-white text-black rounded-2xl shadow-2xl overflow-hidden min-h-[40vh] md:min-h-[60vh]">

                {/* LEFT */}
                {!isRight && (
                    <div
                        className={`flex items-center justify-center bg-white text-black relative overflow-hidden
                      ${isRight ? "anim-left" : "anim-right"}`}
                    >

                        {children}
                    </div>

                )}

                {/* ANIMATION PANEL */}
                <div className="hidden md:flex items-center justify-center bg-[#1f1f1f] relative overflow-hidden">
                    <div className="absolute inset-0 breathing-bg" />

                    <span className="orb orb1" />
                    <span className="orb orb2" />
                    <span className="orb orb3" />

                    <div className="relative z-10 flex items-center justify-center w-full h-full ml-1">
                        <LoginLottie />
                    </div>
                </div>

                {/* RIGHT */}
                {isRight && (
                    <div
                        className={`flex items-center justify-center bg-white relative overflow-hidden
                      ${isRight ? "anim-left" : "anim-right"}`}
                    >

                        {children}
                    </div>
                )}
            </div>
        </div>
    );
}
