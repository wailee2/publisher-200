import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-press py-32 text-center">
      <p className="eyebrow justify-center">404</p>
      <h1 className="font-display text-4xl font-bold text-text-primary mb-4">
        This page hasn&apos;t been written yet.
      </h1>
      <p className="font-body text-text-secondary mb-8">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link href="/" className="btn-primary">
        Back to home
      </Link>
    </div>
  );
}
