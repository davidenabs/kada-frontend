import React from "react";

function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-red-500">
          Unauthorized Access
        </h1>
        <p>You do not have permission to access this page.</p>
        {/* <Link href="/dashboard" className="mt-4 text-blue-500 hover:underline">
              Go to Dashboard
            </Link> */}
      </div>
    </div>
  );
}

export default Unauthorized;
