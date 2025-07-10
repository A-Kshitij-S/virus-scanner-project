import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

export default function Home() {
    return (
        <>
            <Navbar/>
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#0A2647] text-white px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-[#2C74B3] mb-6">Virex</h1>
                <p className="text-lg text-gray-300 max-w-xl mb-8">
                    Your personal malware scanner powered by the VirusTotal API.
                    Scan files and URLs with confidence — fast, simple, and secure.
                </p>
                <div className="flex gap-4">
                    <Link to="/login">
                        <Button className="bg-[#2C74B3] hover:bg-[#205295] px-6 py-2 text-white rounded-lg transition-all duration-200">
                            Get Started
                        </Button>
                    </Link>
                    <a href="https://www.virustotal.com" target="_blank" rel="noreferrer">
                        <Button variant="outline" className="border border-[#2C74B3] text-[#2C74B3] hover:bg-[#144272]">
                            Learn More
                        </Button>
                    </a>
                </div>
            </div>
        </>
    );
}
