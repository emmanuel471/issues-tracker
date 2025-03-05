import { prisma } from "@/prisma/migrations/client";
import createIssuesSchema from "@/prisma/createIssuesSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createIssuesSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { errors: validation.error.format() },
      { status: 400 }
    );
  }

  const issue = await prisma.issue.findUnique({
    where: { title: body.title },
  });

  if (issue) {
    return NextResponse.json(
      { error: "Duplicate entry of issue title" },
      { status: 409 }
    );
  }

  const issueCreated = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json({ reponse: issueCreated }, { status: 201 });
}
