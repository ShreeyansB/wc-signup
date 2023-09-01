import Sidebar from "../components/Sidebar";

const sidebarProps = {
    heading: "Join us today!",
    message:
        "WisdomCircle is a global platform that helps experienced professionals connect with recruiters looking for accomplished talent to meet their organizational needs.",
};

export default function Login() {
    return (
        <div className="grid grid-cols-5 h-screen w-screen">
            <Sidebar
                className="hidden md:flex col-span-2 h-full w-full"
                {...sidebarProps}
            />
            <div className="col-span-5 md:col-span-3 bg-blue-100 h-full w-full">
                Login
            </div>
        </div>
    );
}
