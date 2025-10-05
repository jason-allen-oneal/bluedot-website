import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getLanguageColor(language: string | null): string {
    if (!language) return 'bg-gray-500';
    
    const colors: { [key: string]: string } = {
        'TypeScript': 'bg-blue-500',
        'JavaScript': 'bg-yellow-500',
        'Python': 'bg-green-500',
        'Java': 'bg-red-500',
        'PHP': 'bg-purple-500',
        'Go': 'bg-cyan-500',
        'Rust': 'bg-orange-500',
        'C++': 'bg-pink-500',
        'C#': 'bg-indigo-500',
        'Ruby': 'bg-red-600',
        'Swift': 'bg-orange-400',
        'Kotlin': 'bg-purple-600',
        'Dart': 'bg-blue-400',
        'HTML': 'bg-orange-600',
        'CSS': 'bg-blue-600',
        'Shell': 'bg-gray-600',
        'Dockerfile': 'bg-blue-700',
        'Vue': 'bg-green-400',
        'React': 'bg-cyan-400',
        'Svelte': 'bg-orange-500',
    };
    
    return colors[language] || 'bg-gray-500';
}