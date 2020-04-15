import type { ProjectId } from '../content'
import { Icon } from './Icon'

export function ProjectVisual({ id }: { id: ProjectId }) {
  if (id === 'wisu') return (
    <div className="project-visual visual-wisu" aria-hidden="true">
      <span className="art-caption">LESS NOISE. MORE STRUCTURE.</span>
      <div className="tree-window">
        <div className="window-top"><span className="window-dots"><i /><i /><i /></span><span>wisu — explore</span><Icon name="terminal" width="13" height="13" /></div>
        <div className="tree-command"><span>❯</span> wisu -i -g</div>
        <div className="tree-lines"><div><span>▾</span> <b>my-project/</b></div><div><em>├──</em> <span>▾</span> <b>src/</b></div><div className="tree-selected"><em>│   ├──</em> <span>◇</span> main.rs <small>←</small></div><div><em>│   └──</em> <span>◇</span> lib.rs</div><div><em>├──</em> <span>◇</span> Cargo.toml</div><div><em>└──</em> <span>◇</span> README.md</div></div>
        <div className="tree-bottom"><span>↑↓ navigate</span><span>enter explore</span><span>q quit</span></div>
      </div>
      <span className="art-small-label">BUILT IN RUST <span>↗</span></span>
    </div>
  )
  if (id === 'reql') return (
    <div className="project-visual visual-reql" aria-hidden="true">
      <span className="art-caption">CODE BECOMES CONTEXT.</span>
      <svg viewBox="0 0 500 260" fill="none" className="graph-art"><g stroke="currentColor" strokeOpacity=".3"><path d="m85 90 155 37m-107 95 107-95m151-50-151 50m160 75-160-75M240 127l20-91m-20 91 34 105" /><path d="m85 90 48 132m258-145 9 125m-140-166 131 41" strokeDasharray="4 5" /></g><g className="graph-small-node"><rect x="48" y="71" width="84" height="35" rx="6" /><rect x="94" y="201" width="78" height="35" rx="6" /><rect x="345" y="59" width="94" height="35" rx="6" /><rect x="356" y="184" width="91" height="35" rx="6" /><rect x="224" y="19" width="71" height="32" rx="6" /></g><g className="graph-node-text"><text x="90" y="93">source.py</text><text x="133" y="223">symbols</text><text x="392" y="81">agent</text><text x="401" y="206">memory</text><text x="260" y="40">tests</text></g><circle cx="240" cy="127" r="50" fill="currentColor" fillOpacity=".04" stroke="currentColor" strokeOpacity=".15" /><rect x="200" y="91" width="80" height="72" rx="16" className="graph-core" /><text x="240" y="137" className="graph-core-label">reql</text><g fill="currentColor"><circle cx="165" cy="109" r="3" /><circle cx="316" cy="102" r="3" /><circle cx="258" cy="182" r="3" /><circle cx="194" cy="166" r="3" /></g></svg>
      <span className="art-small-label">LOCAL. CONNECTED. SOURCE-BACKED. <span>↗</span></span>
    </div>
  )
  if (id === 'crossync') return (
    <div className="project-visual visual-crossync compact-art" aria-hidden="true"><div className="concurrency-art"><div className="thread-row"><span>thread_01</span><i /><i /><i /><b /></div><div className="thread-row"><span>thread_02</span><i /><b /><i /><i /></div><div className="thread-row"><span>thread_03</span><b /><i /><i /><i /></div><div className="thread-axis">SHARED STATE <span>→</span> IN SYNC</div></div><span className="compact-art-index">01 / CONCURRENCY</span></div>
  )
  if (id === 'castbox') return (
    <div className="project-visual visual-castbox compact-art" aria-hidden="true"><div className="pointer-art"><span className="pointer-label">Arw&lt;T&gt;</span><span className="pointer-line" /><div className="pointer-core"><Icon name="layers" width="38" height="38" /><span>shared</span></div><span className="pointer-line" /><span className="pointer-label">AnyRef</span></div><span className="compact-art-index">02 / OWNERSHIP</span></div>
  )
  if (id === 'wp-optimizer') return (
    <div className="project-visual visual-optimizer compact-art" aria-hidden="true"><div className="optimizer-art"><div className="optimizer-ring"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" /><path d="M50 10a40 40 0 1 1-38 52" /></svg><Icon name="spark" width="28" height="28" /></div><div className="optimizer-labels"><span><i /> cache</span><span><i /> optimize</span><span><i /> maintain</span></div></div><span className="compact-art-index">03 / PERFORMANCE</span></div>
  )
  return (
    <div className="project-visual visual-uploader compact-art" aria-hidden="true"><div className="upload-art"><div className="upload-file"><span>JPG</span><i /><b><Icon name="check" width="13" height="13" /></b></div><div className="upload-file"><span>PDF</span><i /><b><Icon name="check" width="13" height="13" /></b></div><div className="upload-file"><span>PNG</span><i /><b><Icon name="check" width="13" height="13" /></b></div></div><span className="compact-art-index">04 / FILE WORKFLOWS</span></div>
  )
}
