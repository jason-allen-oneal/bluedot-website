'use client';

import { useEffect, useState } from 'react';
import { MDXRemote } from 'next-mdx-remote';
import { mdxComponents } from './mdx';

interface MDXContentProps {
    source: any;
}

export default function MDXContent({ source }: MDXContentProps) {
    // Only render on client
    if (typeof window === 'undefined') {
        return <div>Loading...</div>;
    }

    return <MDXRemote {...source} components={mdxComponents} />;
}
