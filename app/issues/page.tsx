import { Status } from "@prisma/client";
import CreateIssueBtn from "../componets/CreateIssueBtn";
import Badge from "../componets/Badge";
import Link from "next/link";
import { API_ENDPOINTS } from "@/route-config";

interface Issue {
  id: number;
  title: string;
  status: Status;
  createdAt: string;
}

export default async function Issues() {
  let issues: Issue[] = [];

  try {
    const res = await fetch(API_ENDPOINTS.issues);
    issues = await res.json();
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="p-5">
      <CreateIssueBtn />

      <div className="overflow-x-auto">
        <table className="table">
          <thead className="bg-blue-100">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Status</th>
              <th>Creation Date</th>
            </tr>
          </thead>
          <tbody className="bg-slate-50">
            {issues.length > 0 ? (
              issues.map((issue, index) => (
                <tr key={issue.id}>
                  <td>{index + 1}</td>
                  <td>
                    <Link
                      href={`/issues/${issue.id}`}
                      className="text-blue-500 hover:text-blue-700 underline cursor-pointer"
                    >
                      {issue.title}
                    </Link>
                  </td>

                  <td>
                    <Badge status={issue.status} />
                  </td>
                  <td>{new Date(issue.createdAt).toDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center p-4">
                  No issues found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";
