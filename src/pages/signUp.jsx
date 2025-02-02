import Joi from "joi";
import { useFormik } from "formik";
import Input from "../components/common/input";
// import PageHeader from "../components/common/pageHeader";
// import usersService from "../services/usersService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth.context";
import { emailRegex, passwordRegex } from "../components/Regex";

function Signup() {
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const { signUp } = useAuth();

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      name: {
        first: "",
        middle: "",
        last: "",
      },
      email: "",
      password: "",
      phone: "",
      address: {
        country: "",
        city: "",
        street: "",
        houseNumber: "",
        zip: "",
      },
      image: {
        url: "",
        alt: "",
      },
      isBusiness: false,
    },
    validate(values) {
      const schema = Joi.object({
        name: Joi.object()
          .required()
          .keys({
            first: Joi.string().min(2).max(256).required().label("first"),
            middle: Joi.string().min(2).max(256).label("middle"),
            last: Joi.string().min(2).max(256).required().label("last"),
          }),
        email: Joi.string()
          .min(5)
          .required()
          .email({ tlds: { allow: false } })
          .label("Email")
          .pattern(emailRegex)
          .message("email must be a standard email"),

        password: Joi.string()
          .pattern(passwordRegex)
          .required()
          .label("Password")
          .messages({
            "string.pattern.base":
              "password must be at least nine characters long and contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&*-",
          }),

        phone: Joi.string()
          .pattern(/^[0-9]{9,15}$/)
          .required()
          .label("Phone")
          .messages({
            "string.pattern.base":
              "Phone number must be between 9 and 10 digits.",
          }),
        address: Joi.object({
          country: Joi.string().min(2).max(256).required(),
          city: Joi.string().min(2).max(256).required(),
          street: Joi.string().min(2).max(256).required(),
          houseNumber: Joi.number().min(1).max(256).required(),
          zip: Joi.number().min(2).required(),
        }),
        image: Joi.object({
          url: Joi.string().min(14),
          alt: Joi.string().min(2).max(256),
        }),
        isBusiness: Joi.boolean(),
      });

      const { error } = schema.validate(values, { abortEarly: false });
      if (!error) {
        return null;
      }

      const errors = {};
      for (const detail of error.details) {
        const key = detail.path.join(".");

        errors[key] = detail.message;
      }

      return errors;
    },
    async onSubmit(values) {
      try {
        const res = await signUp(values);
        console.log(res);
        navigate("/sign-in");
      } catch (err) {
        if (err.response?.status === 400) {
          setServerError(err.response.data);
          console.log(err.response.data);
        }
        console.log(err);
      }
    },
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center", // Center horizontally
        minHeight: "100vh", // Full viewport height for vertical centering
        background: "var(--background-color)",
        color: "var(--text-color)",
      }}
    >
      <h1
        className="mx-5 mb-4 pt-4 pb-4"
        style={{ textAlign: "center", borderBottom: "2px solid black" }}
      >
        Sign Up
      </h1>
      <form
        onSubmit={form.handleSubmit}
        style={{ width: "100%", maxWidth: "200px" }}
      >
        <Input
          {...form.getFieldProps("name.first")}
          label="First Name"
          required
          placeholder="John"
          error={form.touched.name?.first && form.errors["name.first"]}
          type="text"
        />
        <Input
          {...form.getFieldProps("name.middle")}
          label="Middle Name"
          placeholder="Doe"
          error={form.touched.name?.last && form.errors["name.middle"]}
          type="text"
        />
        <Input
          {...form.getFieldProps("name.last")}
          label="Last Name"
          required
          placeholder="Doe"
          error={form.touched.name?.last && form.errors["name.last"]}
          type="text"
        />
        <Input
          {...form.getFieldProps("email")}
          label="Email"
          required
          placeholder="john.doe@example.com"
          error={form.touched.email && form.errors.email}
          type="text"
        />
        <Input
          {...form.getFieldProps("password")}
          label="Password"
          required
          placeholder="Your Password"
          error={form.touched.password && form.errors.password}
          type="password"
        />
        <Input
          {...form.getFieldProps("phone")}
          label="Phone"
          required
          placeholder="1234567890"
          error={form.touched.phone && form.errors.phone}
          type="text"
        />
        <Input
          {...form.getFieldProps("address.country")}
          label="Country"
          required
          placeholder="Country"
          error={
            form.touched.address?.country && form.errors["address.country"]
          }
          type="text"
        />
        <Input
          {...form.getFieldProps("address.city")}
          label="City"
          required
          placeholder="City"
          error={form.touched.address?.city && form.errors["address.city"]}
          type="text"
        />
        <Input
          {...form.getFieldProps("address.street")}
          label="Street"
          required
          placeholder="Street"
          error={form.touched.address?.street && form.errors["address.street"]}
          type="text"
        />
        <Input
          {...form.getFieldProps("address.houseNumber")}
          label="House Number"
          required
          placeholder="123"
          error={
            form.touched.address?.houseNumber &&
            form.errors["address.houseNumber"]
          }
          type="text"
        />
        <Input
          {...form.getFieldProps("address.zip")}
          label="Zip"
          required
          placeholder="12345"
          error={form.touched.address?.zip && form.errors["address.zip"]}
          type="text"
        />
        <Input
          {...form.getFieldProps("image.url")}
          label="Image URL"
          required
          placeholder="http://example.com/image.jpg"
          error={form.touched.image?.url && form.errors["image.url"]}
          type="text"
        />
        <Input
          {...form.getFieldProps("image.alt")}
          label="Image Alt Text"
          required
          placeholder="Profile Image"
          error={form.touched.image?.alt && form.errors["image.alt"]}
          type="text"
        />
        <div className="form-check">
          <input
            {...form.getFieldProps("isBusiness")}
            type="checkbox"
            className="form-check-input"
            id="isBusiness"
          />
          <label className="form-check-label" htmlFor="isBusiness">
            Business Account
          </label>
        </div>
        {serverError && <div className="alert alert-danger">{serverError}</div>}

        <button
          disabled={!form.isValid}
          className="btn btn-primary"
          type="submit"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;
