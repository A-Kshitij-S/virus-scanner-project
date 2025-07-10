import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
// import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import { setUser } from "../redux/authSlice";

export default function Navbar() {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = () => {
        dispatch(setUser(null));
        toast.success("Logged out");
        navigate("/login");
    };

    return (
        <nav className="w-full bg-[#0A2647] border-b border-[#144272] px-6 py-4 flex justify-between items-center shadow-md shadow-blue-900/10">
            <Link to="/" className="text-2xl font-bold text-[#2C74B3]">Virex</Link>

            <div className="flex gap-4 items-center text-gray-200">
                <Link to="/" className="hover:text-[#2C74B3] transition">Home</Link>


                {user ? (
                    <>
                        <Link to="/scan" className="hover:text-[#2C74B3] transition">Scan</Link>
                        <Link to="/history" className="hover:text-[#2C74B3] transition">History</Link>
                        <Button onClick={logoutHandler} className="ml-4 bg-[#2C74B3] hover:bg-[#205295] text-white">
                            Logout
                        </Button>
                    </>
                ) : (
                    <>

                        <Link to="/login">
                            <Button variant="outline" className="border-[#2C74B3] text-[#2C74B3] hover:bg-[#144272]">
                                Login
                            </Button>

                        </Link>
                        <Link to="/signup">
                            <Button variant="outline" className="border-[#2C74B3] text-[#2C74B3] hover:bg-[#144272]">
                                Sign Up
                            </Button>

                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}
