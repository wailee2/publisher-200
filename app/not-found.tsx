import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-press h-[calc(100vh-8em)] flex flex-col items-center justify-center  text-center">
      <p className="eyebrow justify-center mb-1">404</p>
      <h2 className="mb-3">
        Page Not Found!
      </h2>
      <p className="mb-8">
        Sorry, the page you&apos;re looking for doesn&apos;t or has been moved elsewhere.
      </p>
      <Link href="/" className="btn-primary">
        Back to home
      </Link>
    </div>
  );
}
