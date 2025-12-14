export type Project = {
  id: string
  name: string
  url: string
  description: string | null
  stars: number
  language: string | null
  source: "github" | "huggingface"
  subtype?: "repo" | "model" | "space"
  updatedAt: string | null
}
