export default function Cart() {
    return (
        <div class="container mx-auto px-4 md:px-6 py-12">
        <h1 class="text-2xl font-bold mb-8">Shopping Cart</h1>
        <div class="grid gap-8">
            <div class="border rounded-lg overflow-hidden">
            <div class="grid md:grid-cols-[auto_1fr_auto] gap-6 p-6">
                <div class="grid grid-cols-[auto_1fr] items-center gap-4">
                <img
                    src="/placeholder.svg"
                    alt="Cozy Blanket"
                    width="80"
                    height="80"
                    class="rounded-md object-cover"
                    style="aspect-ratio: 80 / 80; object-fit: cover;"
                />
                <div class="grid gap-1">
                    <h3 class="font-semibold">Cozy Blanket</h3>
                    <div class="flex items-center gap-2">
                    <span class="text-gray-500 dark:text-gray-400">Qty: 2</span>
                    <span class="font-semibold">$29.99</span>
                    </div>
                </div>
                <div class="text-right">
                    <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="h-4 w-4"
                    >
                        <path d="M18 6 6 18"></path>
                        <path d="m6 6 12 12"></path>
                    </svg>
                    <span class="sr-only">Remove</span>
                    </button>
                </div>
                </div>
                <div class="grid grid-cols-[auto_1fr] items-center gap-4">
                <img
                    src="/placeholder.svg"
                    alt="Autumn Mug"
                    width="80"
                    height="80"
                    class="rounded-md object-cover"
                    style="aspect-ratio: 80 / 80; object-fit: cover;"
                />
                <div class="grid gap-1">
                    <h3 class="font-semibold">Autumn Mug</h3>
                    <div class="flex items-center gap-2">
                    <span class="text-gray-500 dark:text-gray-400">Qty: 1</span>
                    <span class="font-semibold">$12.99</span>
                    </div>
                </div>
                <div class="text-right">
                    <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="h-4 w-4"
                    >
                        <path d="M18 6 6 18"></path>
                        <path d="m6 6 12 12"></path>
                    </svg>
                    <span class="sr-only">Remove</span>
                    </button>
                </div>
                </div>
                <div class="grid grid-cols-[auto_1fr] items-center gap-4">
                <img
                    src="/placeholder.svg"
                    alt="Fall Fragrance Candle"
                    width="80"
                    height="80"
                    class="rounded-md object-cover"
                    style="aspect-ratio: 80 / 80; object-fit: cover;"
                />
                <div class="grid gap-1">
                    <h3 class="font-semibold">Fall Fragrance Candle</h3>
                    <div class="flex items-center gap-2">
                    <span class="text-gray-500 dark:text-gray-400">Qty: 3</span>
                    <span class="font-semibold">$16.99</span>
                    </div>
                </div>
                <div class="text-right">
                    <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="h-4 w-4"
                    >
                        <path d="M18 6 6 18"></path>
                        <path d="m6 6 12 12"></path>
                    </svg>
                    <span class="sr-only">Remove</span>
                    </button>
                </div>
                </div>
            </div>
            </div>
            <div class="grid md:grid-cols-[1fr_auto] gap-6">
            <div class="border rounded-lg p-6">
                <div class="flex items-center justify-between">
                <h3 class="font-semibold">Total</h3>
                <span class="text-2xl font-bold">$123.94</span>
                </div>
            </div>
            <div class="grid gap-4">
                <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                Continue Shopping
                </button>
                <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                Proceed to Checkout
                </button>
            </div>
            </div>
        </div>
        </div>
    )
}