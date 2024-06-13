import { Link } from "react-router-dom";

export default function LandingPage(){
  return (
    <div className="flex flex-col min-h-[100dvh]">
  <section className="py-64 w-full h-fit overflow-hidden bg-neutral-800 bg-auto bg-center h-64 w-full">
    <div className="absolute inset-0 bg-neutral-800"></div>
    <div className="relative h-full flex flex-col items-center justify-center text-center text-white space-y-6 px-4 md:px-6">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Refresh Your Time</h1>
      <p className="text-lg md:text-xl">
        Refresh with the best products
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link to='/register'>
          <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 rounded-md px-8">
            Register
          </button>
        </Link>
        <Link to='/login'>
          <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 rounded-md px-8">
            Login   
          </button>
        </Link>
      </div>
    </div>
  </section>
  </div>
  );
}