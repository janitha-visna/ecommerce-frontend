import LoginForm from "../../components/LoginForm";

export default function AdminLoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-slate-900 relative overflow-hidden">
            {/* Decorative Background for Admin */}
            <div className="absolute inset-0 z-0 opacity-20">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
            </div>

            <div className="relative z-10 w-full max-w-md">
                <LoginForm isAdmin />
            </div>
        </div>
    );
}
