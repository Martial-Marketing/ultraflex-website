import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import type { User as SharedUser } from '@/types';
import AnimatedBackground from '@/components/AnimatedBackground';
import { ArrowLeft, Calculator } from 'lucide-react';
import { useState, useEffect } from 'react';

type User = SharedUser;

interface DietCalculatorProps {
    auth: {
        user: User;
    };
}

interface CalculatorData {
    heightFt: number;
    heightIn: number;
    weight: number;
    goalWeight: number;
    age: number;
    activity: string;
    workoutsPerWeek: number;
    goal: string;
    bodyfat: number;
    waist: number;
    gender: string;
    units: string;
    bmrFormula: string;
    tdeeMethod: string;
}

interface Results {
    bmr: number;
    tdee: number;
    lbm: number;
    fbm: number;
    bmi: number;
    waistToHeight: number;
    mfm: number;
    mrdc: number;
    workoutDayCalories: number;
    restDayCalories: number;
    weeksToGoal: number;
    finalWeight: number;
    weightClass: string;
}

interface BodyFatCalculatorData {
    gender: string;
    units: string;
    method: string;
    heightFt: number;
    heightIn: number;
    age: number;
    weight: number;
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

export default function DietCalculator({ auth }: DietCalculatorProps) {
    const [data, setData] = useState<CalculatorData>({
        heightFt: 0,
        heightIn: 0,
        weight: 0,
        goalWeight: 0,
        age: 0,
        activity: 'sedentary',
        workoutsPerWeek: 0,
        goal: 'maintain',
        bodyfat: 0,
        waist: 0,
        gender: 'male',
        units: 'imperial',
        bmrFormula: 'mifflin',
        tdeeMethod: 'calculate'
    });

    const [results, setResults] = useState<Results>({
        bmr: 0,
        tdee: 0,
        lbm: 0,
        fbm: 0,
        bmi: 0,
        waistToHeight: 0,
        mfm: 0,
        mrdc: 0,
        workoutDayCalories: 0,
        restDayCalories: 0,
        weeksToGoal: 0,
        finalWeight: 0,
        weightClass: ''
    });

    const [bodyFatData, setBodyFatData] = useState<BodyFatCalculatorData>({
        gender: 'male',
        units: 'imperial',
        method: 'navy',
        heightFt: 0,
        heightIn: 0,
        age: 0,
        weight: 0,
        waist: 0,
        neck: 0,
        hip: 0
    });

    const [bodyFatResults, setBodyFatResults] = useState<BodyFatResults>({
        bodyfat: 0,
        lbm: 0,
        fbm: 0,
        classification: ''
    });

    const calculateBMR = () => {
        const heightCm = (data.heightFt * 12 + data.heightIn) * 2.54;
        const weightKg = data.weight * 0.453592;
        
        let bmr = 0;
        
        switch (data.bmrFormula) {
            case 'mifflin':
                if (data.gender === 'male') {
                    bmr = 10 * weightKg + 6.25 * heightCm - 5 * data.age + 5;
                } else {
                    bmr = 10 * weightKg + 6.25 * heightCm - 5 * data.age - 161;
                }
                break;
            case 'harris':
                if (data.gender === 'male') {
                    bmr = 88.362 + 13.397 * weightKg + 4.799 * heightCm - 5.677 * data.age;
                } else {
                    bmr = 447.593 + 9.247 * weightKg + 3.098 * heightCm - 4.330 * data.age;
                }
                break;
            case 'katch':
                const leanMass = data.weight * (100 - data.bodyfat) / 100;
                bmr = 370 + 21.6 * leanMass * 0.453592;
                break;
            case 'cunningham':
                const leanMassKg = data.weight * (100 - data.bodyfat) / 100 * 0.453592;
                bmr = 500 + 22 * leanMassKg;
                break;
            default:
                bmr = 0;
        }
        
        return bmr;
    };

    const getActivityMultiplier = () => {
        const multipliers = {
            sedentary: 1.2,
            light: 1.375,
            moderate: 1.55,
            heavy: 1.725,
            extreme: 1.9
        };
        return multipliers[data.activity as keyof typeof multipliers] || 1.2;
    };

    const calculateTDEE = (bmr: number) => {
        return bmr * getActivityMultiplier();
    };

    const calculateAll = () => {
        const bmr = calculateBMR();
        const tdee = calculateTDEE(bmr);
        const lbm = data.weight * (100 - data.bodyfat) / 100;
        const fbm = data.weight * data.bodyfat / 100;
        const heightInches = data.heightFt * 12 + data.heightIn;
        const bmi = (data.weight / (heightInches * heightInches)) * 703;
        const waistToHeight = data.waist / heightInches;
        
        // Maximum Fat-Free Mass (Martin Berkhan formula)
        const mfm = (heightInches - 98) * 2.2;
        
        // Maximum Recommended Daily Calories
        const mrdc = tdee + 500;
        
        // Workout and rest day calories based on goal
        let workoutCalories = tdee;
        let restCalories = tdee;
        
        switch (data.goal) {
            case 'lose':
                workoutCalories = tdee - 300;
                restCalories = tdee - 500;
                break;
            case 'gain':
                workoutCalories = tdee + 500;
                restCalories = tdee + 300;
                break;
            default:
                workoutCalories = tdee;
                restCalories = tdee;
        }
        
        // Weeks to goal (simplified calculation)
        const weightDifference = Math.abs(data.goalWeight - data.weight);
        const weeksToGoal = data.goal === 'maintain' ? 0 : weightDifference / (data.goal === 'lose' ? 1.5 : 1);
        
        // Weight class (simplified categories)
        let weightClass = '';
        if (data.weight < 125) weightClass = 'Flyweight';
        else if (data.weight < 135) weightClass = 'Bantamweight';
        else if (data.weight < 145) weightClass = 'Featherweight';
        else if (data.weight < 155) weightClass = 'Lightweight';
        else if (data.weight < 170) weightClass = 'Welterweight';
        else if (data.weight < 185) weightClass = 'Middleweight';
        else if (data.weight < 205) weightClass = 'Light Heavyweight';
        else weightClass = 'Heavyweight';

        setResults({
            bmr: Math.round(bmr),
            tdee: Math.round(tdee),
            lbm: Math.round(lbm * 10) / 10,
            fbm: Math.round(fbm * 10) / 10,
            bmi: Math.round(bmi * 10) / 10,
            waistToHeight: Math.round(waistToHeight * 100) / 100,
            mfm: Math.round(mfm),
            mrdc: Math.round(mrdc),
            workoutDayCalories: Math.round(workoutCalories),
            restDayCalories: Math.round(restCalories),
            weeksToGoal: Math.round(weeksToGoal),
            finalWeight: data.goalWeight,
            weightClass
        });
    };

    const updateData = (field: keyof CalculatorData, value: any) => {
        setData(prev => ({ ...prev, [field]: value }));
    };

    const calculateBodyFat = () => {
        let bodyfat = 0;
        let lbm = 0;
        let fbm = 0;
        let classification = '';

        const { gender, method, heightFt, heightIn, age, weight, waist, neck, hip } = bodyFatData;

        const heightCm = (heightFt * 12 + heightIn) * 2.54;
        const weightKg = weight * 0.453592;

        if (method === 'navy') {
            // Navy Body Fat Formula
            if (gender === 'male') {
                bodyfat = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(heightCm)) - 450;
            } else {
                bodyfat = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(heightCm)) - 450;
            }
        } else if (method === 'bmi') {
            // BMI-based Body Fat Formula
            const bmi = (weight / Math.pow(heightFt * 12 + heightIn, 2)) * 703;
            if (gender === 'male') {
                bodyfat = 1.20 * bmi + 0.23 * age - 16.2;
            } else {
                bodyfat = 1.20 * bmi + 0.23 * age - 5.4;
            }
        } else if (method === 'ymca') {
            // YMCA Body Fat Formula
            const waistCm = waist * 2.54;
            if (gender === 'male') {
                bodyfat = -98.42 + 4.15 * waistCm - 0.082 * weight;
            } else {
                bodyfat = -76.76 + 4.15 * waistCm - 0.082 * weight;
            }
        }

        lbm = weight - fbm;
        fbm = (bodyfat / 100) * weight;

        // Body Fat Classification
        if (bodyfat < 6) classification = 'Essential fat';
        else if (bodyfat < 14) classification = 'Athletes';
        else if (bodyfat < 17) classification = 'Fitness';
        else if (bodyfat < 25) classification = 'Acceptable';
        else classification = 'Obesity';

        setBodyFatResults({
            bodyfat: Math.round(bodyfat * 10) / 10,
            lbm: Math.round(lbm * 10) / 10,
            fbm: Math.round(fbm * 10) / 10,
            classification
        });
    };

    const updateBodyFatData = (field: keyof BodyFatCalculatorData, value: any) => {
        setBodyFatData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <AppLayout auth={auth}>
            <Head title="Diet Calculator - ULTRAFLEX Members">
                <meta name="description" content="Calculate your BMR, TDEE, and personalized nutrition targets with ULTRAFLEX's advanced diet calculator." />
            </Head>

            <div className="min-h-screen relative">
                <AnimatedBackground 
                    variant="gradient" 
                    intensity="medium"
                    className="z-0"
                />
                
                <div className="relative z-10">
                    {/* Header */}
                    <section className="bg-gradient-to-r from-black/80 via-white/5 to-black/80 py-16 backdrop-blur-sm relative overflow-hidden">
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
                                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center shadow-lg border border-white/20">
                                        <Calculator className="h-8 w-8 text-white" />
                                    </div>
                                </div>
                                <h1 className="text-5xl font-bold mb-4">Diet Calculator</h1>
                                <p className="text-xl text-gray-200 mb-6">
                                    Calculate your BMR, TDEE, and personalized nutrition targets
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
                                        <CardTitle className="text-white text-2xl">Personal Information</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        {/* Units Selection */}
                                        <div className="space-y-2">
                                            <Label className="text-white">Units</Label>
                                            <div className="flex gap-6">
                                                <div className="flex items-center space-x-2">
                                                    <input 
                                                        type="radio" 
                                                        id="imperial" 
                                                        name="units" 
                                                        value="imperial"
                                                        checked={data.units === 'imperial'}
                                                        onChange={(e) => updateData('units', e.target.value)}
                                                        className="text-white"
                                                    />
                                                    <Label htmlFor="imperial" className="text-white">Imperial</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <input 
                                                        type="radio" 
                                                        id="metric" 
                                                        name="units" 
                                                        value="metric"
                                                        checked={data.units === 'metric'}
                                                        onChange={(e) => updateData('units', e.target.value)}
                                                        className="text-white"
                                                    />
                                                    <Label htmlFor="metric" className="text-white">Metric</Label>
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
                                                        id="male" 
                                                        name="gender" 
                                                        value="male"
                                                        checked={data.gender === 'male'}
                                                        onChange={(e) => updateData('gender', e.target.value)}
                                                        className="text-white"
                                                    />
                                                    <Label htmlFor="male" className="text-white">Male</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <input 
                                                        type="radio" 
                                                        id="female" 
                                                        name="gender" 
                                                        value="female"
                                                        checked={data.gender === 'female'}
                                                        onChange={(e) => updateData('gender', e.target.value)}
                                                        className="text-white"
                                                    />
                                                    <Label htmlFor="female" className="text-white">Female</Label>
                                                </div>
                                            </div>
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

                                        {/* Goal Weight */}
                                        <div className="space-y-2">
                                            <Label className="text-white">Goal Weight</Label>
                                            <div className="flex items-center gap-2">
                                                <Input
                                                    type="number"
                                                    value={data.goalWeight}
                                                    onChange={(e) => updateData('goalWeight', parseInt(e.target.value) || 0)}
                                                    className="bg-black/20 border-white/20 text-white"
                                                    placeholder="0"
                                                />
                                                <span className="text-white text-sm">lbs</span>
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

                                        {/* Activity Level */}
                                        <div className="space-y-2">
                                            <Label className="text-white">Activity Level</Label>
                                            <Select value={data.activity} onValueChange={(value) => updateData('activity', value)}>
                                                <SelectTrigger className="bg-black/20 border-white/20 text-white">
                                                    <SelectValue placeholder="Select activity level" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="sedentary">Sedentary (little/no exercise)</SelectItem>
                                                    <SelectItem value="light">Light (light exercise 1-3 days/week)</SelectItem>
                                                    <SelectItem value="moderate">Moderate (moderate exercise 3-5 days/week)</SelectItem>
                                                    <SelectItem value="heavy">Heavy (hard exercise 6-7 days/week)</SelectItem>
                                                    <SelectItem value="extreme">Extreme (very hard exercise, physical job)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        {/* Workouts per week */}
                                        <div className="space-y-2">
                                            <Label className="text-white">Workouts per week</Label>
                                            <div className="flex items-center gap-2">
                                                <Input
                                                    type="number"
                                                    value={data.workoutsPerWeek}
                                                    onChange={(e) => updateData('workoutsPerWeek', parseInt(e.target.value) || 0)}
                                                    className="bg-black/20 border-white/20 text-white"
                                                    placeholder="0"
                                                />
                                                <span className="text-white text-sm">days</span>
                                            </div>
                                        </div>

                                        {/* Goal */}
                                        <div className="space-y-2">
                                            <Label className="text-white">Your Goal</Label>
                                            <Select value={data.goal} onValueChange={(value) => updateData('goal', value)}>
                                                <SelectTrigger className="bg-black/20 border-white/20 text-white">
                                                    <SelectValue placeholder="Select your goal" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="lose">Lose Weight</SelectItem>
                                                    <SelectItem value="maintain">Maintain Weight</SelectItem>
                                                    <SelectItem value="gain">Gain Weight</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        {/* Body Fat */}
                                        <div className="space-y-2">
                                            <Label className="text-white">Body Fat</Label>
                                            <div className="flex items-center gap-2">
                                                <Input
                                                    type="number"
                                                    value={data.bodyfat}
                                                    onChange={(e) => updateData('bodyfat', parseInt(e.target.value) || 0)}
                                                    className="bg-black/20 border-white/20 text-white"
                                                    placeholder="0"
                                                />
                                                <span className="text-white text-sm">%</span>
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

                                        {/* BMR Formula */}
                                        <div className="space-y-2">
                                            <Label className="text-white">Basal Metabolic Rate Formula</Label>
                                            <Select value={data.bmrFormula} onValueChange={(value) => updateData('bmrFormula', value)}>
                                                <SelectTrigger className="bg-black/20 border-white/20 text-white">
                                                    <SelectValue placeholder="Select BMR formula" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="mifflin">Mifflin-St Jeor formula</SelectItem>
                                                    <SelectItem value="harris">Harris-Benedict formula</SelectItem>
                                                    <SelectItem value="katch">Katch-McArdle formula</SelectItem>
                                                    <SelectItem value="cunningham">Cunningham formula</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <Button 
                                            onClick={calculateAll}
                                            className="w-full bg-white/10 hover:bg-white/20 transition-all duration-300 group text-lg py-3"
                                        >
                                            <Calculator className="mr-2 h-5 w-5" />
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
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                                                <Label className="text-white/80 text-sm">BMR</Label>
                                                <p className="text-white text-2xl font-bold">{results.bmr || '--'}</p>
                                                <p className="text-gray-400 text-xs">calories/day</p>
                                            </div>
                                            <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                                                <Label className="text-white/80 text-sm">TDEE</Label>
                                                <p className="text-white text-2xl font-bold">{results.tdee || '--'}</p>
                                                <p className="text-gray-400 text-xs">calories/day</p>
                                            </div>
                                            <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                                                <Label className="text-white/80 text-sm">LBM</Label>
                                                <p className="text-white text-2xl font-bold">{results.lbm || '--'}</p>
                                                <p className="text-gray-400 text-xs">lbs</p>
                                            </div>
                                            <div className="bg-yellow-700/20 rounded-lg p-4 border border-yellow-700/30">
                                                <Label className="text-yellow-400 text-sm">FBM</Label>
                                                <p className="text-white text-2xl font-bold">{results.fbm || '--'}</p>
                                                <p className="text-gray-400 text-xs">lbs</p>
                                            </div>
                                            <div className="bg-purple-700/20 rounded-lg p-4 border border-purple-700/30">
                                                <Label className="text-purple-400 text-sm">BMI</Label>
                                                <p className="text-white text-2xl font-bold">{results.bmi || '--'}</p>
                                                <p className="text-gray-400 text-xs">kg/m²</p>
                                            </div>
                                            <div className="bg-indigo-700/20 rounded-lg p-4 border border-indigo-700/30">
                                                <Label className="text-indigo-400 text-sm">Waist to Height</Label>
                                                <p className="text-white text-2xl font-bold">{results.waistToHeight || '--'}</p>
                                                <p className="text-gray-400 text-xs">ratio</p>
                                            </div>
                                            <div className="bg-pink-700/20 rounded-lg p-4 border border-pink-700/30">
                                                <Label className="text-pink-400 text-sm">MFM</Label>
                                                <p className="text-white text-2xl font-bold">{results.mfm || '--'}</p>
                                                <p className="text-gray-400 text-xs">lbs</p>
                                            </div>
                                            <div className="bg-orange-700/20 rounded-lg p-4 border border-orange-700/30">
                                                <Label className="text-orange-400 text-sm">MRDC</Label>
                                                <p className="text-white text-2xl font-bold">{results.mrdc || '--'}</p>
                                                <p className="text-gray-400 text-xs">calories</p>
                                            </div>
                                            <div className="bg-teal-700/20 rounded-lg p-4 border border-teal-700/30">
                                                <Label className="text-teal-400 text-sm">Workout Day Calories</Label>
                                                <p className="text-white text-2xl font-bold">{results.workoutDayCalories || '--'}</p>
                                                <p className="text-gray-400 text-xs">calories</p>
                                            </div>
                                            <div className="bg-cyan-700/20 rounded-lg p-4 border border-cyan-700/30">
                                                <Label className="text-cyan-400 text-sm">Rest Day Calories</Label>
                                                <p className="text-white text-2xl font-bold">{results.restDayCalories || '--'}</p>
                                                <p className="text-gray-400 text-xs">calories</p>
                                            </div>
                                            <div className="bg-lime-700/20 rounded-lg p-4 border border-lime-700/30">
                                                <Label className="text-lime-400 text-sm">Weeks To Goal</Label>
                                                <p className="text-white text-2xl font-bold">{results.weeksToGoal || '--'}</p>
                                                <p className="text-gray-400 text-xs">weeks</p>
                                            </div>
                                            <div className="bg-amber-700/20 rounded-lg p-4 border border-amber-700/30">
                                                <Label className="text-amber-400 text-sm">Final Weight</Label>
                                                <p className="text-white text-2xl font-bold">{results.finalWeight || '--'}</p>
                                                <p className="text-gray-400 text-xs">lbs</p>
                                            </div>
                                        </div>
                                        
                                        {results.weightClass && (
                                            <div className="bg-red-700/20 rounded-lg p-4 border border-red-700/30 mt-4">
                                                <Label className="text-red-400 text-sm">Weight Class</Label>
                                                <p className="text-white text-xl font-bold">{results.weightClass}</p>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </section>

                    {/* Body Fat Calculator */}
                    <section className="py-16">
                        <div className="container mx-auto px-6">
                            <div className="grid lg:grid-cols-2 gap-8">
                                {/* Input Section */}
                                <Card className="bg-black/40 backdrop-blur-md border border-white/10">
                                    <CardHeader>
                                        <CardTitle className="text-white text-2xl">Body Fat Calculator</CardTitle>
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
                                                        checked={bodyFatData.units === 'imperial'}
                                                        onChange={(e) => updateBodyFatData('units', e.target.value)}
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
                                                        checked={bodyFatData.units === 'metric'}
                                                        onChange={(e) => updateBodyFatData('units', e.target.value)}
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
                                                        checked={bodyFatData.gender === 'male'}
                                                        onChange={(e) => updateBodyFatData('gender', e.target.value)}
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
                                                        checked={bodyFatData.gender === 'female'}
                                                        onChange={(e) => updateBodyFatData('gender', e.target.value)}
                                                        className="text-red-600"
                                                    />
                                                    <Label htmlFor="female-bf" className="text-white">Female</Label>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Height */}
                                        <div className="space-y-2">
                                            <Label className="text-white">Height</Label>
                                            <div className="flex gap-2">
                                                <div className="flex items-center gap-2">
                                                    <Input
                                                        type="number"
                                                        value={bodyFatData.heightFt}
                                                        onChange={(e) => updateBodyFatData('heightFt', parseInt(e.target.value) || 0)}
                                                        className="bg-black/20 border-white/20 text-white w-20"
                                                        placeholder="0"
                                                    />
                                                    <span className="text-white text-sm">ft</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Input
                                                        type="number"
                                                        value={bodyFatData.heightIn}
                                                        onChange={(e) => updateBodyFatData('heightIn', parseInt(e.target.value) || 0)}
                                                        className="bg-black/20 border-white/20 text-white w-20"
                                                        placeholder="0"
                                                    />
                                                    <span className="text-white text-sm">in</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Weight */}
                                        <div className="space-y-2">
                                            <Label className="text-white">Weight</Label>
                                            <div className="flex items-center gap-2">
                                                <Input
                                                    type="number"
                                                    value={bodyFatData.weight}
                                                    onChange={(e) => updateBodyFatData('weight', parseInt(e.target.value) || 0)}
                                                    className="bg-black/20 border-white/20 text-white"
                                                    placeholder="0"
                                                />
                                                <span className="text-white text-sm">lbs</span>
                                            </div>
                                        </div>

                                        {/* Age */}
                                        <div className="space-y-2">
                                            <Label className="text-white">Age</Label>
                                            <div className="flex items-center gap-2">
                                                <Input
                                                    type="number"
                                                    value={bodyFatData.age}
                                                    onChange={(e) => updateBodyFatData('age', parseInt(e.target.value) || 0)}
                                                    className="bg-black/20 border-white/20 text-white"
                                                    placeholder="0"
                                                />
                                                <span className="text-white text-sm">yrs</span>
                                            </div>
                                        </div>

                                        {/* Waist */}
                                        <div className="space-y-2">
                                            <Label className="text-white">Waist</Label>
                                            <div className="flex items-center gap-2">
                                                <Input
                                                    type="number"
                                                    value={bodyFatData.waist}
                                                    onChange={(e) => updateBodyFatData('waist', parseInt(e.target.value) || 0)}
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
                                                    value={bodyFatData.neck}
                                                    onChange={(e) => updateBodyFatData('neck', parseInt(e.target.value) || 0)}
                                                    className="bg-black/20 border-white/20 text-white"
                                                    placeholder="0"
                                                />
                                                <span className="text-white text-sm">in</span>
                                            </div>
                                        </div>

                                        {/* Hip (for females) */}
                                        {bodyFatData.gender === 'female' && (
                                            <div className="space-y-2">
                                                <Label className="text-white">Hip</Label>
                                                <div className="flex items-center gap-2">
                                                    <Input
                                                        type="number"
                                                        value={bodyFatData.hip}
                                                        onChange={(e) => updateBodyFatData('hip', parseInt(e.target.value) || 0)}
                                                        className="bg-black/20 border-white/20 text-white"
                                                        placeholder="0"
                                                    />
                                                    <span className="text-white text-sm">in</span>
                                                </div>
                                            </div>
                                        )}

                                        {/* Body Fat Calculation Method */}
                                        <div className="space-y-2">
                                            <Label className="text-white">Select Method</Label>
                                            <Select value={bodyFatData.method} onValueChange={(value) => updateBodyFatData('method', value)}>
                                                <SelectTrigger className="bg-black/20 border-white/20 text-white">
                                                    <SelectValue placeholder="Your Tool" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="navy">Navy Body Fat Formula</SelectItem>
                                                    <SelectItem value="bmi">BMI Body Fat Formula</SelectItem>
                                                    <SelectItem value="ymca">YMCA Body Fat Formula</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <Button 
                                            onClick={calculateBodyFat}
                                            className="w-full bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 transition-all duration-300 group text-lg py-3"
                                        >
                                            <Calculator className="mr-2 h-5 w-5" />
                                            <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                Calculate Body Fat
                                            </span>
                                        </Button>
                                    </CardContent>
                                </Card>

                                {/* Results Section */}
                                <Card className="bg-black/40 backdrop-blur-md border border-white/10">
                                    <CardHeader>
                                        <CardTitle className="text-white text-2xl">Results</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-red-700/20 rounded-lg p-4 border border-red-700/30">
                                                <Label className="text-red-400 text-sm">Body Fat %</Label>
                                                <p className="text-white text-2xl font-bold">{bodyFatResults.bodyfat || '--'}</p>
                                                <p className="text-gray-400 text-xs">%</p>
                                            </div>
                                            <div className="bg-green-700/20 rounded-lg p-4 border border-green-700/30">
                                                <Label className="text-green-400 text-sm">LBM</Label>
                                                <p className="text-white text-2xl font-bold">{bodyFatResults.lbm || '--'}</p>
                                                <p className="text-gray-400 text-xs">lbs</p>
                                            </div>
                                            <div className="bg-yellow-700/20 rounded-lg p-4 border border-yellow-700/30">
                                                <Label className="text-yellow-400 text-sm">FBM</Label>
                                                <p className="text-white text-2xl font-bold">{bodyFatResults.fbm || '--'}</p>
                                                <p className="text-gray-400 text-xs">lbs</p>
                                            </div>
                                            <div className="bg-purple-700/20 rounded-lg p-4 border border-purple-700/30">
                                                <Label className="text-purple-400 text-sm">Classification</Label>
                                                <p className="text-white text-2xl font-bold">{bodyFatResults.classification || '--'}</p>
                                            </div>
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
