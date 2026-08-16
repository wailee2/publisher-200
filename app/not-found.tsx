import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-press py-32 text-center">
      <p className="marginalia justify-center">404</p>
      <h1 className="font-display text-4xl text-ink mb-4">
        This page hasn&apos;t been written yet.
      </h1>
      <p className="font-body text-ink/70 mb-8">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link href="/" className="btn-primary">
        Back to home
      </Link>
    </div>
  );
}
