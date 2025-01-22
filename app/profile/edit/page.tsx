"use client";

import LabelInput from "@/components/label-input";
import Main from "@/components/main";
import TitleHeader from "@/components/title-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { TUserData } from "@/types/TUserData";
import { AnimatePresence, motion } from "motion/react";
import React, { useActionState, useEffect, useRef, useState } from "react";
import { changePassword, verifyPassword } from "./action";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import useAuthPersist from "@/hooks/useAuthPersist";

const context = {
  title: "Edit Profile",
};

export default function EditProfilePage() {
  const { user } = useAuthPersist();

  const fullName = `${user?.first_name} ${user?.last_name}`;
  const urlEcodedFullName = encodeURIComponent(fullName);
  return (
    <AnimatePresence mode="sync">
      <motion.div
        key="edit-profile"
        initial={{ x: "100%", overflow: "hidden" }}
        animate={{ x: 0, overflow: "auto" }}
        exit={{ x: "100%", overflow: "hidden" }}
        transition={{ duration: 0.2, type: "spring", bounce: 0 }}
        className="h-[inherit] p-[inherit] bg-accent"
      >
        <TitleHeader
          title={context.title}
          className="bg-accent/30 backdrop-blur-md"
          size="md"
          hasBackButton
        />
        <Main>
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="border-2 rounded-full p-1 h-24 w-24 text-5xl font-bold flex items-center justify-center">
              <Avatar className="w-full h-full">
                <AvatarImage
                  src={`https://api.dicebear.com/9.x/shapes/svg?seed=${urlEcodedFullName}`}
                />
                <AvatarFallback>
                  <p>{user?.first_name.charAt(0)}</p>
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="w-full flex flex-col gap-4">
              {user ? (
                <PersonalInformationPreview user={user} />
              ) : (
                <PreviewSkeleton />
              )}
              {user ? <AccountPreview user={user} /> : <PreviewSkeleton />}
              {user ? <PasswordPreview /> : <PreviewSkeleton />}
            </div>
          </div>
        </Main>
      </motion.div>
    </AnimatePresence>
  );
}

const PersonalInformationPreview = ({ user }: { user: TUserData }) => {
  return (
    <Card>
      <CardHeader>
        <CardDescription>Personal Information</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <LabelInput label="First Name" value={user.first_name} disabled />
        <LabelInput label="Middle Name" value={user.middle_name} disabled />
        <LabelInput label="Last Name" value={user.last_name} disabled />
      </CardContent>
    </Card>
  );
};

// const EditPersonalInformationDrawer = () => {
//   return (
//     <Drawer>
//       <DrawerTrigger asChild>
//         <Button>Edit</Button>
//       </DrawerTrigger>
//       <DrawerContent>
//         <DrawerHeader>
//           <DrawerTitle>Edit Personal Information</DrawerTitle>
//           <DrawerDescription></DrawerDescription>
//         </DrawerHeader>
//         <div className="">
//           <form action=""></form>
//         </div>
//         <DrawerFooter>
//           <Button>Submit</Button>
//           <DrawerClose asChild>
//             <Button variant="outline">Cancel</Button>
//           </DrawerClose>
//         </DrawerFooter>
//       </DrawerContent>
//     </Drawer>
//   );
// };

const AccountPreview = ({ user }: { user: TUserData }) => {
  return (
    <Card>
      <CardHeader>
        <CardDescription>Account</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <LabelInput label="Email" value={user.email} disabled />
        <LabelInput label="Username" value={user.username} disabled />
      </CardContent>
    </Card>
  );
};

// const EditAccountDrawer = () => {
//   return (
//     <Drawer>
//       <DrawerTrigger asChild>
//         <Button>Edit</Button>
//       </DrawerTrigger>
//       <DrawerContent>
//         <DrawerHeader>
//           <DrawerTitle>Edit Account</DrawerTitle>
//           <DrawerDescription></DrawerDescription>
//         </DrawerHeader>
//         <div className="">
//           <form action=""></form>
//         </div>
//         <DrawerFooter>
//           <Button>Submit</Button>
//           <DrawerClose asChild>
//             <Button variant="outline">Cancel</Button>
//           </DrawerClose>
//         </DrawerFooter>
//       </DrawerContent>
//     </Drawer>
//   );
// };

const PasswordPreview = () => {
  return (
    <Card>
      <CardHeader>
        <CardDescription>Password</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <LabelInput label="Password" value="••••••••••" disabled />
      </CardContent>
      <CardFooter className="justify-end">
        <EditPasswordDrawer />
      </CardFooter>
    </Card>
  );
};

const EditPasswordDrawer = () => {
  const [state, formAction, isPending] = useActionState(changePassword, null);

  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [currentPasswordInvalid, setCurrentPasswordInvalid] = useState("");
  const [newPassword, setNewPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [newPasswordInvalid, setCurrentNewPasswordInvalid] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const isChangePasswordForm = currentStep === 1;

  const handleNext = async () => {
    setIsLoading(true);

    if (!currentPassword) {
      setCurrentPasswordInvalid("Please type your current password!");
      setIsLoading(false);
      return;
    }

    if (!(await verifyPassword(currentPassword))) {
      setCurrentPasswordInvalid(
        "The password you entered does not match with your current password."
      );
      setIsLoading(false);
      return;
    }

    setCurrentStep((prev) => prev + 1);

    setIsLoading(false);
  };

  const handleSubmit = async () => {
    if (!newPassword.newPassword || !newPassword.confirmPassword) {
      if (!newPassword.newPassword) {
        setCurrentNewPasswordInvalid((prev) => ({
          ...prev,
          newPassword: "Please type your new password!",
        }));
      }
      if (!newPassword.confirmPassword) {
        setCurrentNewPasswordInvalid((prev) => ({
          ...prev,
          confirmPassword: "Please type your new password confirmation!",
        }));
      }
      setIsLoading(false);
      return;
    }

    if (newPassword.newPassword !== newPassword.confirmPassword) {
      setCurrentNewPasswordInvalid((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match!",
      }));
      setIsLoading(false);
      return;
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(newPassword.newPassword)) {
      setCurrentNewPasswordInvalid((prev) => ({
        ...prev,
        newPassword: "pwd_reqs",
      }));
      setIsLoading(false);
      return;
    }

    setCurrentNewPasswordInvalid({
      confirmPassword: "",
      newPassword: "",
    });

    const formData = new FormData();
    formData.append("password", newPassword.newPassword);
    formAction(formData);

    setCurrentStep((prev) => prev + 1);
  };

  const formContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (formContainerRef.current) {
        formContainerRef.current.style.setProperty(
          "bottom",
          `env(safe-area-inset-bottom)`
        );
      }
    };

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", handleResize);
      handleResize(); // Initial call in case the keyboard is already open
    }

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  return (
    <Drawer
      dismissible={!isLoading}
      onAnimationEnd={() => {
        setCurrentStep(0);
        setCurrentPassword("");
        setCurrentPasswordInvalid("");
        setNewPassword({
          confirmPassword: "",
          newPassword: "",
        });
      }}
    >
      <DrawerTrigger asChild>
        <Button>Change password</Button>
      </DrawerTrigger>
      <DrawerContent ref={formContainerRef} className="min-h-[70vh]">
        <DrawerHeader>
          <DrawerTitle>Change Password</DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <form
          action={isChangePasswordForm ? handleSubmit : ""}
          className="flex-grow flex flex-col"
        >
          <AnimatePresence>
            {currentStep === 0 ? (
              <CurrentPasswordForm
                currentPassword={currentPassword}
                setCurrentPassword={setCurrentPassword}
                currentPasswordInvalid={currentPasswordInvalid}
              />
            ) : currentStep === 1 ? (
              <NewPasswordForm
                newPassword={newPassword}
                setNewPassword={setNewPassword}
                newPasswordInvalid={newPasswordInvalid}
              />
            ) : (
              currentStep === 2 && (
                <motion.div
                  className="text-center"
                  key="pwd_change_success"
                  initial={{ opacity: 0, x: "100%" }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, type: "spring", bounce: 0 }}
                >
                  <span className={cn("font-bold", state && "text-red-500")}>
                    {state
                      ? state.error.message
                      : "Successfully Changed Password!"}
                  </span>
                  <p className="text-sm opacity-50">
                    You can now close this form
                  </p>
                </motion.div>
              )
            )}
          </AnimatePresence>
          <DrawerFooter>
            {currentStep < 2 && (
              <Button
                type={isChangePasswordForm ? "submit" : "button"}
                onClick={async () => {
                  if (!isChangePasswordForm) {
                    await handleNext();
                  }
                }}
                disabled={isLoading || isPending}
              >
                {(isLoading || isPending) && (
                  <Loader2 className="animate-spin" />
                )}
                {isLoading || isPending
                  ? "Verifying"
                  : currentStep === 1
                  ? "Change password"
                  : "Next"}
              </Button>
            )}
            <DrawerClose asChild>
              <Button variant="outline" disabled={isLoading || isPending}>
                {currentStep < 2 ? "Cancel" : "Close"}
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

const CurrentPasswordForm = ({
  currentPassword,
  setCurrentPassword,
  currentPasswordInvalid,
}: {
  currentPassword: string;
  setCurrentPassword: React.Dispatch<React.SetStateAction<string>>;
  currentPasswordInvalid: string;
}) => {
  return (
    <motion.div
      className="p-4 flex flex-col gap-2"
      key="current_pwd_form"
      exit={{ opacity: 0, x: "-100%" }}
      transition={{ duration: 0.2, type: "spring", bounce: 0 }}
    >
      <LabelInput
        type="password"
        label="Current Password"
        value={currentPassword}
        placeholder="Enter your current password"
        onChange={(e) => setCurrentPassword(e.target.value)}
        className={cn(currentPasswordInvalid && "ring-2 ring-red-500")}
        labelClassName={cn(currentPasswordInvalid && "text-red-500")}
      />
      {currentPasswordInvalid && (
        <div className="text-xs px-4 py-2 mb-2 text-red-500 bg-red-100 ring-1 ring-red-500 rounded-sm">
          <p>{currentPasswordInvalid}</p>
        </div>
      )}
    </motion.div>
  );
};

const NewPasswordForm = ({
  newPassword,
  setNewPassword,
  newPasswordInvalid,
}: {
  newPassword: {
    newPassword: string;
    confirmPassword: string;
  };
  setNewPassword: React.Dispatch<
    React.SetStateAction<{
      newPassword: string;
      confirmPassword: string;
    }>
  >;
  newPasswordInvalid: {
    newPassword: string;
    confirmPassword: string;
  };
}) => {
  return (
    <motion.div
      className="p-4 flex flex-col gap-2"
      key="new_pwd_form"
      initial={{ opacity: 0, x: "100%" }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: "-100%" }}
      transition={{ duration: 0.2, type: "spring", bounce: 0 }}
    >
      <LabelInput
        type="password"
        label="New Password"
        value={newPassword.newPassword}
        placeholder="Enter your new password"
        onChange={(e) => {
          setNewPassword((prev) => ({
            ...prev,
            newPassword: e.target.value,
          }));
        }}
        className={cn(newPasswordInvalid.newPassword && "ring-2 ring-red-500")}
        labelClassName={cn(newPasswordInvalid.newPassword && "text-red-500")}
      />
      {newPasswordInvalid.newPassword === "pwd_reqs" ? (
        <div className="text-xs px-4 py-2 mb-2 text-red-500 bg-red-100 ring-1 ring-red-500 rounded-sm">
          <p>Username must be:</p>
          <ul className="list-disc list-inside">
            <li>No special characters like @, #, or spaces.</li>
            <li>Between 3 and 16 characters.</li>
            <li>Ensures usernames are clean, no leading or trailing spaces</li>
          </ul>
        </div>
      ) : (
        newPasswordInvalid.newPassword && (
          <div className="text-xs px-4 py-2 mb-2 text-red-500 bg-red-100 ring-1 ring-red-500 rounded-sm">
            <p>{newPasswordInvalid.newPassword}</p>
          </div>
        )
      )}

      <LabelInput
        type="password"
        label="Confirm New Password"
        value={newPassword.confirmPassword}
        placeholder="Confirm your new password"
        onChange={(e) => {
          setNewPassword((prev) => ({
            ...prev,
            confirmPassword: e.target.value,
          }));
        }}
        className={cn(
          newPasswordInvalid.confirmPassword && "ring-2 ring-red-500"
        )}
        labelClassName={cn(
          newPasswordInvalid.confirmPassword && "text-red-500"
        )}
      />
      {newPasswordInvalid.confirmPassword && (
        <div className="text-xs px-4 py-2 mb-2 text-red-500 bg-red-100 ring-1 ring-red-500 rounded-sm">
          <p>{newPasswordInvalid.confirmPassword}</p>
        </div>
      )}
    </motion.div>
  );
};

const PreviewSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <CardDescription>Personal Information</CardDescription>
      </CardHeader>
      <CardContent>
        <LabelInput label="" value={""} disabled />
        <LabelInput label="" value={""} disabled />
        <LabelInput label="" value={""} disabled />
      </CardContent>
      <CardFooter className="justify-end">
        <Button>&nbsp;</Button>
      </CardFooter>
    </Card>
  );
};
