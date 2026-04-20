import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { ColoredText } from "@/components/ui/colored-text"
import config from "@/lib/config"
import { PROVIDERS } from "@/lib/llm-providers"
import { getSelfHostedUser } from "@/models/users"
import { ShieldAlert } from "lucide-react"
import Image from "next/image"
import { redirect } from "next/navigation"
import SelfHostedSetupFormClient from "./setup-form-client"

export default async function SelfHostedWelcomePage() {
  if (!config.selfHosted.isEnabled) {
    return (
      <Card className="w-full max-w-xl mx-auto p-8 flex flex-col items-center justify-center gap-6">
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <ShieldAlert className="w-6 h-6" />
          <span>El modo self-hosted no está habilitado</span>
        </CardTitle>
        <CardDescription className="text-center text-lg flex flex-col gap-2">
          <p>
            Para usar Tax Axe en modo self-hosted, configura{" "}
            <code className="font-bold">SELF_HOSTED_MODE=true</code> en tu entorno.
          </p>
          <p>En self-hosted puedes usar tu propia API key de ChatGPT y guardar los datos en tu servidor.</p>
        </CardDescription>
      </Card>
    )
  }

  const user = await getSelfHostedUser()
  if (user) {
    redirect(config.selfHosted.redirectUrl)
  }

  const defaultProvider = PROVIDERS[0].key
  const defaultApiKeys: Record<string, string> = {
    openai: config.ai.openaiApiKey ?? "",
    google: config.ai.googleApiKey ?? "",
    mistral: config.ai.mistralApiKey ?? "",
  }

  return (
    <Card className="w-full max-w-3xl mx-auto p-6 sm:p-10 flex flex-col gap-8 border-pink-100 shadow-xl">
      <div className="flex flex-col items-center text-center gap-3">
        <Image src="/logo/axe.svg" alt="Tax Axe logo" width={112} height={112} className="w-24 h-24 sm:w-28 sm:h-28" />
        <CardTitle className="text-3xl font-bold">
          <ColoredText>Tax Axe · Setup Self-Hosted</ColoredText>
        </CardTitle>
        <CardDescription className="text-base sm:text-lg max-w-2xl">
          Bienvenido. Esta pantalla te ayuda a dejar lista tu instancia en menos de 5 minutos.
        </CardDescription>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { step: "1", title: "Proveedor LLM", text: "Elige OpenAI, Google o Mistral para el análisis de documentos." },
          { step: "2", title: "API Key", text: "Pega tu clave para habilitar extracción de datos y OCR con IA." },
          { step: "3", title: "Guardar", text: "Confirma y entra al dashboard para empezar a subir comprobantes." },
        ].map((item) => (
          <div key={item.step} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
            <p className="text-xs font-semibold text-slate-500 mb-1">Paso {item.step}</p>
            <p className="font-semibold text-slate-900">{item.title}</p>
            <p className="text-sm text-slate-600 mt-1">{item.text}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-pink-100 bg-white p-4 sm:p-6">
        <SelfHostedSetupFormClient defaultProvider={defaultProvider} defaultApiKeys={defaultApiKeys} />
      </div>
    </Card>
  )
}

export const dynamic = "force-dynamic"
