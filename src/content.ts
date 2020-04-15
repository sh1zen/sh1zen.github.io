export const profile = {
  name: 'Andrea Frolli',
  location: 'Turin, Italy',
  email: 'dev.sh1zen@outlook.it',
  github: 'https://github.com/sh1zen',
  linkedin: 'https://www.linkedin.com/in/andrea-frolli/',
}

export const filters = ['All projects', 'Rust', 'Developer tools', 'WordPress'] as const
export type Filter = typeof filters[number]
export type ProjectId = 'wisu' | 'reql' | 'crossync' | 'castbox' | 'wp-optimizer' | 'gf-multi-uploader'
export type Project = {
  id: ProjectId
  name: string
  category: string
  description: string
  tags: string[]
  filters: Filter[]
  resource: { label: string; url: string }
}

export const projects: Project[] = [
  {
    id: 'wisu',
    name: 'wisu',
    category: 'A clearer view of your filesystem',
    description: 'A fast, minimal directory tree viewer built in Rust. Explore interactively, watch files change, and filter out the noise.',
    tags: ['Rust', 'CLI / TUI', 'Filesystem'],
    filters: ['Rust', 'Developer tools'],
    resource: { label: 'View crate', url: 'https://crates.io/crates/wisu' },
  },
  {
    id: 'reql',
    name: 'reql',
    category: 'Repository context for coding agents',
    description: 'A local, graph-based context engine. Connect code, dependencies, and working memory to give coding agents compact, source-backed answers.',
    tags: ['Python', 'Knowledge graphs', 'MCP'],
    filters: ['Developer tools'],
    resource: { label: 'Read documentation', url: 'https://github.com/sh1zen/reql#readme' },
  },
  {
    id: 'crossync',
    name: 'crossync',
    category: 'Shared state. Coordinated.',
    description: 'Concurrent data structures and synchronization primitives for Rust, combining atomics, backoff strategies, and internal locks.',
    tags: ['Rust', 'Concurrency', 'Data structures'],
    filters: ['Rust', 'Developer tools'],
    resource: { label: 'View crate', url: 'https://crates.io/crates/crossync' },
  },
  {
    id: 'castbox',
    name: 'castbox',
    category: 'Shared ownership, runtime flexibility',
    description: 'Reference-counted smart pointers for Rust, with synchronized access, interior mutability, and checked runtime downcasting.',
    tags: ['Rust', 'Smart pointers', 'Memory'],
    filters: ['Rust', 'Developer tools'],
    resource: { label: 'View crate', url: 'https://crates.io/crates/castbox' },
  },
  {
    id: 'wp-optimizer',
    name: 'WP Optimizer',
    category: 'A faster, leaner WordPress',
    description: 'A modular toolkit for WordPress performance and maintenance, bringing together caching, media optimization, database tools, and diagnostics.',
    tags: ['PHP', 'WordPress', 'Performance'],
    filters: ['WordPress'],
    resource: { label: 'WordPress plugin', url: 'https://wordpress.org/plugins/wp-optimizer/' },
  },
  {
    id: 'gf-multi-uploader',
    name: 'GF Multi Uploader',
    category: 'More capable file uploads',
    description: 'Multiple file uploading and editing for Gravity Forms, extending the default uploader with advanced options and chunked uploads.',
    tags: ['JavaScript', 'PHP', 'Gravity Forms'],
    filters: ['WordPress'],
    resource: { label: 'WordPress plugin', url: 'https://wordpress.org/plugins/gf-multi-uploader/' },
  },
]

export const expertise = [
  { number: '01', title: 'Systems & performance', detail: 'Close to the machine. Focused on the details.', skills: ['Rust', 'C / C++', 'Concurrency', 'Memory management'] },
  { number: '02', title: 'Software & the web', detail: 'Useful tools, from architecture to interface.', skills: ['PHP', 'JavaScript', 'React', 'WordPress', 'SQL'] },
  { number: '03', title: 'Machine learning & AI', detail: 'A space for curiosity and continued learning.', skills: ['Python', 'PyTorch', 'NumPy', 'Pandas', 'Agent tooling'] },
  { number: '04', title: 'Tools & workflow', detail: 'Small improvements. Better ways to build.', skills: ['Git', 'Docker', 'Linux', 'Bash', 'Automation'] },
]
