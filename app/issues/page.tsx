import { Status } from "@prisma/client";
import CreateIssueBtn from "../componets/CreateIssueBtn";
import Badge from "../componets/Badge";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface Issue {
  id: number;
  title: string;
  status: Status;
  createdAt: string;
}

export default async function Issues() {
  await delay(2000);

  let issues: Issue[] = [];

  try {
    const res = await fetch("http://localhost:3000/api/issues");
    issues = await res.json();
  } catch (error) {
    console.log(error);
  }

  await delay(2000);

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
                  <td>{issue.title}</td>
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
