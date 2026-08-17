import Image from "next/image";
import type { Metadata } from "next";
import { getSiteSettings, getTeamMembers } from "@/lib/queries";
import { urlForImage } from "@/sanity/image";

export const metadata: Metadata = {
  title: "About — Adire Press",
  description: "The story behind Adire Press and the people who run it.",
};

export default async function AboutPage() {
  const [settings, team] = await Promise.all([
    getSiteSettings().catch(() => null),
    getTeamMembers().catch(() => []),
  ]);

  return (
    <div className="container-press py-16 md:py-24">
      <p className="marginalia">Our story</p>
      <h1 className="font-display text-4xl md:text-5xl text-ink max-w-2xl">
        We started Adire Press because too many good Nigerian manuscripts
        were going nowhere.
      </h1>

      <div className="mt-12 max-w-prose font-body text-ink/80 text-lg leading-relaxed space-y-5">
        {settings?.aboutStory ? (
          settings.aboutStory
            .split("\n")
            .filter(Boolean)
            .map((para: string, i: number) => <p key={i}>{para}</p>)
        ) : (
          <>
            <p>
              Adire Press was founded in Lagos by a small group of editors
              and designers who were tired of watching strong manuscripts
              stall — not for lack of talent, but for lack of a publisher
              willing to do the unglamorous work: real editing, honest
              cover design, and distribution that actually reaches readers.
            </p>
            <p>
              We take on a small list of titles each year — fiction, poetry,
              and non-fiction — because we&apos;d rather do a few books well
              than a lot of books quickly. Every manuscript we accept gets a
              full editorial pass, a cover designed specifically for it, and
              a real go at both print and online distribution.
            </p>
            <p>
              We&apos;re named for adire, the resist-dyed cloth of southwest
              Nigeria — made slowly, by hand, built to hold its pattern for
              decades. That&apos;s the standard we hold books to.
            </p>
          </>
        )}
      </div>

      {team.length > 0 && (
        <div className="mt-20">
          <p className="marginalia">The people</p>
          <h2 className="font-display text-2xl md:text-3xl text-ink mb-10">
            Who you&apos;ll work with
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
            {team.map((member: any) => {
              const photoUrl = member.photo
                ? urlForImage(member.photo).width(400).height(400).url()
                : null;
              return (
                <div key={member._id}>
                  <div className="aspect-square bg-paper-dim relative mb-4 overflow-hidden">
                    {photoUrl ? (
                      <Image
                        src={photoUrl}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    ) : null}
                  </div>
                  <p className="font-display text-lg text-ink">{member.name}</p>
                  <p className="font-body text-sm text-rust mb-2">{member.role}</p>
                  {member.bio && (
                    <p className="font-body text-sm text-ink/70">{member.bio}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
