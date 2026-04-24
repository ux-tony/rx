import { StudioApp } from "@/components/studio-app";
import { StudioSetupNotice } from "@/components/studio-setup-notice";
import { sanityEnvReady } from "@/sanity/env";

export default function StudioPage() {
  if (!sanityEnvReady) {
    return <StudioSetupNotice />;
  }

  return <StudioApp />;
}
