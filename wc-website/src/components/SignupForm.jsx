import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { ReactComponent as PassVisSVG } from "../svgs/passvis.svg";
import { ReactComponent as PassHidSVG } from "../svgs/passhid.svg";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

import * as Yup from "yup";
import api from "../service/api";

const signupSchema = Yup.object({
    firstName: Yup.string()
        .required("First name is required")
        .max(320, "First Name limit exceeded"),
    lastName: Yup.string()
        .required("Last name is required")
        .max(320, "First Name limit exceeded"),
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    password: Yup.string()
        .required("This field is required")
        .min(6, "Password must be at least 6 characters"),
    phone: Yup.string().required("Phone number is required"),
});
const baseInputStyle =
    "rounded px-4 my-1 bg-transparent h-12 text-sm md:text-base w-full focus:outline-none";
const errInputStyle =
    " text-red-600 border border-red-400 focus:border-1 focus:border-red-600";
const succInputStyle =
    " border border-gray-300 focus:border-1 focus:border-gray-600";

export default function SignupForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    function togglePasswordVisibility() {
        setIsPasswordVisible((prevState) => !prevState);
    }

    const handleSubmit = async (values, actions) => {
        setIsSubmitting(true);
        const response = await api.signup(values);
        if (response.error) {
            switch (response.error) {
                case "conflict":
                    actions.setErrors({
                        email: response.message,
                        phone: response.message,
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
            initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                password: "",
            }}
            validationSchema={signupSchema}
            onSubmit={handleSubmit}
        >
            {({
                values,
                handleChange,
                handleBlur,
                setFieldValue,
                touched,
                errors,
            }) => (
                <Form className="flex flex-col gap-3 my-8 items-start justify-start w-full">
                    <div className="w-full">
                        <Field
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            className={
                                baseInputStyle +
                                (errors.firstName
                                    ? errInputStyle
                                    : succInputStyle)
                            }
                        />
                        <ErrorMessage
                            name="firstName"
                            component="span"
                            className="text-sm text-red-600"
                        />
                    </div>
                    <div className="w-full">
                        <Field
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            className={
                                baseInputStyle +
                                (errors.lastName
                                    ? errInputStyle
                                    : succInputStyle)
                            }
                        />
                        <ErrorMessage
                            name="lastName"
                            component="span"
                            className="text-sm text-red-600"
                        />
                    </div>
                    <div className="w-full">
                        <Field
                            type="text"
                            name="email"
                            placeholder="Email Address"
                            className={
                                baseInputStyle +
                                (errors.email ? errInputStyle : succInputStyle)
                            }
                        />
                        <ErrorMessage
                            name="email"
                            component="span"
                            className="text-sm text-red-600"
                        />
                    </div>
                    <div className="w-full">
                        <PhoneInput
                            numberInputProps={{
                                className:
                                    baseInputStyle +
                                    (errors.phone
                                        ? errInputStyle
                                        : succInputStyle),
                            }}
                            countrySelectProps={{
                                className:
                                    baseInputStyle +
                                    (errors.phone
                                        ? errInputStyle
                                        : succInputStyle),
                            }}
                            name="phone"
                            value={values.phone}
                            onChange={(phone) => setFieldValue("phone", phone)}
                            onBlur={handleBlur("phone")}
                        />
                        <ErrorMessage
                            name="phone"
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
                        Sign Up
                    </button>
                </Form>
            )}
        </Formik>
    );
}
