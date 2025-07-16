import AppLayout from '@/layouts/app-layout';
import AnimatedBackground from '@/components/AnimatedBackground';
import { Head, Link } from '@inertiajs/react';

export default function GymRules() {
    return (
        <AppLayout>
            <Head title="UltraFlex Gyms: Rules & Etiquette" />
            <div className="min-h-screen relative flex items-center justify-center py-8 px-2 sm:px-6">
                <AnimatedBackground variant="gradient" intensity="medium" className="z-0" />
                <div className="relative z-10 w-full max-w-4xl bg-black/70 rounded-2xl shadow-2xl border border-gray-800 backdrop-blur-md p-6 sm:p-10">
                    <h1 className="text-4xl sm:text-5xl font-black mb-6 text-center text-red-600 tracking-tight leading-tight drop-shadow-lg">
                        UltraFlex Gyms
                        <span className="block text-2xl sm:text-3xl text-white font-bold mt-1 tracking-wide">Rules & Etiquette</span>
                    </h1>
                    <div className="border-b border-gray-700 mb-8"></div>
                    <p className="text-base sm:text-lg text-gray-200 mb-8 text-center font-normal leading-relaxed max-w-xl mx-auto">
                        Welcome to UltraFlex. Our community is built on a foundation of <span className="font-semibold text-white">respect</span>, <span className="font-semibold text-white">effort</span>, and a shared passion for training. To ensure a safe, productive, and world-class environment for all members, we require adherence to the following rules and code of conduct.
                    </p>
                    <div className="space-y-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div>
                                <ol className="list-decimal list-inside">
                                    <li>
                                        <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 tracking-tight">Respect the Weights & Equipment</h2>
                                        <ul className="list-disc ml-6 space-y-2 text-base text-gray-300">
                                            <li><span className="font-semibold text-red-400">Re-Rack Your Weights:</span> This is our number one rule. After you are finished with dumbbells, barbells, or plates, return them to their designated storage racks. Leave the area as you would want to find it.</li>
                                            <li><span className="font-semibold text-red-400">Control Your Lifts:</span> Do not drop weights from a height. Controlled drops are permitted on the designated deadlift platforms and bumper plate areas only. Dropping dumbbells is strictly prohibited.</li>
                                            <li><span className="font-semibold text-red-400">Wipe Down Equipment:</span> Use the provided sanitising spray and paper towels to wipe down all benches, machines, and cardio equipment after use.</li>
                                            <li><span className="font-semibold text-red-400">Use Equipment Correctly:</span> Please use all equipment for its intended purpose. If you are unsure how to use a piece of equipment, ask a member of our team for assistance.</li>
                                            <li><span className="font-semibold text-red-400">Report Faults:</span> If you notice any damaged or malfunctioning equipment, please report it to a staff member immediately. Do not attempt to use it.</li>
                                        </ul>
                                    </li>
                                </ol>
                            </div>
                            <div className="flex flex-col h-full justify-between">
                                <ol start={2} className="list-decimal list-inside">
                                    <li>
                                        <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 tracking-tight">Respect the People & Community</h2>
                                        <ul className="list-disc ml-6 space-y-2 text-base text-gray-300">
                                            <li><span className="font-semibold text-red-400">Give People Space:</span> Be aware of your surroundings. Do not walk directly in front of someone performing a lift or stand too close to them. Respect personal lifting zones.</li>
                                            <li><span className="font-semibold text-red-400">Filming & Photography:</span> You may film your own lifts, but you must be discreet. Ensure no other members are clearly visible in your shot without their explicit prior consent. Tripods must not obstruct walkways or equipment access.</li>
                                            <li><span className="font-semibold text-red-400">Noise Level:</span> Effort and intensity are encouraged, but please avoid excessive, distracting screaming or shouting. Use headphones if you wish to listen to your own music.</li>
                                            <li><span className="font-semibold text-red-400">Attire:</span> Wear appropriate, clean athletic clothing and footwear at all times. No jeans, boots, or open-toed shoes are permitted on the gym floor.</li>
                                            <li><span className="font-semibold text-red-400">Hygiene:</span> Please maintain good personal hygiene and use a towel to create a barrier between you and any benches or machine pads.</li>
                                        </ul>
                                    </li>
                                </ol>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div>
                                <ol start={3} className="list-decimal list-inside">
                                    <li>
                                        <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 tracking-tight">Safety & Membership</h2>
                                        <ul className="list-disc ml-6 space-y-2 text-base text-gray-300">
                                            <li><span className="font-semibold text-red-400">Spotters:</span> For heavy lifts (e.g., bench press, squats), we strongly recommend you use a spotter. Don't be afraid to ask someone for a spot – and be willing to give one in return.</li>
                                            <li><span className="font-semibold text-red-400">Access:</span> You must scan your membership card or fob upon every entry. Do not allow access to non-members. All guests must be registered at reception.</li>
                                            <li><span className="font-semibold text-red-400">Lockers:</span> Lockers are for use only while you are training in the gym. Locks may be removed from lockers left secured overnight. UltraFlex is not responsible for any lost or stolen items.</li>
                                            <li><span className="font-semibold text-red-400">Listen to Staff:</span> Our team is here to ensure your safety and the smooth operation of the gym. Please follow their instructions at all times.</li>
                                        </ul>
                                    </li>
                                </ol>
                            </div>
                            <div>
                                <ol start={4} className="list-decimal list-inside">
                                    <li>
                                        <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 tracking-tight">Respect the Space & Environment</h2>
                                        <ul className="list-disc ml-6 space-y-2 text-base text-gray-300">
                                            <li><span className="font-semibold text-red-400">Don't Hog Equipment:</span> Be mindful of others, especially during peak hours. Do not rest on equipment for extended periods while using your phone. Allow others to "work in" between your sets if requested.</li>
                                            <li><span className="font-semibold text-red-400">Keep Pathways Clear:</span> Keep your gym bags, coats, and other personal belongings in the lockers provided. Do not leave them on the gym floor where they can become a trip hazard.</li>
                                            <li><span className="font-semibold text-red-400">Chalk:</span> Liquid chalk is preferred. If using block chalk, please be considerate, keep it contained within the chalk bowl, and clean up any excessive mess you create.</li>
                                            <li><span className="font-semibold text-red-400">Tidiness:</span> Dispose of all rubbish, empty bottles, and used paper towels in the bins provided.</li>
                                        </ul>
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-700 mt-10 mb-6"></div>
                    <div className="text-center">
                        <p className="text-base sm:text-lg text-gray-300 mb-3 font-normal leading-relaxed max-w-xl mx-auto">Thank you for your cooperation. By following these rules, we can all contribute to making UltraFlex the ultimate training environment.</p>
                        <p className="text-lg sm:text-xl font-bold text-red-500 animate-pulse tracking-tight mb-2">Now, go train hard.</p>
                        <Link href="/" className="inline-block mt-6 text-red-500 hover:text-white font-semibold underline underline-offset-4 decoration-2 transition-colors duration-300">Back to Home</Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
