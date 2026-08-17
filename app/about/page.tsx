import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getSiteSettings, getTeamMembers } from "@/lib/queries";
import { urlForImage } from "@/sanity/image";
import type { TeamMember } from "@/lib/types";

export const metadata: Metadata = {
  title: "About — The Odoh Publishers",
  description: "The team behind The Odoh Publishers and the story of how it started.",
};

export default async function AboutPage() {
  const [settings, team] = await Promise.all([
    getSiteSettings().catch(() => null),
    getTeamMembers().catch(() => []),
  ]);

  const aboutImgUrl = settings?.aboutImage
    ? urlForImage(settings.aboutImage).width(1600).height(900).url()
    : null;

  return (
    <div className="container-press py-16 md:py-24">
      <p className="eyebrow">About us</p>
      <h1 className="font-display text-4xl md:text-6xl font-bold text-text-primary max-w-2xl mb-12">
        {settings?.aboutHeadline || "The team behind the work that works."}
      </h1>

      <div className="aspect-video bg-bg-secondary rounded-2xl overflow-hidden relative mb-12">
        {aboutImgUrl ? (
          <Image src={aboutImgUrl} alt="The Odoh Publishers team" fill className="object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-text-muted text-sm font-body px-8 text-center">
            Add a story image in Site Settings → About Page → the studio at /studio
          </div>
        )}
      </div>

      <div className="max-w-2xl">
        <p className="font-display text-2xl md:text-3xl font-semibold text-text-primary leading-snug">
          {settings?.aboutStory ||
            "The Odoh Publishers was founded in Nigeria by a group of editors and designers who were tired of watching strong manuscripts stall. We take on a small list of titles each year because we'd rather do a few books well than a lot of books quickly — real editing, honest cover design, and distribution that actually reaches readers."}
        </p>
      </div>

      {team.length > 0 && (
        <div className="mt-24">
          <p className="eyebrow">Our team</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-8">
            {team.map((member: TeamMember) => {
              const photoUrl = member.photo
                ? urlForImage(member.photo).width(500).height(600).url()
                : null;
              return (
                <div key={member._id} className="rounded-xl overflow-hidden border border-border">
                  <div className="aspect-4/5 bg-bg-secondary relative">
                    {photoUrl && (
                      <Image src={photoUrl} alt={member.name} fill className="object-cover grayscale" />
                    )}
                  </div>
                  <div className="p-4">
                    <p className="font-body text-sm font-semibold text-text-primary">{member.name}</p>
                    <p className="font-body text-xs text-text-muted">{member.role}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-20">
        <Link href="/contact" className="btn-pill-primary">
          Get in touch
          <span className="btn-pill-icon">↗</span>
        </Link>
      </div>
    </div>
  );
}
