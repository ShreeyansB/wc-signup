import { ReactComponent as LogoSVG } from "../svgs/logo.svg";

export default function Sidebar({ className, heading, message }) {
    return (
        <div className={className}>
            <div className=" bg-gray-700 p-5 flex flex-col items-center justify-around text-white">
                <LogoSVG className="w-40 h-40 lg:w-56 lg:h-56 my-10" />
                <div className="grid grid-cols-4">
                    <div className="flex flex-col justify-end">
                        <img src="/pose.png" style={{ maxWidth: "8rem" }} />
                    </div>
                    <div className="col-span-3 flex flex-col justify-between py-5">
                        <h3 className="font-semibold text-lg lg:text-2xl mb-5">
                            {heading}
                        </h3>
                        <p className="font-light text-sm lg:text-md">
                            {message}
                        </p>
                        <div className="h-14" />
                        <p className="text-sm">
                            {
                                "Please contact us at +91-9380644532 if you need any assistance"
                            }
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
