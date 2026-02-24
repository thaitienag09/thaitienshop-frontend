import { Zap } from 'lucide-react';

interface LogoProps {
    className?: string;
    iconSize?: number;
    showText?: boolean;
    variant?: 'light' | 'dark';
}

export default function Logo({ className = '', iconSize = 24, showText = true, variant = 'dark' }: LogoProps) {
    const isDark = variant === 'dark';

    return (
        <div className={`flex items-center space-x-3 group ${className}`}>
            <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-tr from-violet-600 to-blue-500 flex items-center justify-center rounded-xl shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <Zap size={iconSize} className="text-white fill-current animate-pulse" />
                </div>
                {/* Decorative ring */}
                <div className="absolute -inset-1 border-2 border-violet-500/20 rounded-2xl group-hover:scale-110 transition-transform duration-500 blur-sm"></div>
            </div>

            {showText && (
                <div className="flex flex-col -space-y-1">
                    <span className={`text-xl font-black tracking-tighter ${isDark ? 'text-slate-900' : 'text-white'}`}>
                        Tiến<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-blue-500">Code</span>
                    </span>
                    <span className={`text-[9px] uppercase tracking-[0.3em] font-black ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        Premium Solutions
                    </span>
                </div>
            )}
        </div>
    );
}
