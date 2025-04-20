import { prisma } from "@/prisma/migrations/client";
import createIssuesSchema from "@/prisma/createIssuesSchema";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ response: "Unauthorized " }, { status: 401 });
  }
  const { id } = await params;
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ response: "Unauthorized " }, { status: 401 });
  }
  const { id } = await params;

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!issue) {
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  }

  try {
    await prisma.issue.delete({
      where: { id: issue.id },
    });

    return NextResponse.json({ response: "Issue Deleted" }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { error: "Could not delete issue," + e },
      { status: 500 }
    );
  }
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const issue = await prisma.issue.findUnique({
      where: { id: parseInt(id) },
    });

    if (!issue) {
      return NextResponse.json({ error: "Issue not found" }, { status: 404 });
    }

    return NextResponse.json(issue);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch issue" + error },
      { status: 500 }
    );
  }
}
