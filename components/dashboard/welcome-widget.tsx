import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { ColoredText } from "@/components/ui/colored-text"
import { getCurrentUser } from "@/lib/auth"
import { getSettings, updateSettings } from "@/models/settings"
import { Banknote, ChartBarStacked, FolderOpenDot, Key, TextCursorInput, X } from "lucide-react"
import { revalidatePath } from "next/cache"
import Image from "next/image"
import Link from "next/link"

export async function WelcomeWidget() {
  const user = await getCurrentUser()
  const settings = await getSettings(user.id)

  return (
    <Card className="flex flex-col lg:flex-row items-start gap-10 p-10 w-full">
      <Image src="/logo/axe.svg" alt="Logo" width={256} height={256} className="w-64 h-64" />
      <div className="flex flex-col">
        <CardTitle className="flex items-center justify-between">
          <span className="text-2xl font-bold">
            <ColoredText>¡Hola! Soy Tax Axe 👋</ColoredText>
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={async () => {
              "use server"
              await updateSettings(user.id, "is_welcome_message_hidden", "true")
              revalidatePath("/")
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </CardTitle>
        <CardDescription className="mt-5">
          <p className="mb-3">
            Soy tu asistente contable para procesar tickets, comprobantes y facturas con IA. Esto es lo que puedo hacer:
          </p>
          <ul className="mb-5 list-disc pl-5 space-y-1">
            <li>
              <strong>Sube una foto o PDF</strong> y reconoceré, categorizaré y guardaré la transacción automáticamente.
            </li>
            <li>
              Puedo <strong>convertir monedas automáticamente</strong> y usar el tipo de cambio histórico por fecha.
            </li>
            <li>
              También <strong>soporto cripto.</strong> Incluye tipos de cambio históricos.
            </li>
            <li>
              Todos los <strong>prompts LLM son configurables</strong>: campos, categorías y proyectos.
            </li>
            <li>
              Guardo datos en una <strong>base local SQLite</strong> y puedo exportar a CSV o ZIP.
            </li>
            <li>
              Puedes <strong>crear campos personalizados</strong> y se incluirán en las exportaciones CSV.
            </li>
            <li>
              Soy un proyecto en evolución y puedo cometer errores. Úsame con criterio profesional.
            </li>
          </ul>
          <p className="mb-3">
            Aunque te ahorro mucho tiempo, te recomiendo revisar los resultados con tu asesor/a fiscal antes de declarar.
          </p>
        </CardDescription>
        <div className="mt-2">
          <Link href="https://github.com/vas3k/TaxHacker" className="text-blue-500 hover:underline">
            Código fuente
          </Link>
          <span className="mx-2">|</span>
          <Link href="https://github.com/vas3k/TaxHacker/issues" className="text-blue-500 hover:underline">
            Solicitar función
          </Link>
          <span className="mx-2">|</span>
          <Link href="https://github.com/vas3k/TaxHacker/issues" className="text-blue-500 hover:underline">
            Reportar bug
          </Link>
          <span className="mx-2">|</span>
          <Link href="mailto:me@vas3k.ru" className="text-blue-500 hover:underline">
            Contactar autor
          </Link>
        </div>
        <div className="flex flex-wrap gap-2 mt-8">
          {settings.openai_api_key === "" && (
            <Link href="/settings/llm">
              <Button>
                <Key className="h-4 w-4" />
                Añade tu API key de ChatGPT
              </Button>
            </Link>
          )}
          <Link href="/settings">
            <Button variant="outline">
              <Banknote className="h-4 w-4" />
              Moneda base: {settings.default_currency}
            </Button>
          </Link>
          <Link href="/settings/categories">
            <Button variant="outline">
              <ChartBarStacked className="h-4 w-4" />
              Categorías
            </Button>
          </Link>
          <Link href="/settings/projects">
            <Button variant="outline">
              <FolderOpenDot className="h-4 w-4" />
              Proyectos
            </Button>
          </Link>
          <Link href="/settings/fields">
            <Button variant="outline">
              <TextCursorInput className="h-4 w-4" />
              Campos personalizados
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  )
}
