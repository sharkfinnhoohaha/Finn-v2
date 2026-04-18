import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/lib/types';

export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <section className="bg-bone px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1800px]">
        <div className="mb-10 flex items-end justify-between md:mb-16">
          <div>
            <p className="spec mb-3 text-ink/30">Selected Work</p>
            <h3 className="font-display text-5xl font-semibold tracking-tightest md:text-7xl" style={{ lineHeight: 0.95 }}>
              From the ground.
            </h3>
          </div>
          <Link href="/#ground" className="spec hidden text-ink/40 hover:text-ink transition-colors md:block">
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
            <span className="spec text-ink/20">placeholder</span>
          </div>
        )}
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h4 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
            {project.title}
          </h4>
          {project.summary && (
            <p className="mt-2 max-w-lg text-sm text-ink/60 leading-relaxed">{project.summary}</p>
          )}
          {project.stack && project.stack.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.stack.map((t) => (
                <li key={t} className="spec rounded-full border border-ink/15 px-2.5 py-1 text-ink/50">
                  {t}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="shrink-0 text-right">
          <p className="spec text-ink/30">{project.year}</p>
          <p className="spec mt-1 text-ink/50">{project.role}</p>
        </div>
      </div>
    </Link>
  );
}
