'use client';

import { MDXRemoteCompat } from '@/lib/MDXRemoteCompat';
import { mdxComponents } from './mdx';

interface MDXContentProps {
    source: any;
}

export default function MDXContent({ source }: MDXContentProps) {
    return <MDXRemoteCompat {...source} components={mdxComponents} />;
}
