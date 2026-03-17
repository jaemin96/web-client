import { streamText, tool, convertToModelMessages } from "ai"
import { groq } from "@ai-sdk/groq"
import { z } from "zod"

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = streamText({
    model: groq("llama-3.3-70b-versatile"),
    system: `You are an AI UI Customizer for this admin dashboard.

Step 1: When a user describes any mood, vibe, feeling, color, or style in any language, call the setThemeColors tool ONCE with appropriate oklch colors.
Step 2: After calling the tool, reply with a short friendly message describing what you changed. Do NOT call the tool again.

oklch format: oklch(lightness chroma hue)
- dark background: oklch(0.10~0.15 0.005~0.02 hue)
- light background: oklch(0.92~0.98 0.005~0.02 hue)
- primary accent: oklch(0.65~0.85 0.15~0.28 hue)
- foreground for dark bg: oklch(0.95 0 0)
- foreground for light bg: oklch(0.10 0 0)

Hue reference: 160=green, 230=blue, 30=orange, 300=purple, 80=yellow, 0=red

Reply in the same language the user used.`,
    messages: await convertToModelMessages(messages),
    maxSteps: 3,
    tools: {
      setThemeColors: tool({
        description: "Set the theme colors for the dashboard. Call this when the user wants to change colors or theme.",
        inputSchema: z.object({
          primary: z.string().nullable().describe("Primary brand color (e.g., #22c55e, oklch(0.7 0.18 160))"),
          secondary: z.string().nullable().describe("Secondary/muted color"),
          accent: z.string().nullable().describe("Accent color for highlights"),
          background: z.string().nullable().describe("Background color"),
          foreground: z.string().nullable().describe("Text/foreground color"),
          card: z.string().nullable().describe("Card background color"),
          border: z.string().nullable().describe("Border color"),
          description: z.string().describe("Brief description of the theme change"),
        }),
        execute: async (params) => ({ success: true, colors: params }),
      }),
    },
  })

  return result.toUIMessageStreamResponse()
}
