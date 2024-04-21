export type ChatMessageType = {
    role: "user" | "system" | "error",
    message_id: string,
    message: string,
    timestamp: string,
}