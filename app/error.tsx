"use client";

export default function Error({ error }: { error: Error }) {
  return (
    <>
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
    </>
  );
}
