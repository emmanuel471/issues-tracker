import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CreateIssueBtn from "../componets/CreateIssueBtn";

const LoadingIssues = () => {
  const issues = [1, 2, 3, 4, 5];
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
              issues.map((issue) => (
                <tr key={issue}>
                  <td>
                    <Skeleton />
                  </td>
                  <td>
                    <Skeleton />
                  </td>
                  <td>
                    <Skeleton />
                  </td>
                  <td>
                    <Skeleton />
                  </td>
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
};

export default LoadingIssues;
