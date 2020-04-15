import { useEffect, useRef, useState } from 'react'
import { profile } from '../content'
import { Icon } from './Icon'

// Present the contact options and announce the result of copying the email address.
export function Contact() {
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle')
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  useEffect(() => () => clearTimeout(timer.current), [])

  async function copyEmail() {
    clearTimeout(timer.current)
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopyState('copied')
    } catch { setCopyState('failed') }
    timer.current = setTimeout(() => setCopyState('idle'), 4000)
  }

  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="contact-panel container reveal">
        <div className="contact-topline">
          <p className="eyebrow">SAY HELLO</p>
          <Icon name="spark" width="26" height="26" />
        </div>
        <div className="contact-main">
          <h2 id="contact-title">Good things start<br />with a <span>conversation.</span></h2>
          <div className="contact-invitation">
            <p>Have an interesting idea, a question, or something to build? I’m always open to a thoughtful exchange.</p>
            <a className="contact-cta" href={`mailto:${profile.email}`} aria-label={`Let’s talk — email ${profile.name}`}>
              Let’s talk<Icon name="arrow-up-right" width="20" height="20" />
            </a>
          </div>
        </div>
        <div className="contact-bottom">
          <div className="contact-email">
            <p className="contact-label">EMAIL ME DIRECTLY</p>
            <div className="email-contact">
              <a href={`mailto:${profile.email}`}>{profile.email}<Icon name="arrow-up-right" width="18" height="18" /></a>
              <button className="icon-button copy-email js-only" type="button" onClick={copyEmail} aria-label={copyState === 'copied' ? 'Email address copied' : 'Copy email address'} title="Copy email address">
                <Icon name={copyState === 'copied' ? 'check' : 'copy'} width="16" height="16" />
              </button>
            </div>
            <span className="copy-status" role="status">{copyState === 'copied' ? 'Copied!' : copyState === 'failed' ? 'Please select and copy the address.' : ''}</span>
          </div>
          <div>
            <p className="contact-label">ELSEWHERE</p>
            <div className="social-links">
              <a href={profile.github} target="_blank" rel="noreferrer">GitHub<Icon name="arrow-up-right" width="15" height="15" /></a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn<Icon name="arrow-up-right" width="15" height="15" /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
