import { useState } from 'react'
import { filters, profile, projects } from '../content'
import type { Filter, Project } from '../content'
import { Icon } from './Icon'
import { ProjectVisual } from './ProjectVisual'

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const repoUrl = `${profile.github}/${project.id}`
  return (
    <article className="project-card">
      <div className="project-art"><ProjectVisual id={project.id} /></div>
      <div className="project-info">
        <div className="project-title-row"><h3><a href={repoUrl} target="_blank" rel="noreferrer">{project.name}<Icon name="arrow-up-right" /></a></h3><span className="project-index">{String(index + 1).padStart(2, '0')}</span></div>
        <p className="project-category">{project.category}</p>
        <p className="project-description">{project.description}</p>
        <ul className="tag-list" aria-label={`${project.name} technologies`}>{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
        <div className="project-links"><a href={repoUrl} target="_blank" rel="noreferrer"><Icon name="github" width="15" height="15" /> Source code<span className="sr-only"> for {project.name}</span></a><a href={project.resource.url} target="_blank" rel="noreferrer">{project.resource.label}<span className="sr-only"> for {project.name}</span><Icon name="arrow-up-right" width="13" height="13" /></a></div>
      </div>
    </article>
  )
}

export function Projects() {
  const [filter, setFilter] = useState<Filter>('All projects')
  const visible = projects.filter((project) => filter === 'All projects' || project.filters.includes(filter))

  return (
    <section className="section container" id="projects" aria-labelledby="projects-title">
      <div className="section-heading reveal"><div><p className="eyebrow">SELECTED WORK</p><h2 id="projects-title">Built to be <span className="text-soft">useful.</span></h2></div><p className="section-intro">An exploration of systems, tools, and the web.<br />Open source, from the first commit.</p></div>
      <div className="projects-toolbar"><div className="project-filters js-only" role="group" aria-label="Filter projects">{filters.map((item) => <button type="button" key={item} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}{item === 'All projects' && <span>{projects.length.toString().padStart(2, '0')}</span>}</button>)}</div><span className="project-collection-label">A FEW THINGS I’VE PUT INTO THE WORLD <Icon name="arrow" width="15" height="15" /></span></div>
      <p className="sr-only" role="status" aria-live="polite">Showing {visible.length} {filter === 'All projects' ? '' : `${filter} `}projects.</p>
      <div className="projects-grid">{visible.map((project) => <ProjectCard key={project.id} project={project} index={projects.indexOf(project)} />)}</div>
      <div className="all-projects"><span>There’s more in the repository.</span><a className="text-link" href={`${profile.github}?tab=repositories`} target="_blank" rel="noreferrer">Explore all projects<Icon name="arrow-up-right" width="16" height="16" /></a></div>
    </section>
  )
}
