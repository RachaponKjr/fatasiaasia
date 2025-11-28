import React from "react";
import Packages from "./packages";
import api from "@/server";

export default async function DynamicPackage() {
  //   const { data: tour } = await api.tour.getTour();

  return <Packages />;
}
