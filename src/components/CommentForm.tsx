'use client'
import { useState } from 'react'


export default function CommentForm({ postId }: { postId: number }){
const [body, setBody] = useState('')
const [ok, setOk] = useState<string | null>(null)
async function submit(e: React.FormEvent){
e.preventDefault()
const res = await fetch('/api/comments', { method: 'POST', body: JSON.stringify({ postId, body }) })
setOk(res.ok ? 'Sent!' : 'Failed')
if (res.ok) setBody('')
}
return (
<form onSubmit={submit} className="space-y-3">
<textarea value={body} onChange={e=>setBody(e.target.value)} placeholder="Write a comment…" className="w-full rounded border border-white/20 bg-transparent p-3" rows={4}/>
<button className="rounded-xl border border-white/30 px-4 py-2">Comment</button>
{ok && <div className="text-sm opacity-70">{ok}</div>}
</form>
)
}