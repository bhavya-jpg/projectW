'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { X, User, Building2, Briefcase, Mail, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
export interface ContactFormData {
  userName: string
  companyName: string
  companyEmail: string
  designation: string
}

interface ContactModalProps {
  /** Controls whether the modal is visible */
  open: boolean
  /** Called when the user closes the modal (X button or backdrop click) */
  onClose: () => void
  /** Called with the collected form data when the user submits */
  onSubmit?: (data: ContactFormData) => void
  /** Optional title override */
  title?: string
  /** Optional subtitle / description override */
  description?: string
}

/* ─────────────────────────────────────────────
   Field sub-component
───────────────────────────────────────────── */
interface FieldProps {
  id: string
  label: string
  placeholder: string
  icon: React.ReactNode
  value: string
  onChange: (v: string) => void
  error?: string
  autoFocus?: boolean
}

function Field({ id, label, placeholder, icon, value, onChange, error, autoFocus }: FieldProps) {
  const [focused, setFocused] = useState(false)

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-foreground/80 select-none">
        {label}
      </label>

      <div
        className={cn(
          'relative flex items-center rounded-xl border bg-background transition-all duration-200',
          focused
            ? 'border-ring shadow-[0_0_0_3px_color-mix(in_oklch,var(--ring)_20%,transparent)]'
            : error
            ? 'border-destructive'
            : 'border-input hover:border-ring/50',
        )}
      >
        {/* Leading icon */}
        <span
          className={cn(
            'absolute left-3.5 flex shrink-0 items-center text-muted-foreground transition-colors duration-200',
            focused && 'text-foreground/70',
          )}
        >
          {icon}
        </span>

        <input
          id={id}
          type="text"
          autoFocus={autoFocus}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="h-11 w-full rounded-xl bg-transparent pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none"
        />
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            key="error"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="text-xs text-destructive"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Main ContactModal
───────────────────────────────────────────── */
export function ContactModal({
  open,
  onClose,
  onSubmit,
  title = 'Tell us about yourself',
  description = "Fill in a few details so we know who we're speaking with.",
}: ContactModalProps) {
  const [form, setForm] = useState<ContactFormData>({
    userName: '',
    companyName: '',
    companyEmail: '',
    designation: '',
  })
  const [errors, setErrors] = useState<Partial<ContactFormData>>({})
  const [submitted, setSubmitted] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)

  /* Lock body scroll while open */
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [open])

  /* ESC key to close */
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  /* Reset state whenever modal re-opens */
  useEffect(() => {
    if (open) {
      setForm({ userName: '', companyName: '', companyEmail: '', designation: '' })
      setErrors({})
      setSubmitted(false)
    }
  }, [open])

  function validate(): boolean {
    const next: Partial<ContactFormData> = {}
    if (!form.userName.trim()) next.userName = 'Your name is required.'
    if (!form.companyName.trim()) next.companyName = 'Company name is required.'
    if (!form.companyEmail.trim()) {
      next.companyEmail = 'Company email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.companyEmail)) {
      next.companyEmail = 'Please enter a valid email address.'
    }
    if (!form.designation.trim()) next.designation = 'Designation is required.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setSubmitted(true)
    onSubmit?.(form)
  }

  function handleBackdrop(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === overlayRef.current) onClose()
  }

  /* ── Animation variants ── */
  const backdropVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.25 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  }

  const panelVariants: Variants = {
    hidden: { opacity: 0, y: 32, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
    exit: {
      opacity: 0,
      y: 20,
      scale: 0.97,
      transition: { duration: 0.22, ease: [0.4, 0, 1, 1] as [number, number, number, number] },
    },
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={overlayRef}
          key="contact-modal-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            backgroundColor: 'color-mix(in oklch, var(--foreground) 40%, transparent)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={handleBackdrop}
          aria-modal="true"
          role="dialog"
          aria-labelledby="contact-modal-title"
        >
          <motion.div
            key="contact-modal-panel"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card shadow-2xl font-sans"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── Decorative top-glow strip ── */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, color-mix(in oklch, var(--ring) 60%, transparent) 50%, transparent 100%)',
              }}
            />

            {/* ── Header ── */}
            <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-4">
              <div>
                <h2
                  id="contact-modal-title"
                  className="text-lg font-semibold tracking-tight text-foreground"
                >
                  {title}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">{description}</p>
              </div>

              <button
                id="contact-modal-close"
                onClick={onClose}
                aria-label="Close modal"
                className={cn(
                  'mt-0.5 flex shrink-0 items-center justify-center rounded-lg p-1.5 transition-colors',
                  'text-muted-foreground hover:bg-muted hover:text-foreground',
                )}
              >
                <X className="size-4" />
              </button>
            </div>

            {/* ── Divider ── */}
            <div className="mx-6 h-px bg-border" />

            {/* ── Body: success state or form ── */}
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center gap-4 px-6 py-10 text-center"
                >
                  {/* Animated checkmark */}
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="flex size-14 items-center justify-center rounded-full border-2 border-ring/40 bg-muted"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="size-6 text-foreground"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>

                  <div>
                    <p className="text-base font-semibold text-foreground">Details received!</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Thanks,{' '}
                      <span className="font-medium text-foreground">{form.userName}</span>. We've
                      noted your information.
                    </p>
                  </div>

                  <button
                    id="contact-modal-done"
                    onClick={onClose}
                    className="mt-2 inline-flex h-10 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    Done
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  id="contact-modal-form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  noValidate
                  className="flex flex-col gap-4 px-6 py-6"
                >
                  <Field
                    id="contact-user-name"
                    label="Your name"
                    placeholder="e.g. Jane Smith"
                    icon={<User className="size-4" />}
                    value={form.userName}
                    onChange={(v) => {
                      setForm((f) => ({ ...f, userName: v }))
                      setErrors((e) => ({ ...e, userName: undefined }))
                    }}
                    error={errors.userName}
                    autoFocus
                  />

                  <Field
                    id="contact-company-name"
                    label="Company name"
                    placeholder="e.g. Acme Inc."
                    icon={<Building2 className="size-4" />}
                    value={form.companyName}
                    onChange={(v) => {
                      setForm((f) => ({ ...f, companyName: v }))
                      setErrors((e) => ({ ...e, companyName: undefined }))
                    }}
                    error={errors.companyName}
                  />

                  <Field
                    id="contact-company-email"
                    label="Company email"
                    placeholder="e.g. hello@acme.com"
                    icon={<Mail className="size-4" />}
                    value={form.companyEmail}
                    onChange={(v) => {
                      setForm((f) => ({ ...f, companyEmail: v }))
                      setErrors((e) => ({ ...e, companyEmail: undefined }))
                    }}
                    error={errors.companyEmail}
                  />

                  <Field
                    id="contact-designation"
                    label="Designation"
                    placeholder="e.g. Head of Product"
                    icon={<Briefcase className="size-4" />}
                    value={form.designation}
                    onChange={(v) => {
                      setForm((f) => ({ ...f, designation: v }))
                      setErrors((e) => ({ ...e, designation: undefined }))
                    }}
                    error={errors.designation}
                  />

                  {/* ── Actions ── */}
                  <div className="mt-2 flex items-center justify-end gap-3">
                    <button
                      id="contact-modal-cancel"
                      type="button"
                      onClick={onClose}
                      className="inline-flex h-10 items-center rounded-xl px-4 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      Cancel
                    </button>

                    <button
                      id="contact-modal-submit"
                      type="submit"
                      className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 active:scale-[0.98]"
                    >
                      Submit
                      <ChevronRight className="size-3.5" />
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
