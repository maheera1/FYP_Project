// Chatbot integration service
export interface ChatbotResponse {
  message: string
  intent?: string
  confidence?: number
}

export class RasaChatbot {
  private baseUrl: string

  constructor(baseUrl: string = process.env.RASA_SERVER_URL || "http://localhost:5005") {
    this.baseUrl = baseUrl
  }

  async sendMessage(message: string, sender = "user"): Promise<ChatbotResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/webhooks/rest/webhook`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender,
          message,
        }),
      })

      if (!response.ok) {
        throw new Error(`Rasa server error: ${response.status}`)
      }

      const data = await response.json()

      if (data && data.length > 0) {
        return {
          message: data[0].text || "Sorry, I didn't understand that.",
          intent: data[0].intent,
          confidence: data[0].confidence,
        }
      }

      return {
        message: "Sorry, I didn't understand that.",
      }
    } catch (error) {
      console.error("Rasa chatbot error:", error)
      return {
        message: "Sorry, I'm having trouble connecting right now. Please try again later.",
      }
    }
  }
}

export class DialogflowChatbot {
  private projectId: string
  private sessionId: string

  constructor(projectId: string = process.env.DIALOGFLOW_PROJECT_ID || "", sessionId = "default-session") {
    this.projectId = projectId
    this.sessionId = sessionId
  }

  async sendMessage(message: string): Promise<ChatbotResponse> {
    try {
      // For Dialogflow, you would typically use the @google-cloud/dialogflow library
      // This is a simplified version using REST API
      const response = await fetch(
        `https://dialogflow.googleapis.com/v2/projects/${this.projectId}/agent/sessions/${this.sessionId}:detectIntent`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.DIALOGFLOW_ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            queryInput: {
              text: {
                text: message,
                languageCode: "en-US",
              },
            },
          }),
        },
      )

      if (!response.ok) {
        throw new Error(`Dialogflow error: ${response.status}`)
      }

      const data = await response.json()

      return {
        message: data.queryResult?.fulfillmentText || "Sorry, I didn't understand that.",
        intent: data.queryResult?.intent?.displayName,
        confidence: data.queryResult?.intentDetectionConfidence,
      }
    } catch (error) {
      console.error("Dialogflow chatbot error:", error)
      return {
        message: "Sorry, I'm having trouble connecting right now. Please try again later.",
      }
    }
  }
}

// Factory function to get the appropriate chatbot
export function getChatbot(): RasaChatbot | DialogflowChatbot {
  const chatbotType = process.env.CHATBOT_TYPE || "rasa"

  if (chatbotType === "dialogflow") {
    return new DialogflowChatbot()
  }

  return new RasaChatbot()
}
