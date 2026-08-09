export function Modal({ isOpen, onClose, title, children }) {
    if (!isOpen) return null;

    return (
        <div
            style={{
                position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50,
            }}
            onClick={onClose}
        >
            <div
                style={{ backgroundColor: 'white', borderRadius: 8, padding: '1.5rem', minWidth: 400, maxWidth: 600 }}
                onClick={(e) => e.stopPropagation()} // evita que clickear dentro cierre el modal
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <h2>{title}</h2>
                    <button onClick={onClose}>✕</button>
                </div>
                {children}
            </div>
        </div>
    );
}