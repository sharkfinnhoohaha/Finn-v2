import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/lib/types';

export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <section className="bg-bone px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1800px]">
        <div className="mb-10 flex items-end justify-between md:mb-16">
          <div>
            <p className="spec mb-3 text-ink/50">01 / selected work</p>
            <h3 className="font-display text-5xl leading-[0.9] tracking-tightest md:text-7xl">
              From the <span className="italic">ground</span>.
            </h3>
          </div>
          <Link href="/#ground" className="spec hidden text-ink/60 hover:text-ink md:block">
            View all ↗
          </Link>
        </div>

        <div className="grid gap-x-6 gap-y-14 md:grid-cols-2 md:gap-x-10">
          {projects.map((p, i) => (
            <ProjectCard key={p._id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  // offset every other card for a more dynamic grid
  const offset = index % 2 === 1 ? 'md:mt-20' : '';

  return (
    <Link href={project.url || '#'} target="_blank" rel="noreferrer" className={`tile group block ${offset}`}>
      <div className="relative aspect-[4/3] overflow-hidden bg-ink/5">
        {project.cover?.url ? (
          <Image
            src={project.cover.url}
            alt={project.cover.alt || project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            placeholder={project.cover.lqip ? 'blur' : 'empty'}
            blurDataURL={project.cover.lqip}
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="spec text-ink/30">placeholder</span>
          </div>
        )}
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h4 className="font-display text-3xl leading-tight md:text-4xl">
            {project.title}
          </h4>
          {project.summary && (
            <p className="mt-2 max-w-lg text-base text-ink/70">{project.summary}</p>
          )}
          {project.stack && project.stack.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.stack.map((t) => (
                <li
                  key={t}
                  className="spec rounded-full border border-ink/20 bg-bone-200/40 px-2.5 py-0.5 text-ink/70 transition-colors group-hover:border-ink/60"
                >
                  {t}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="text-right">
          <p className="spec text-ink/40">{project.year}</p>
          <p className="spec mt-1 text-ink/60">{project.role}</p>
        </div>
      </div>
    </Link>
  );
}
