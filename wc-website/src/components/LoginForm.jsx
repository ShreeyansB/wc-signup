import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { ReactComponent as PassVisSVG } from "../svgs/passvis.svg";
import { ReactComponent as PassHidSVG } from "../svgs/passhid.svg";
import * as Yup from "yup";
import api from "../service/api";

// Regex for matching email and phone
const phoneRegex = /^\+\d{1,}\s?[\d\s\-()]+$/;
const combinedRegex =
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$|^\+\d{1,}\s?[\d\s\-()]+$/;

const loginSchema = Yup.object({
    uid: Yup.string()
        .required("This field is required")
        .max(320, "Invalid email or phone")
        .matches(combinedRegex, "Invalid email or phone"),
    password: Yup.string()
        .required("This field is required")
        .min(6, "Password must be at least 6 characters"),
});
const baseInputStyle =
    "rounded px-4 my-1 bg-transparent h-12 text-sm md:text-base w-full focus:outline-none";
const errInputStyle =
    " text-red-600 border border-red-400 focus:border-1 focus:border-red-600";
const succInputStyle =
    " border border-gray-300 focus:border-1 focus:border-gray-600";

export default function LoginForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    function togglePasswordVisibility() {
        setIsPasswordVisible((prevState) => !prevState);
    }

    const filterPayload = (values) => {
        if (phoneRegex.test(values.uid)) {
            return {
                phone: values.uid,
                password: values.password,
            };
        } else {
            return {
                email: values.uid,
                password: values.password,
            };
        }
    };

    const handleSubmit = async (values, actions) => {
        setIsSubmitting(true);
        const payload = filterPayload(values);
        const response = await api.login(payload);
        if (response.error) {
            switch (response.error) {
                case "wrongpass":
                    actions.setErrors({
                        password: response.message,
                    });
                    break;
                case "notexist":
                    actions.setErrors({
                        uid: response.message,
                    });
                    break;
                default:
                    actions.setErrors({
                        uid: response.message,
                    });
                    break;
            }
        } else {
            alert(JSON.stringify(response));
        }
        setIsSubmitting(false);
    };

    return (
        <Formik
            initialValues={{ uid: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
        >
            {({ errors }) => (
                <Form className="flex flex-col gap-5 my-8 items-start justify-start w-full">
                    <div className="w-full">
                        <Field
                            type="text"
                            name="uid"
                            placeholder="Email or Mobile Number"
                            className={
                                baseInputStyle +
                                (errors.uid ? errInputStyle : succInputStyle)
                            }
                        />
                        <ErrorMessage
                            name="uid"
                            component="span"
                            className="text-sm text-red-600"
                        />
                    </div>
                    <div className="relative w-full">
                        <Field
                            type={isPasswordVisible ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            className={
                                baseInputStyle +
                                (errors.password
                                    ? errInputStyle
                                    : succInputStyle)
                            }
                        />
                        <button
                            type="button"
                            className="absolute right-0 top-4 px-4 text-gray-600"
                            onClick={togglePasswordVisibility}
                        >
                            {isPasswordVisible ? (
                                <PassVisSVG />
                            ) : (
                                <PassHidSVG />
                            )}
                        </button>
                        <ErrorMessage
                            name="password"
                            component="span"
                            className="text-sm text-red-600"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="transition bg-yellow-400 hover:bg-yellow-500 h-12 font-semibold rounded w-full"
                    >
                        Sign In
                    </button>
                </Form>
            )}
        </Formik>
    );
}
