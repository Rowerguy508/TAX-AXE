"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import * as Sentry from "@sentry/nextjs"
import { ShieldAlert } from "lucide-react"
import { useEffect } from "react"

export default function AuthRouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <Card className="w-full max-w-xl mx-auto p-8 flex flex-col items-center justify-center gap-4">
      <CardTitle className="text-2xl font-bold flex items-center gap-2">
        <ShieldAlert className="w-6 h-6" />
        <span>No pudimos cargar esta pantalla</span>
      </CardTitle>
      <CardContent className="w-full flex flex-col gap-3">
        <CardDescription className="text-center">
          Revisa en Vercel que <code className="font-bold">DATABASE_URL</code> apunte a una base
          accesible y que las migraciones de Prisma se hayan aplicado.
        </CardDescription>
        {error.digest && (
          <CardDescription className="text-center text-xs text-muted-foreground">
            Digest: <code>{error.digest}</code>
          </CardDescription>
        )}
        <div className="flex justify-center pt-2">
          <Button onClick={reset}>Reintentar</Button>
        </div>
      </CardContent>
    </Card>
  )
}
