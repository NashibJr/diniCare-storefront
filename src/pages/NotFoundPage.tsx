import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
export default function NotFoundPage(){return <div className="mx-auto max-w-xl px-4 py-24 text-center"><div className="text-7xl font-black text-primary-100">404</div><h1 className="mt-4 text-3xl font-black">Page not found</h1><p className="mt-3 text-sm text-gray-500">The page you requested does not exist or has moved.</p><Link to="/" className="mt-7 inline-block"><Button>Back home</Button></Link></div>}
