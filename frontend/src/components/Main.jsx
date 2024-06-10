export default function Main() {
    return (
        <section className="w-full py-6 bg-slate-700">
            <div className="container mx-auto max-w-xl px-4 md:px-6 lg:max-w-none">
                {/* Header Section */}
                <header className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-4">
                        <a href="#" className="text-white">Profile</a>
                        <a href="#" className="text-white">Logout</a>
                        <a href="#" className="text-white">Contact</a>
                    </div>
                </header>

                {/* Main Section */}
                <div className="grid gap-6 md:gap-8">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 justify-between">
                        <div className="grid gap-1">
                            <h1 className="text-2xl font-bold tracking-tight">Featured Products</h1>
                            <p className="text-gray-500 dark:text-gray-400">Discover our latest and greatest products</p>
                        </div>
                        <div className="flex gap-4 w-full justify-end">
                        <button className="flex items-center text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                                <circle cx="9" cy="21" r="1"></circle>
                                <circle cx="20" cy="21" r="1"></circle>
                                <path d="M1.5 1.5h2l3.6 13.5H19l1.4-6.5H6.5"></path>
                            </svg>
                            <span className="ml-2">Cart</span>
                        </button>
                        <button className="flex items-center text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                                <path d="m21 16-4 4-4-4"></path>
                                <path d="M17 20V4"></path>
                                <path d="m3 8 4-4 4 4"></path>
                                <path d="M7 4v16"></path>
                            </svg>
                            <span className="ml-2">Sort</span>
                        </button>
                        </div>
                        <div className="flex items-center gap-2">
                        </div>
                    </div>
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Product Card 1 */}
                        <div className="grid gap-4 relative group">
                            <a className="absolute inset-0 z-10" href="#">
                                <span className="sr-only">View</span>
                            </a>
                            <img
                                src=""
                                alt="Coca-Cola"
                                width="450"
                                height="300"
                                className="rounded-lg object-cover w-full aspect-[3/2] group-hover:opacity-50 transition-opacity"
                            />
                            <div className="grid gap-1">
                                <h3 className="font-semibold">Coca-Cola</h3>
                                <p className="text-sm leading-none">Destapa la felicidad</p>
                                <div className="flex items-center justify-between">
                                    <p className="font-bold">$699.00</p>
                                    <div className="flex items-center gap-2">
                                        <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="w-4 h-4"
                                            >
                                                <circle cx="8" cy="21" r="1"></circle>
                                                <circle cx="19" cy="21" r="1"></circle>
                                                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
                                            </svg>
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Product Card 2 */}
                        <div className="grid gap-4 relative group">
                            <a className="absolute inset-0 z-10" href="#">
                                <span className="sr-only">View</span>
                            </a>
                            <img
                                src="/placeholder.svg"
                                width="450"
                                height="300"
                                alt="Sprite"
                                className="rounded-lg object-cover w-full aspect-[3/2] group-hover:opacity-50 transition-opacity"
                            />
                            <div className="grid gap-1">
                                <h3 className="font-semibold">Sprite</h3>
                                <p className="text-sm leading-none">Heat Happens</p>
                                <div className="flex items-center justify-between">
                                    <p className="font-bold">$199.99</p>
                                    <div className="flex items-center gap-2">
                                        <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="w-4 h-4"
                                            >
                                                <circle cx="8" cy="21" r="1"></circle>
                                                <circle cx="19" cy="21" r="1"></circle>
                                                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
                                            </svg>
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Product Card 3 */}
                        <div className="grid gap-4 relative group">
                            <a className="absolute inset-0 z-10" href="#">
                                <span className="sr-only">View</span>
                            </a>
                            <img
                                src="/placeholder.svg"
                                alt="Paso de los Toros"
                                width="450"
                                height="300"
                                className="rounded-lg object-cover w-full aspect-[3/2] group-hover:opacity-50 transition-opacity"
                            />
                            <div className="grid gap-1">
                                <h3 className="font-semibold">Paso de los Toros</h3>
                                <p className="text-sm leading-none">Arrolla la sed</p>
                                <div className="flex items-center justify-between">
                                    <p className="font-bold">$79.99</p>
                                    <div className="flex items-center gap-2">
                                        <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="w-4 h-4"
                                            >
                                                <circle cx="8" cy="21" r="1"></circle>
                                                <circle cx="19" cy="21" r="1"></circle>
                                                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
                                            </svg>
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Product Card 4 */}
                        <div className="grid gap-4 relative group">
                            <a className="absolute inset-0 z-10" href="#">
                                <span className="sr-only">View</span>
                            </a>
                            <img
                                src="/placeholder.svg"
                                alt="Aquarius"
                                width="450"
                                height="300"
                                className="rounded-lg object-cover w-full aspect-[3/2] group-hover:opacity-50 transition-opacity"
                            />
                            <div className="grid gap-1">
                                <h3 className="font-semibold">Aquarius</h3>
                                <p className="text-sm leading-none">Lo natural, te hace más natural</p>
                                <div className="flex items-center justify-between">
                                    <p className="font-bold">$49.99</p>
                                    <div className="flex items-center gap-2">
                                        <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="w-4 h-4"
                                            >
                                                <circle cx="8" cy="21" r="1"></circle>
                                                <circle cx="19" cy="21" r="1"></circle>
                                                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
                                            </svg>
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
