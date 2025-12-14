export type HuggingFaceItem = {
  id: string
  name: string
  url: string
  description: string | null
  likes: number
  pipeline_tag: string | null
  type: "model" | "space"
}

type HuggingFaceResponse = {
  modelId?: string
  id?: string
  cardData?: {
    summary?: string
    description?: string
    headline?: string
  }
  likes?: number
  pipeline_tag?: string
}[]

function buildHeaders(): HeadersInit {
  const headers: HeadersInit = { Accept: "application/json" }
  if (process.env.HUGGINGFACE_TOKEN) {
    headers.Authorization = `Bearer ${process.env.HUGGINGFACE_TOKEN}`
  }
  return headers
}

async function fetchHubItems(
  endpoint: "models" | "spaces",
  author: string,
  type: "model" | "space"
): Promise<HuggingFaceItem[]> {
  const res = await fetch(
    `https://huggingface.co/api/${endpoint}?author=${author}`,
    { headers: buildHeaders(), next: { revalidate: 3600 } }
  )

  if (!res.ok) {
    throw new Error(`Hugging Face error: ${res.status}`)
  }

  const data = (await res.json()) as HuggingFaceResponse

  return data.map((item) => {
    const name = type === "model" ? item.modelId ?? "" : item.id ?? ""
    const description =
      item.cardData?.description ??
      item.cardData?.summary ??
      item.cardData?.headline ??
      null

    const urlBase =
      type === "model"
        ? `https://huggingface.co/${name}`
        : `https://huggingface.co/spaces/${name}`

    return {
      id: `${type}:${name}`,
      name,
      url: urlBase,
      description,
      likes: item.likes ?? 0,
      pipeline_tag: item.pipeline_tag ?? null,
      type,
    }
  })
}

export async function fetchHuggingFaceItems(
  author: string
): Promise<HuggingFaceItem[]> {
  const [models, spaces] = await Promise.all([
    fetchHubItems("models", author, "model"),
    fetchHubItems("spaces", author, "space"),
  ])

  return [...models, ...spaces]
}
