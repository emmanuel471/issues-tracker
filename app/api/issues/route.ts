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

export async function GET() {
  const issues = await prisma.issue.findMany({});

  return NextResponse.json(issues);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await request.json();
  const validation = createIssuesSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { response: validation.error.format() },
      { status: 400 }
    );
  }

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!issue) {
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  }

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(updatedIssue, { status: 200 });
}
