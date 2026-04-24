"use client";

import { NextStudio } from "next-sanity/studio";
import studioConfig from "@/sanity.config";

export function StudioApp() {
  return <NextStudio config={studioConfig} />;
}
