import type { ReactNode } from 'react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
    size?: 'md' | 'lg';
}

const ANCHO: Record<'md' | 'lg', string> = {
    md: 'max-w-lg',
    lg: 'max-w-3xl',
};


export function Modal({ isOpen, onClose, title, children, size = 'md' }: Props) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-slate-900/40 flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div
                className={`bg-white rounded-lg border border-slate-200 shadow-sm w-full ${ANCHO[size]} max-h-[90vh] overflow-y-auto`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
                    <h2 className="text-base font-semibold text-slate-800">{title}</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-lg leading-none">✕</button>
                </div>
                <div className="p-6">{children}</div>
            </div>
        </div>
    );
}