"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/studio/sanity.config";

export default function Studio() {
  return <NextStudio config={config} />;
}