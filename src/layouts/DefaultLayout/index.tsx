function DefaultLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-background text-text-main flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden">
            <div className="relative z-10 min-w-[600px]">
                {children}
            </div>
        </div>
    )
}

export default DefaultLayout;