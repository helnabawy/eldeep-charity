import { HTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'gradient' | 'elevated';
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'relative overflow-hidden transition-all duration-500',
          {
            // Default - Clean white card
            'bg-white rounded-2xl shadow-elegant hover:shadow-elegant-lg':
              variant === 'default',
            
            // Glass - Glassmorphism effect
            'bg-white/70 backdrop-blur-xl border border-white/30 rounded-2xl shadow-lg':
              variant === 'glass',
            
            // Gradient - Green gradient background
            'bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl shadow-glow-md':
              variant === 'gradient',
            
            // Elevated - Higher shadow for emphasis
            'bg-white rounded-3xl shadow-elegant-lg hover:shadow-2xl hover:-translate-y-1':
              variant === 'elevated',
          },
          className
        )}
        {...props}
      >
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary-100/50 to-transparent rounded-bl-[100px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
