"use client";

import { signup, validateEmail } from "./actions";
import { Button } from "@/components/ui/button";
import React, { useActionState, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import LabelInput from "@/components/label-input";
import BrandLogo from "@/components/brand-logo";
import Main from "@/components/main";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { title } from "process";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const steps = [
  {
    step_code: "account_setup",
    title: "Account Setup",
    description: "Create an account with your email and password",
  },
  {
    step_code: "personal_information",
    title: "Personal Information",
    description: "Tell us about yourself",
  },
  {
    step_code: "confirmation",
    title: "Confirmation",
    description: "Confirm the information you've provided",
  },
  {
    step_code: "verify",
    title: "Verify",
    description: "Enter the OTP sent to your email",
  },
];

type IFormData = {
  email: string;
  password: string;
  username: string;
  first_name: string;
  middle_name: string;
  last_name: string;
};

export default function SignUpPage() {
  const [finalData, setFinalData] = useState<IFormData>({
    email: "",
    password: "",
    username: "",
    first_name: "",
    middle_name: "",
    last_name: "",
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [previousStep, setPreviousStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Main className="flex flex-col flex-grow gap-24 relative">
      <motion.div
        className="absolute left-0 top-0 h-screen w-screen bg-white pointer-events-none z-40"
        style={{ opacity: isLoading ? 0.5 : 0 }}
      />
      <div className="text-4xl text-center mt-10">
        <BrandLogo />
      </div>
      <div className="flex-grow flex flex-col items-center justify-center">
        <div className="text-center leading-tight mb-4">
          <h1 className="font-bold text-lg">{steps[currentStep].title}</h1>
          <p className="text-sm">{steps[currentStep].description}</p>
        </div>
        <AnimatePresence mode="wait">
          {currentStep === 0 ? (
            <motion.div
              className="flex-grow w-full flex flex-col items-center justify-center"
              key={steps[currentStep].step_code}
              exit={{ opacity: 0, x: "-100%" }}
              transition={{ duration: 0.2, type: "spring", bounce: 0 }}
            >
              <AccountSetup
                setFinalData={setFinalData}
                setCurrentStep={setCurrentStep}
                setIsLoading={setIsLoading}
                isLoading={isLoading}
              />
            </motion.div>
          ) : currentStep === 1 ? (
            <motion.div
              className="flex-grow w-full flex flex-col items-center justify-center"
              key={steps[currentStep].step_code}
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "-100%" }}
              transition={{ duration: 0.2, type: "spring", bounce: 0 }}
            >
              <PersonalInformation
                setFinalData={setFinalData}
                setCurrentStep={setCurrentStep}
                setIsLoading={setIsLoading}
                isLoading={isLoading}
              />
            </motion.div>
          ) : (
            <motion.div
              className="flex-grow w-full flex flex-col items-center justify-center"
              key={steps[currentStep].step_code}
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "-100%" }}
              transition={{ duration: 0.2, type: "spring", bounce: 0 }}
            >
              <Confirmation
                setFinalData={setFinalData}
                finalData={finalData}
                setCurrentStep={setCurrentStep}
                setIsLoading={setIsLoading}
                isLoading={isLoading}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Main>
  );
}

function validatePassword(password: string) {
  // Example: Minimum 8 characters, at least one uppercase letter, one number, and one special character
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

function validateUsername(username: string) {
  const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/;
  return usernameRegex.test(username);
}

const AccountSetup = ({
  setFinalData,
  setCurrentStep,
  setIsLoading,
  isLoading,
}: {
  setFinalData: React.Dispatch<React.SetStateAction<IFormData>>;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
}) => {
  const [data, setData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [invalidUsername, setInvalidUsername] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);

  useEffect(() => {
    setInvalidEmail(false);
  }, [data.email]);

  useEffect(() => {
    setInvalidUsername(false);
  }, [data.username]);

  useEffect(() => {
    setInvalidPassword(false);
  }, [data.password]);

  const handleNext = async () => {
    setIsLoading(true);

    const { ok: email_ok, message } = await validateEmail(data.email);

    if (!data.email || !data.password || !data.username) {
      if (!data.email) {
        setEmailErrorMessage(message);
        setInvalidEmail(true);
      }
      if (!email_ok) {
        setEmailErrorMessage(message);
        setInvalidEmail(true);
      }
      if (!data.username) {
        setInvalidUsername(true);
      }
      if (!data.password) {
        setInvalidPassword(true);
      }
      setIsLoading(false);
      return;
    }

    if (!email_ok) {
      console.log(message);
      setInvalidEmail(true);
      setIsLoading(false);
      return;
    }

    if (!validateUsername(data.username)) {
      setInvalidUsername(true);
      setIsLoading(false);
      return;
    }

    if (!validatePassword(data.password)) {
      setInvalidPassword(true);
      setIsLoading(false);
      return;
    }

    console.log(message);
    setInvalidEmail(false);
    setInvalidUsername(false);
    setInvalidPassword(false);
    setCurrentStep((prev) => prev + 1);
    setIsLoading(false);

    setFinalData((prev) => ({ ...prev, ...data }));
  };

  return (
    <form className="w-full h-full max-w-sm flex flex-col justify-between">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <LabelInput
            label="Email"
            type="email"
            name="email"
            placeholder="Enter email"
            onChange={(e) =>
              setData((prev) => ({ ...prev, email: e.target.value }))
            }
            value={data.email}
            className={cn(invalidEmail && "ring-2 ring-red-500")}
            labelClassName={cn(invalidEmail) && "text-red-500"}
            required
          />
          {invalidEmail && (
            <div className="text-xs px-4 py-2 mb-2 text-red-500 bg-red-100 ring-1 ring-red-500 rounded-sm">
              <p>{emailErrorMessage}</p>
            </div>
          )}
          <LabelInput
            label="Username"
            type="text"
            name="username"
            placeholder="Enter username"
            onChange={(e) =>
              setData((prev) => ({ ...prev, username: e.target.value }))
            }
            value={data.username}
            className={cn(invalidUsername && "ring-2 ring-red-500")}
            labelClassName={cn(invalidUsername) && "text-red-500"}
            required
          />
          {invalidUsername && (
            <div className="text-xs px-4 py-2 mb-2 text-red-500 bg-red-100 ring-1 ring-red-500 rounded-sm">
              <p>Username must be:</p>
              <ul className="list-disc list-inside">
                <li>No special characters like @, #, or spaces.</li>
                <li>Between 3 and 16 characters.</li>
                <li>
                  Ensures usernames are clean, no leading or trailing spaces
                </li>
              </ul>
            </div>
          )}

          <LabelInput
            label="Password"
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={(e) =>
              setData((prev) => ({ ...prev, password: e.target.value }))
            }
            value={data.password}
            className={cn(invalidPassword && "ring-2 ring-red-500")}
            labelClassName={cn(invalidPassword) && "text-red-500"}
            required
          />
          {invalidPassword && (
            <div className="text-xs px-4 py-2 mb-2 text-red-500 bg-red-100 ring-1 ring-red-500 rounded-sm">
              <p>Password must be:</p>
              <ul className="list-disc list-inside">
                <li>at least 8 characters long</li>
                <li>
                  include an uppercase letter, a number, and a special character
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="login" className="text-foreground underline">
            Log in
          </Link>
        </p>
        <Button
          type="button"
          className="w-full"
          size="lg"
          disabled={isLoading}
          onClick={handleNext}
        >
          {isLoading && <Loader2 className="animate-spin" />}
          {isLoading ? "Verifying" : "Next"}
        </Button>
      </div>
    </form>
  );
};

const PersonalInformation = ({
  setFinalData,
  setCurrentStep,
  setIsLoading,
  isLoading,
}: {
  setFinalData: React.Dispatch<React.SetStateAction<IFormData>>;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
}) => {
  const [data, setData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
  });

  const [invalidFirstName, setInvalidFirstName] = useState(false);
  const [invalidMiddleName, setInvalidMiddleName] = useState(false);
  const [invalidLastName, setInvalidLastName] = useState(false);

  const handleNext = async () => {
    setIsLoading(true);

    if (!data.first_name || !data.last_name) {
      setInvalidFirstName(!data.first_name);
      setInvalidLastName(!data.last_name);
      setIsLoading(false);
      return;
    }

    setInvalidFirstName(false);
    setInvalidLastName(false);
    setCurrentStep((prev) => prev + 1);
    setIsLoading(false);

    setFinalData((prev) => ({ ...prev, ...data }));
  };

  return (
    <form className="w-full h-full max-w-sm flex flex-col justify-between">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <LabelInput
            label="First Name"
            type="text"
            name="first_name"
            placeholder="Enter first name"
            onChange={(e) => setData({ ...data, first_name: e.target.value })}
            value={data.first_name}
            className={cn(invalidFirstName && "ring-2 ring-red-500")}
            labelClassName={cn(invalidFirstName && "text-red-500")}
            required
          />
          {invalidFirstName && (
            <div className="text-xs p-2 text-red-500 bg-red-100 border border-red-500 rounded-sm">
              First name is required
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <LabelInput
            label="Middle Name (optional)"
            type="text"
            name="middle_name"
            placeholder="Enter middle name"
            onChange={(e) => setData({ ...data, middle_name: e.target.value })}
            value={data.middle_name}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <LabelInput
            label="Last Name"
            type="text"
            name="last_name"
            placeholder="Enter last name"
            onChange={(e) => setData({ ...data, last_name: e.target.value })}
            value={data.last_name}
            className={cn(invalidLastName && "ring-2 ring-red-500")}
            labelClassName={cn(invalidLastName && "text-red-500")}
            required
          />
          {invalidLastName && (
            <div className="text-xs p-2 text-red-500 bg-red-100 border border-red-500 rounded-sm">
              Last name is required
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Button
          type="button"
          className="w-full"
          size="lg"
          disabled={isLoading}
          onClick={handleNext}
        >
          {isLoading && <Loader2 className="animate-spin" />}
          {isLoading ? "Verifying" : "Next"}
        </Button>
      </div>
    </form>
  );
};

const Confirmation = ({
  setFinalData,
  finalData,
  setCurrentStep,
  setIsLoading,
  isLoading,
}: {
  setFinalData: React.Dispatch<React.SetStateAction<IFormData>>;
  finalData: IFormData;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
}) => {
  const [, formAction, isPending] = useActionState(signup, null);

  const handleNext = async () => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("email", finalData.email);
    formData.append("password", finalData.password);
    formData.append("username", finalData.username);
    formData.append("first_name", finalData.first_name);
    formData.append("middle_name", finalData.middle_name);
    formData.append("last_name", finalData.last_name);

    formAction(formData);

    setIsLoading(false);
  };

  return (
    <form
      className="w-full h-full max-w-sm flex flex-col justify-between"
      action={handleNext}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <h1>Account details</h1>
          <div className="flex flex-col gap-2">
            <LabelInput
              label="Email"
              type="email"
              name="email"
              placeholder="Enter email"
              value={finalData.email}
              required
              disabled
            />
            <LabelInput
              label="Username"
              type="text"
              name="username"
              placeholder="Enter username"
              value={finalData.username}
              required
              disabled
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h1>Personal Information</h1>
          <div className="flex flex-col gap-2">
            <LabelInput
              label="First Name"
              type="text"
              name="first_name"
              placeholder="Enter first name"
              value={finalData.first_name}
              required
              disabled
            />
          </div>
          <div className="flex flex-col gap-2">
            <LabelInput
              label="Middle Name"
              type="text"
              name="middle_name"
              placeholder="Enter middle name"
              value={finalData.middle_name}
              required
              disabled
            />
          </div>
          <div className="flex flex-col gap-2">
            <LabelInput
              label="Last Name"
              type="text"
              name="last_name"
              placeholder="Enter last name"
              value={finalData.last_name}
              required
              disabled
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Button type="submit" className="w-full" size="lg" disabled={isPending}>
          {isPending && <Loader2 className="animate-spin" />}
          {isPending ? "Signing up" : "Sign Up"}
        </Button>
      </div>
    </form>
  );
};

const Verify = ({
  setCurrentStep,
  setIsLoading,
  isLoading,
}: {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
}) => {
  return (
    <form>
      <InputOTP maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </form>
  );
};
