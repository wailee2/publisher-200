import Image from "next/image";
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
    
    <section className="container-press section-space-y page-space-y pt-[6em] md:pt-[8em]">
      <div className="container-layout  ">
        <div className="col-span-2">
          <p className="eyebrow">About us</p>
        </div>

        <div className="col-start-4 col-span-7 ">
          <h1 className="">
            {settings?.aboutHeadline || "The team behind the work that works."}
          </h1>
        </div>
      </div>

      <div className="aspect-video bg-bg-secondary rounded-2xl overflow-hidden relative ">
        {aboutImgUrl ? (
          <Image 
            src={aboutImgUrl} 
            alt="The Odoh Publishers team" 
            fill 
            className="object-cover" 
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-text-muted text-small px-8 text-center">
            Story image not available
          </div>
        )}
      </div>

      <div className=" lg:grid grid-cols-12 gap-[1.25em]">
        <h2 className="col-span-7">
          {settings?.aboutStory ||
            "The Odoh Publishers was founded in Nigeria by a group of editors and designers who were tired of watching strong manuscripts stall."}
        </h2>
      </div>

      {team.length > 0 && (
        <div className="">
          <p className="eyebrow">Our team</p>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-[1.25em] mt-6">
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
                  <div className="p-[0.5em]">
                    <p className="font-body text-small font-semibold ">{member.name}</p>
                    <p className="font-body text-xsmall text-text-muted">{member.role}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
