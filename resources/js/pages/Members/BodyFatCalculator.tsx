import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import AnimatedBackground from '@/components/AnimatedBackground';
import { ArrowLeft, Scale } from 'lucide-react';
import { useState } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
    memberSince: string;
    membershipType: string;
    profileImage?: string;
}

interface BodyFatCalculatorProps {
    auth: {
        user: User;
    };
}

interface BodyFatData {
    heightFt: number;
    heightIn: number;
    age: number;
    weight: number;
    gender: string;
    units: string;
    method: string;
    waist: number;
    neck: number;
    hip: number;
}

interface BodyFatResults {
    bodyfat: number;
    lbm: number;
    fbm: number;
    classification: string;
}

export default function BodyFatCalculator({ auth }: BodyFatCalculatorProps) {
    const [data, setData] = useState<BodyFatData>({
        heightFt: 0,
        heightIn: 0,
        age: 0,
        weight: 0,
        gender: 'male',
        units: 'imperial',
        method: 'navy',
        waist: 0,
        neck: 0,
        hip: 0
    });

    const [results, setResults] = useState<BodyFatResults>({
        bodyfat: 0,
        lbm: 0,
        fbm: 0,
        classification: ''
    });

    const calculateBodyFat = () => {
        const heightInches = data.heightFt * 12 + data.heightIn;
        const heightCm = heightInches * 2.54;
        
        let bodyfat = 0;
        
        if (data.method === 'navy') {
            // US Navy Method
            if (data.gender === 'male') {
                const log1 = Math.log10(data.waist - data.neck);
                const log2 = Math.log10(heightInches);
                bodyfat = 495 / (1.0324 - 0.19077 * log1 + 0.15456 * log2) - 450;
            } else {
                const log1 = Math.log10(data.waist + data.hip - data.neck);
                const log2 = Math.log10(heightInches);
                bodyfat = 495 / (1.29579 - 0.35004 * log1 + 0.22100 * log2) - 450;
            }
        }
        
        // Ensure bodyfat is within reasonable range
        bodyfat = Math.max(3, Math.min(50, bodyfat));
        
        const lbm = data.weight * (100 - bodyfat) / 100;
        const fbm = data.weight * bodyfat / 100;
        
        let classification = '';
        if (data.gender === 'male') {
            if (bodyfat < 6) classification = 'Essential Fat';
            else if (bodyfat < 14) classification = 'Athletes';
            else if (bodyfat < 18) classification = 'Fitness';
            else if (bodyfat < 25) classification = 'Average';
            else classification = 'Obese';
        } else {
            if (bodyfat < 14) classification = 'Essential Fat';
            else if (bodyfat < 21) classification = 'Athletes';
            else if (bodyfat < 25) classification = 'Fitness';
            else if (bodyfat < 32) classification = 'Average';
            else classification = 'Obese';
        }

        setResults({
            bodyfat: Math.round(bodyfat * 10) / 10,
            lbm: Math.round(lbm * 10) / 10,
            fbm: Math.round(fbm * 10) / 10,
            classification
        });
    };

    const updateData = (field: keyof BodyFatData, value: any) => {
        setData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <AppLayout auth={auth}>
            <Head title="Body Fat Calculator - UltraFlex Members">
                <meta name="description" content="Calculate your body fat percentage using advanced measurement methods with UltraFlex's body fat calculator." />
            </Head>

            <div className="min-h-screen relative">
                <AnimatedBackground 
                    variant="gradient" 
                    intensity="medium"
                    className="z-0"
                />
                
                <div className="relative z-10">
                    {/* Header */}
                    <section className="bg-gradient-to-r from-red-900/80 to-red-700/80 py-16 backdrop-blur-sm relative overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            {Array.from({ length: 15 }, (_, i) => (
                                <div
                                    key={i}
                                    className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
                                    style={{
                                        top: `${Math.random() * 100}%`,
                                        left: `${Math.random() * 100}%`,
                                        animationDelay: `${Math.random() * 3}s`,
                                        animationDuration: `${2 + Math.random() * 2}s`
                                    }}
                                />
                            ))}
                        </div>

                        <div className="container mx-auto px-6 relative z-10">
                            <div className="flex items-center justify-between mb-8">
                                <Link href="/members/nutrition/calculator">
                                    <Button variant="outline" className="border-white/50 bg-white/90 text-black hover:text-red-700 hover:bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group backdrop-blur-sm">
                                        <ArrowLeft className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                                            Back to Calculators
                                        </span>
                                    </Button>
                                </Link>
                            </div>

                            <div className="text-center text-white">
                                <div className="flex items-center justify-center gap-4 mb-4">
                                    <div className="w-16 h-16 bg-gradient-to-r from-red-700 to-red-800 rounded-full flex items-center justify-center shadow-lg">
                                        <Scale className="h-8 w-8 text-white" />
                                    </div>
                                </div>
                                <h1 className="text-5xl font-bold mb-4">MWP Body Fat Calculator</h1>
                                <p className="text-xl text-gray-200 mb-6">
                                    Calculate your body fat percentage using proven measurement methods
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Calculator */}
                    <section className="py-16">
                        <div className="container mx-auto px-6">
                            <div className="grid lg:grid-cols-2 gap-8">
                                {/* Input Section */}
                                <Card className="bg-black/40 backdrop-blur-md border border-white/10">
                                    <CardHeader>
                                        <CardTitle className="text-white text-2xl">Body Measurements</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        {/* Units Selection */}
                                        <div className="space-y-2">
                                            <Label className="text-white">Units</Label>
                                            <div className="flex gap-6">
                                                <div className="flex items-center space-x-2">
                                                    <input 
                                                        type="radio" 
                                                        id="imperial-bf" 
                                                        name="units-bf" 
                                                        value="imperial"
                                                        checked={data.units === 'imperial'}
                                                        onChange={(e) => updateData('units', e.target.value)}
                                                        className="text-red-600"
                                                    />
                                                    <Label htmlFor="imperial-bf" className="text-white">Imperial</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <input 
                                                        type="radio" 
                                                        id="metric-bf" 
                                                        name="units-bf" 
                                                        value="metric"
                                                        checked={data.units === 'metric'}
                                                        onChange={(e) => updateData('units', e.target.value)}
                                                        className="text-red-600"
                                                    />
                                                    <Label htmlFor="metric-bf" className="text-white">Metric</Label>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Gender */}
                                        <div className="space-y-2">
                                            <Label className="text-white">Gender</Label>
                                            <div className="flex gap-6">
                                                <div className="flex items-center space-x-2">
                                                    <input 
                                                        type="radio" 
                                                        id="male-bf" 
                                                        name="gender-bf" 
                                                        value="male"
                                                        checked={data.gender === 'male'}
                                                        onChange={(e) => updateData('gender', e.target.value)}
                                                        className="text-red-600"
                                                    />
                                                    <Label htmlFor="male-bf" className="text-white">Male</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <input 
                                                        type="radio" 
                                                        id="female-bf" 
                                                        name="gender-bf" 
                                                        value="female"
                                                        checked={data.gender === 'female'}
                                                        onChange={(e) => updateData('gender', e.target.value)}
                                                        className="text-red-600"
                                                    />
                                                    <Label htmlFor="female-bf" className="text-white">Female</Label>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Method Selection */}
                                        <div className="space-y-2">
                                            <Label className="text-white">Select Method</Label>
                                            <Select value={data.method} onValueChange={(value) => updateData('method', value)}>
                                                <SelectTrigger className="bg-black/20 border-white/20 text-white">
                                                    <SelectValue placeholder="Your Tool" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="navy">US Navy Method</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        {/* Height */}
                                        <div className="space-y-2">
                                            <Label className="text-white">Height</Label>
                                            <div className="flex gap-2">
                                                <div className="flex items-center gap-2">
                                                    <Input
                                                        type="number"
                                                        value={data.heightFt}
                                                        onChange={(e) => updateData('heightFt', parseInt(e.target.value) || 0)}
                                                        className="bg-black/20 border-white/20 text-white w-20"
                                                        placeholder="0"
                                                    />
                                                    <span className="text-white text-sm">ft</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Input
                                                        type="number"
                                                        value={data.heightIn}
                                                        onChange={(e) => updateData('heightIn', parseInt(e.target.value) || 0)}
                                                        className="bg-black/20 border-white/20 text-white w-20"
                                                        placeholder="0"
                                                    />
                                                    <span className="text-white text-sm">in</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Age */}
                                        <div className="space-y-2">
                                            <Label className="text-white">Age</Label>
                                            <div className="flex items-center gap-2">
                                                <Input
                                                    type="number"
                                                    value={data.age}
                                                    onChange={(e) => updateData('age', parseInt(e.target.value) || 0)}
                                                    className="bg-black/20 border-white/20 text-white"
                                                    placeholder="0"
                                                />
                                                <span className="text-white text-sm">yrs</span>
                                            </div>
                                        </div>

                                        {/* Weight */}
                                        <div className="space-y-2">
                                            <Label className="text-white">Weight</Label>
                                            <div className="flex items-center gap-2">
                                                <Input
                                                    type="number"
                                                    value={data.weight}
                                                    onChange={(e) => updateData('weight', parseInt(e.target.value) || 0)}
                                                    className="bg-black/20 border-white/20 text-white"
                                                    placeholder="0"
                                                />
                                                <span className="text-white text-sm">lbs</span>
                                            </div>
                                        </div>

                                        {/* Waist */}
                                        <div className="space-y-2">
                                            <Label className="text-white">Waist</Label>
                                            <div className="flex items-center gap-2">
                                                <Input
                                                    type="number"
                                                    value={data.waist}
                                                    onChange={(e) => updateData('waist', parseInt(e.target.value) || 0)}
                                                    className="bg-black/20 border-white/20 text-white"
                                                    placeholder="0"
                                                />
                                                <span className="text-white text-sm">in</span>
                                            </div>
                                        </div>

                                        {/* Neck */}
                                        <div className="space-y-2">
                                            <Label className="text-white">Neck</Label>
                                            <div className="flex items-center gap-2">
                                                <Input
                                                    type="number"
                                                    value={data.neck}
                                                    onChange={(e) => updateData('neck', parseInt(e.target.value) || 0)}
                                                    className="bg-black/20 border-white/20 text-white"
                                                    placeholder="0"
                                                />
                                                <span className="text-white text-sm">in</span>
                                            </div>
                                        </div>

                                        {/* Hip (for females) */}
                                        {data.gender === 'female' && (
                                            <div className="space-y-2">
                                                <Label className="text-white">Hip</Label>
                                                <div className="flex items-center gap-2">
                                                    <Input
                                                        type="number"
                                                        value={data.hip}
                                                        onChange={(e) => updateData('hip', parseInt(e.target.value) || 0)}
                                                        className="bg-black/20 border-white/20 text-white"
                                                        placeholder="0"
                                                    />
                                                    <span className="text-white text-sm">in</span>
                                                </div>
                                            </div>
                                        )}

                                        <Button 
                                            onClick={calculateBodyFat}
                                            className="w-full bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 transition-all duration-300 group text-lg py-3"
                                        >
                                            <Scale className="mr-2 h-5 w-5" />
                                            <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                Calculate
                                            </span>
                                        </Button>
                                    </CardContent>
                                </Card>

                                {/* Results Section */}
                                <Card className="bg-black/40 backdrop-blur-md border border-white/10">
                                    <CardHeader>
                                        <CardTitle className="text-white text-2xl">Results</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="grid grid-cols-1 gap-6">
                                            <div className="bg-red-700/20 rounded-lg p-6 border border-red-700/30 text-center">
                                                <Label className="text-red-400 text-sm">Body Fat</Label>
                                                <p className="text-white text-4xl font-bold">{results.bodyfat || '--'}</p>
                                                <p className="text-gray-400 text-sm">%</p>
                                            </div>
                                            
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="bg-blue-700/20 rounded-lg p-4 border border-blue-700/30 text-center">
                                                    <Label className="text-blue-400 text-sm">LBM</Label>
                                                    <p className="text-white text-2xl font-bold">{results.lbm || '--'}</p>
                                                    <p className="text-gray-400 text-xs">lbs</p>
                                                </div>
                                                <div className="bg-yellow-700/20 rounded-lg p-4 border border-yellow-700/30 text-center">
                                                    <Label className="text-yellow-400 text-sm">FBM</Label>
                                                    <p className="text-white text-2xl font-bold">{results.fbm || '--'}</p>
                                                    <p className="text-gray-400 text-xs">lbs</p>
                                                </div>
                                            </div>
                                            
                                            {results.classification && (
                                                <div className="bg-green-700/20 rounded-lg p-6 border border-green-700/30 text-center">
                                                    <Label className="text-green-400 text-sm">Classification</Label>
                                                    <p className="text-white text-xl font-bold">{results.classification}</p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Info Box */}
                                        <div className="bg-black/20 rounded-lg p-4 border border-white/10">
                                            <h4 className="text-white font-semibold mb-2">About the US Navy Method</h4>
                                            <p className="text-gray-300 text-sm">
                                                The US Navy method uses body circumferences to estimate body fat percentage. 
                                                For men, it uses waist and neck measurements. For women, it includes hip measurements as well.
                                                This method is widely used and provides reasonably accurate results for most people.
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </AppLayout>
    );
}
