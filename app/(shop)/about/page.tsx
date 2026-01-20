export default function AboutPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl font-bold text-slate-900 mb-6">About Us</h1>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                    Welcome to Antigravity, where style meets substance. We are passoinate about providing high-quality fashion that helps you express your unique identity.
                </p>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                    Our journey began with a simple idea: to create a clothing brand that defies the ordinary. We believe that fashion should be uplifting, empowering, and accessible to everyone.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed">
                    Thank you for being part of our story.
                </p>
            </div>

            <div className="mt-16 max-w-5xl mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-slate-900">Visit Our Store</h2>
                    <p className="text-slate-500 mt-2">Come say hello and try on our latest collection in person.</p>
                </div>

                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
                    <div className="w-full h-[400px] rounded-xl overflow-hidden bg-slate-100 relative">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15844.757912423733!2d79.8595966!3d6.8679092!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25bad7754f9a5%3A0x60b29864700d23!2sAntigravity!5e0!3m2!1sen!2slk!4v1705826000000!5m2!1sen!2slk"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="absolute inset-0"
                        ></iframe>
                    </div>
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
                        <div>
                            <h3 className="font-semibold text-slate-900 mb-2">Address</h3>
                            <p className="text-slate-500">123 Fashion Avenue<br />Colombo 04, Sri Lanka</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900 mb-2">Hours</h3>
                            <p className="text-slate-500">Mon - Sat: 10am - 8pm<br />Sun: 11am - 6pm</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900 mb-2">Contact</h3>
                            <p className="text-slate-500">+94 11 234 5678<br />hello@antigravity.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
