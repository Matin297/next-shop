"use client";

export default function Error({ error }: { error: Error }) {
  return (
    <div className="space-y-4 rounded-md border border-error p-4">
      <h2 className="text-lg font-semibold text-error">
        Something went wrong!
      </h2>
      <p>{error.message}</p>
    </div>
  );
}
