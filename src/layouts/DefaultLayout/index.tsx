function DefaultLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-background text-text-main flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary-600/20 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/20 blur-[120px] pointer-events-none" />
            <div className="w-full max-w-md relative z-10 w-[400px]">
                {children}
            </div>
        </div>
    )
}

export default DefaultLayout;