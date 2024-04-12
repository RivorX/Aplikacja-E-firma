export default function guest_panel() {
    return (
    <>
    <header className="items-top bg-gray-200 top-0 w-full ">
        <nav className="w-full flex flex-1 justify-end items-center">
            {auth.user ? (
                <Link
                    href={route('dashboard')}
                    className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-Black dark:hover:text-Black/80 dark:focus-visible:ring-Black"
                >
                    Dashboard
                </Link>
            ) : !auth.user && (
                <div className="bg-white py-2 px-4 w-full flex justify-between items-center">
                    <div></div> {/* Pusty element po lewej stronie */}
                    <Link
                        href={route('login')}
                        className="text-black hover:text-black/70 dark:text-Black dark:hover:text-Black/80"
                    >
                        Zaloguj się
                    </Link>
                </div>
            
            )}
        </nav>
        <div className="grid grid-cols-3 flex lg:justify-center lg:col-start-2 w-full lg:w-auto  pb-10 mt-0">
            <div className="position-relative">
                <ApplicationLogo className="w-60 h-20 fill-current text-gray-500 position-absolute top-0 start-0" />
            </div>

            <div className="flex lg:justify-center lg:col-start-2 w-full lg:w-auto">
                Nazwa użytkownika
            </div>
        </div>
        <div className='flex items-center lg:justify-center py-10'>
            Przyciski wybierania
        </div>
    </header>
    </>
    )
}