import { NextResponse } from "next/server";

import { getCurrentProjectByNumber } from "@/lib/sanity/get-current-project-by-number";

type CurrentProjectCheckRouteProps = {
  params: Promise<{ number: string }>;
};

export async function GET(_request: Request, { params }: CurrentProjectCheckRouteProps) {
  const { number } = await params;
  const project = await getCurrentProjectByNumber(number);

  if (!project) {
    return NextResponse.json(
      { exists: false },
      {
        status: 404,
        headers: { "Cache-Control": "no-store" }
      }
    );
  }

  return NextResponse.json(
    {
      exists: true,
      projectNumber: project.projectNumber
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
