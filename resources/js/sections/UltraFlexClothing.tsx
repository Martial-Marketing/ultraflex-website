import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function UltraFlexClothing() {
    return (
        <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-4xl font-bold mb-6">UltraFlex Clothing</h2>
                        <p className="text-xl mb-8 text-gray-300">
                            Elevate your workout style with our premium athletic wear. 
                            Designed for performance, built for comfort, made to inspire.
                        </p>
                        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg">
                            Shop Collection
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <img src="/images/clothing/shirt.jpg" alt="UltraFlex Shirt" className="rounded-lg" />
                        <img src="/images/clothing/shorts.jpg" alt="UltraFlex Shorts" className="rounded-lg" />
                        <img src="/images/clothing/hoodie.jpg" alt="UltraFlex Hoodie" className="rounded-lg" />
                        <img src="/images/clothing/leggings.jpg" alt="UltraFlex Leggings" className="rounded-lg" />
                    </div>
                </div>
            </div>
        </section>
    );
}