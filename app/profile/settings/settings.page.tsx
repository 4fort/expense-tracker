"use client";

import Main from "@/components/main";
import TitleHeader from "@/components/title-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

const context = {
  title: "Settings",
};

export default function SettingsPageComponent() {
  return (
    <AnimatePresence>
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
          <AppearanceSettings />
        </Main>
      </motion.div>
    </AnimatePresence>
  );
}

const AppearanceSettings = () => {
  const { theme, setTheme } = useTheme();
  const [isAutomatic, setIsAutomatic] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<string>("");

  useEffect(() => {
    if (theme === "system") {
      setIsAutomatic(true);
      setSelectedTheme(
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
      );
    } else {
      setIsAutomatic(false);
      setSelectedTheme(theme!);
    }
  }, [theme]);

  return (
    <Card>
      <CardHeader>
        <CardDescription>Appearance</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup
          className="flex justify-around w-full"
          value={selectedTheme}
          onValueChange={(value) => {
            setSelectedTheme(value);
            setTheme(value);
          }}
        >
          <div className="flex flex-col items-center gap-2">
            <Label htmlFor="light" className="text-center">
              <ThemePreview theme="light" />
              <span>Light</span>
            </Label>
            <RadioGroupItem value="light" id="light" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <Label htmlFor="dark" className="text-center">
              <ThemePreview theme="dark" />
              <span>Dark</span>
            </Label>
            <RadioGroupItem value="dark" id="dark" />
          </div>
        </RadioGroup>
        <Separator orientation="horizontal" className="my-4" />
        <div className="flex items-center justify-between">
          <Label htmlFor="system-toggle" className="text-md">
            System
          </Label>
          <Switch
            id="system-toggle"
            checked={isAutomatic}
            onCheckedChange={(checked) => {
              setIsAutomatic(checked);
              setTheme(checked ? "system" : selectedTheme);
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

const ThemePreview = ({ theme }: { theme: "dark" | "light" }) => {
  return (
    <div
      className={cn(
        "h-32 w-16 rounded-lg m-2",
        theme === "dark" ? "bg-zinc-700" : "bg-zinc-200"
      )}
    ></div>
  );
};
