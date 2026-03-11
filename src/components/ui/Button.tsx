import { ButtonHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost' | 'gold';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          'relative inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden',
          {
            // Primary - Green gradient
            'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 focus:ring-primary-500 shadow-glow-sm hover:shadow-glow-md hover:scale-[1.02]':
              variant === 'primary',
            
            // Secondary - Gold gradient
            'bg-gradient-to-r from-secondary-400 to-secondary-500 text-primary-900 hover:from-secondary-500 hover:to-secondary-600 focus:ring-secondary-400 shadow-gold-glow-sm hover:shadow-gold-glow-md hover:scale-[1.02]':
              variant === 'secondary',
            
            // Outline - Green border
            'border-2 border-primary-500 text-primary-600 hover:bg-primary-50 focus:ring-primary-500 hover:border-primary-600':
              variant === 'outline',
            
            // Danger - Red gradient
            'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 focus:ring-red-500 shadow-lg hover:shadow-xl hover:scale-[1.02]':
              variant === 'danger',
            
            // Ghost - Transparent
            'text-gray-600 hover:bg-gray-100 focus:ring-gray-400 hover:text-gray-800':
              variant === 'ghost',
            
            // Gold - Special gold variant
            'bg-gradient-to-r from-secondary-300 via-secondary-400 to-secondary-300 text-primary-900 focus:ring-secondary-400 shadow-gold-glow-md hover:shadow-gold-glow-lg hover:scale-[1.02]':
              variant === 'gold',
          },
          {
            'px-4 py-2 text-sm rounded-xl': size === 'sm',
            'px-6 py-2.5 text-base rounded-xl': size === 'md',
            'px-8 py-3.5 text-lg rounded-2xl': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {/* Shimmer effect for primary and secondary */}
        {(variant === 'primary' || variant === 'secondary' || variant === 'gold') && (
          <span className="absolute inset-0 overflow-hidden rounded-inherit">
            <span className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full" />
          </span>
        )}
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
