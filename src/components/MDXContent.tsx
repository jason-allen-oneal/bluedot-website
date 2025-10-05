'use client';

import { useEffect, useState } from 'react';
import { MDXRemote } from 'next-mdx-remote';
import { mdxComponents } from './mdx';

interface MDXContentProps {
    source: any;
}

export default function MDXContent({ source }: MDXContentProps) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return <div>Loading...</div>;
    }

    return <MDXRemote {...source} components={mdxComponents} />;
}
