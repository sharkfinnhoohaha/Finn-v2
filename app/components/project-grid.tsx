import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/lib/types';

export function ProjectGrid({ projects }: { projects: Project[] }) {
  if (!projects || projects.length === 0) return null;

  return (
    <section className="bg-bone px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 flex items-end justify-between border-b border-ink/10 pb-4 md:mb-16">
          <div>
            <p className="spec mb-2 text-ink/50">01 / Selected Work</p>
            <h3 className="font-display text-giga tracking-tightest">From the ground.</h3>
          </div>
          <Link href="/#ground" className="spec hidden text-ink/60 hover:text-ink md:block">
            View all ↗
          </Link>
        </div>

        <div className="grid gap-x-6 gap-y-16 md:grid-cols-2 md:gap-x-10">
          {projects.map((p) => (
            <ProjectCard key={p._id} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={project.url || '#'}
      target="_blank"
      rel="noreferrer"
      className="tile group block"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-ink/[0.04]">
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
            <span className="spec text-ink/30">No cover</span>
          </div>
        )}
      </div>
      <div className="mt-4 flex items-start justify-between gap-6 border-t border-ink/10 pt-4">
        <div className="min-w-0">
          <h4 className="font-display text-xl tracking-tightish md:text-2xl">
            {project.title}
          </h4>
          {project.summary && (
            <p className="font-sans mt-2 max-w-lg text-sm text-ink/65 md:text-base">
              {project.summary}
            </p>
          )}
          {project.stack && project.stack.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.stack.map((t) => (
                <li key={t} className="spec text-ink/50">
                  [{t}]
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="shrink-0 text-right">
          <p className="spec text-ink/40">{project.year}</p>
          {project.role && <p className="spec mt-1 text-ink/60">{project.role}</p>}
        </div>
      </div>
    </Link>
  );
}
