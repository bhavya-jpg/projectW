'use client'

import { useState } from 'react'
import { ContactModal } from '@/components/ui/contact-modal'
import type { ContactFormData } from '@/components/ui/contact-modal'

export default function ModalPreviewPage() {
  const [open, setOpen] = useState(false)
  const [lastData, setLastData] = useState<ContactFormData | null>(null)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-4">
      <div className="text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">ContactModal preview</h1>
        <p className="mt-1 text-sm text-muted-foreground">Click the button below to open the modal.</p>
      </div>

      <button
        onClick={() => setOpen(true)}
        className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
      >
        Open modal
      </button>

      {lastData && (
        <div className="mt-4 w-full max-w-sm rounded-xl border border-border bg-card p-4 text-sm">
          <p className="mb-2 font-semibold text-foreground">Last submitted data:</p>
          <pre className="overflow-x-auto text-xs text-muted-foreground">
            {JSON.stringify(lastData, null, 2)}
          </pre>
        </div>
      )}

      <ContactModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={(data) => {
          setLastData(data)
        }}
      />
    </main>
  )
}
