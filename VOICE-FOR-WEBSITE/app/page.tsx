import Image from "next/image";
import TalkToAgent from "@/components/TalkToAgent";

const LOGO_URL =
  "https://media.licdn.com/dms/image/v2/D4D0BAQG1MSbUcvOH4A/company-logo_100_100/B4DZ_ijrZpGYAI-/0/1786212431838/dework_labs_logo?e=1787788800&v=beta&t=iFotOKJml60XdzUUUJvQJgppegIiXIBz92ecGv5UJnU";

export default function Home() {
  return (
    <div className="relative flex min-h-full flex-1 flex-col overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 15% 20%, var(--glow) 0%, transparent 55%), radial-gradient(ellipse 70% 50% at 90% 80%, #dfe8c8 0%, transparent 50%), linear-gradient(160deg, #f7f3ea 0%, #e8efe8 45%, #f3efe6 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.45'/%3E%3C/svg%3E\")",
          backgroundSize: "180px 180px",
        }}
      />

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 py-10 sm:px-10 lg:py-14">
        <TalkToAgent>
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <Image
                src={LOGO_URL}
                alt="DeWork Labs"
                width={56}
                height={56}
                className="rounded-lg"
                priority
              />
              <p className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--ink)] sm:text-4xl">
                DeWork Labs
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold leading-tight tracking-tight text-[var(--ink)] sm:text-5xl">
                Talk with Riya, our receptionist
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-[var(--muted)]">
                A live voice agent for visitors — ask about DeWork Labs and get
                answers in a natural conversation.
              </p>
            </div>
          </div>
        </TalkToAgent>
      </main>
    </div>
  );
}
