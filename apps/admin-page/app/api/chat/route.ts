import { streamText, tool, convertToModelMessages } from "ai"
import { z } from "zod"

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = streamText({
    model: "openai/gpt-4o-mini",
    system: `You are an AI assistant for an admin dashboard. You help users customize the dashboard theme and answer questions about the dashboard features.

When users ask to change colors or theme, use the setThemeColors tool with appropriate color values.

Color guidelines:
- Use valid CSS color values (hex, rgb, oklch, hsl)
- Primary colors should be vibrant but professional
- Suggest harmonious color combinations
- Dark mode backgrounds should be dark (oklch with low lightness)
- Light mode backgrounds should be light (oklch with high lightness)

You can help users with:
1. Changing the dashboard theme colors
2. Explaining dashboard features
3. Providing tips for using the dashboard
4. Answering general questions

Be helpful, concise, and friendly. When suggesting colors, explain your choices briefly.`,
    messages: await convertToModelMessages(messages),
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
        execute: async (params) => {
          // This will be handled client-side via tool call
          return {
            success: true,
            message: `Theme updated: ${params.description}`,
            colors: params,
          }
        },
      }),
    },
  })

  return result.toUIMessageStreamResponse()
}
