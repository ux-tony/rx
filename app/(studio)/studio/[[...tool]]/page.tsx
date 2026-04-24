import { NextStudio } from "next-sanity/studio";
import { StudioSetupNotice } from "@/components/studio-setup-notice";
import { sanityEnvReady } from "@/sanity/env";
import studioConfig from "@/sanity.config";

export default function StudioPage() {
  if (!sanityEnvReady) {
    return <StudioSetupNotice />;
  }

  return <NextStudio config={studioConfig} />;
}
