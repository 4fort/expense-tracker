import Main from "@/components/main";
import { NavBar } from "@/components/nav-bar";
import TitleHeader from "@/components/title-header";
import React from "react";

export default function SavingsPage() {
  return (
    <React.Fragment>
      <TitleHeader title="Savings" />
      <Main>
        <h1>Hello World, Savings</h1>
      </Main>
    </React.Fragment>
  );
}
