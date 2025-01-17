"use server";

export default async function ErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ message: string }>;
}) {
  const { message } = await searchParams;
  return <p>Sorry, something went wrong. {message}</p>;
}
