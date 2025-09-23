interface BlueDotProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  animated?: boolean;
}

export default function BlueDot({ size = 'md', className = '', animated = false }: BlueDotProps) {
  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3', 
    lg: 'w-4 h-4'
  };

  return (
    <div 
      className={`${sizeClasses[size]} rounded-full shadow-md ${animated ? 'animate-pulse' : ''} ${className}`}
      style={{backgroundColor: 'var(--primary)'}}
    />
  );
}
