import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import SignupForm from "../components/SignupForm";

const sidebarProps = {
    heading: "Join us today!",
    message:
        "WisdomCircle is a global platform that helps experienced professionals connect with recruiters looking for accomplished talent to meet their organizational needs.",
};

export default function Signup() {
    return (
        <div className="grid grid-cols-5 h-screen w-screen">
            <Sidebar
                className="hidden md:flex col-span-2 h-full w-full"
                {...sidebarProps}
            />
            <div className="col-span-5 md:col-span-3 h-full w-full flex flex-col items-center justify-center overflow-y-auto">
                <div className="px-5 w-full lg:w-[60%]">
                    <h1 className="font-semibold text-2xl my-2">
                        Sign Up for WisdomCircle
                    </h1>
                    <span className="me-2">Already an account?</span>
                    <Link
                        to="/login"
                        className="font-medium text-blue-700"
                        replace
                    >
                        Sign In
                    </Link>
                    <SignupForm />
                </div>
            </div>
        </div>
    );
}
