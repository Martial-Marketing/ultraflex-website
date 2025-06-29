import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import AnimatedBackground from '@/components/AnimatedBackground';

interface User {
    id: number;
    name: string;
    email: string;
    memberSince: string;
    membershipType: string;
    profileImage?: string;
}

interface Recipe {
    id: number;
    title: string;
    description: string;
    image: string;
    prepTime: string;
    cookTime: string;
    servings: number;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    category: string;
    difficulty: string;
    ingredients: string[];
    instructions: string[];
}

interface NutritionIndexProps {
    auth: {
        user: User;
    };
    recipes: Recipe[];
}

export default function NutritionIndex({ auth, recipes }: NutritionIndexProps) {
    const user = auth.user;

    const nutritionCategories = [
        { name: 'Muscle Gain', color: 'bg-gradient-to-r from-red-700 to-red-800', count: 15, description: 'High protein meals' },
        { name: 'Weight Loss', color: 'bg-gradient-to-r from-green-700 to-green-800', count: 12, description: 'Low calorie options' },
        { name: 'Pre-Workout', color: 'bg-gradient-to-r from-orange-700 to-orange-800', count: 8, description: 'Energy boosting foods' },
        { name: 'Post-Workout', color: 'bg-gradient-to-r from-blue-700 to-blue-800', count: 10, description: 'Recovery nutrition' },
        { name: 'Healthy Snacks', color: 'bg-gradient-to-r from-purple-700 to-purple-800', count: 20, description: 'Quick healthy bites' },
        { name: 'Meal Prep', color: 'bg-gradient-to-r from-teal-700 to-teal-800', count: 14, description: 'Batch cooking ideas' },
    ];

    const featuredRecipes = recipes?.slice(0, 6) || [
        {
            id: 1,
            title: 'Protein Power Bowl',
            description: 'A nutrient-dense bowl packed with lean protein and fresh vegetables',
            image: '/Images/nutrition1.jpg',
            prepTime: '15 min',
            cookTime: '10 min',
            servings: 2,
            calories: 450,
            protein: 35,
            carbs: 40,
            fat: 18,
            category: 'Muscle Gain',
            difficulty: 'Easy',
            ingredients: ['Grilled chicken breast', 'Quinoa', 'Black beans', 'Avocado', 'Cherry tomatoes'],
            instructions: ['Cook quinoa according to package instructions', 'Grill chicken breast', 'Assemble bowl with ingredients']
        },
        {
            id: 2,
            title: 'Green Smoothie Energy',
            description: 'Refreshing smoothie perfect for pre-workout fuel',
            image: '/Images/nutrition2.jpg',
            prepTime: '5 min',
            cookTime: '0 min',
            servings: 1,
            calories: 250,
            protein: 15,
            carbs: 35,
            fat: 8,
            category: 'Pre-Workout',
            difficulty: 'Easy',
            ingredients: ['Spinach', 'Banana', 'Protein powder', 'Almond milk', 'Chia seeds'],
            instructions: ['Blend all ingredients until smooth', 'Add ice if desired', 'Serve immediately']
        },
        {
            id: 3,
            title: 'Salmon & Sweet Potato',
            description: 'Perfectly balanced meal with omega-3s and complex carbs',
            image: '/Images/nutrition3.jpg',
            prepTime: '10 min',
            cookTime: '25 min',
            servings: 2,
            calories: 520,
            protein: 40,
            carbs: 45,
            fat: 22,
            category: 'Post-Workout',
            difficulty: 'Medium',
            ingredients: ['Salmon fillet', 'Sweet potato', 'Broccoli', 'Olive oil', 'Herbs'],
            instructions: ['Bake sweet potato at 400°F', 'Pan-sear salmon', 'Steam broccoli', 'Serve together']
        },
        {
            id: 4,
            title: 'Greek Yogurt Parfait',
            description: 'High-protein snack with probiotics and antioxidants',
            image: '/Images/nutrition4.jpg',
            prepTime: '5 min',
            cookTime: '0 min',
            servings: 1,
            calories: 320,
            protein: 25,
            carbs: 30,
            fat: 12,
            category: 'Healthy Snacks',
            difficulty: 'Easy',
            ingredients: ['Greek yogurt', 'Mixed berries', 'Granola', 'Honey', 'Almonds'],
            instructions: ['Layer yogurt in glass', 'Add berries and granola', 'Drizzle with honey', 'Top with almonds']
        },
        {
            id: 5,
            title: 'Chicken Meal Prep',
            description: 'Weekly meal prep with balanced macronutrients',
            image: '/Images/nutrition5.jpg',
            prepTime: '20 min',
            cookTime: '45 min',
            servings: 5,
            calories: 400,
            protein: 35,
            carbs: 35,
            fat: 15,
            category: 'Meal Prep',
            difficulty: 'Medium',
            ingredients: ['Chicken thighs', 'Brown rice', 'Mixed vegetables', 'Seasonings'],
            instructions: ['Season and bake chicken', 'Cook rice in bulk', 'Roast vegetables', 'Portion into containers']
        },
        {
            id: 6,
            title: 'Veggie Buddha Bowl',
            description: 'Plant-based bowl loaded with nutrients and fiber',
            image: '/Images/nutrition6.jpg',
            prepTime: '15 min',
            cookTime: '20 min',
            servings: 2,
            calories: 380,
            protein: 18,
            carbs: 55,
            fat: 14,
            category: 'Weight Loss',
            difficulty: 'Easy',
            ingredients: ['Quinoa', 'Chickpeas', 'Kale', 'Tahini', 'Colorful vegetables'],
            instructions: ['Cook quinoa and chickpeas', 'Massage kale with dressing', 'Arrange in bowl', 'Drizzle with tahini']
        }
    ];

    const nutritionStats = [
        { label: 'Recipes Tried', value: '28', color: 'bg-red-700/20', textColor: 'text-red-700' },
        { label: 'Meal Plans', value: '6', color: 'bg-red-700/20', textColor: 'text-red-400' },
        { label: 'Avg Calories/Day', value: '2,100', color: 'bg-purple-700/20', textColor: 'text-purple-400' },
        { label: 'Protein Goal', value: '85%', color: 'bg-yellow-700/20', textColor: 'text-yellow-400' },
    ];

    return (
        <AppLayout auth={auth}>
            <Head title="Nutrition - UltraFlex Members">
                <meta name="description" content="Access exclusive nutrition plans and healthy recipes designed for UltraFlex members." />
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
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-6">
                                    <div className="w-16 h-16 rounded-full overflow-hidden bg-red-700/20 backdrop-blur-sm flex items-center justify-center border border-red-700/30">
                                        <span className="text-white text-xl font-bold">N</span>
                                    </div>
                                    <div className="text-white">
                                        <h1 className="text-4xl font-bold mb-2">Member Nutrition</h1>
                                        <p className="text-xl text-gray-200">
                                            Healthy recipes and meal plans for {user.name}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <Link href="/members">
                                        <Button variant="outline" className="border-white/50 bg-white/90 text-black hover:text-red-700 hover:bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group backdrop-blur-sm">
                                            <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                Back to Hub
                                            </span>
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Nutrition Categories */}
                    <section className="py-16">
                        <div className="container mx-auto px-6">
                            <h2 className="text-3xl font-bold text-white mb-8">Nutrition Categories</h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {nutritionCategories.map((category, index) => (
                                    <Card key={index} className="hover:shadow-2xl hover:shadow-red-700/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/30 group">
                                        <CardContent className="p-6 text-center">
                                            <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg transform group-hover:scale-110 transition-all duration-300`}>
                                                <span className="text-white text-xl font-bold">
                                                    {category.name.charAt(0)}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-red-700 transition-colors duration-300">
                                                {category.name}
                                            </h3>
                                            <p className="text-gray-300 text-sm mb-2">
                                                {category.description}
                                            </p>
                                            <p className="text-gray-400 text-xs mb-4">
                                                {category.count} recipes available
                                            </p>
                                            <Button className="w-full bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 transition-all duration-300 group">
                                                <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                    Browse {category.name}
                                                </span>
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Featured Recipes */}
                    <section className="py-16 bg-black/20 backdrop-blur-md">
                        <div className="container mx-auto px-6">
                            <h2 className="text-3xl font-bold text-white mb-8">Featured Recipes</h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {featuredRecipes.map((recipe) => (
                                    <Card key={recipe.id} className="overflow-hidden hover:shadow-2xl hover:shadow-red-700/10 transition-all duration-300 bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/30 group">
                                        <div className="h-48 bg-gray-800 relative overflow-hidden">
                                            <img 
                                                src={recipe.image} 
                                                alt={recipe.title}
                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            
                                            {/* Prep time badge */}
                                            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1 border border-white/10">
                                                <span className="text-white text-sm font-medium">{recipe.prepTime}</span>
                                            </div>

                                            {/* Difficulty badge */}
                                            <div className="absolute top-3 left-3">
                                                <span className={`px-3 py-1 rounded-full text-xs backdrop-blur-sm border ${
                                                    recipe.difficulty === 'Easy' ? 'bg-green-700/20 text-green-400 border-green-700/30' :
                                                    recipe.difficulty === 'Medium' ? 'bg-yellow-700/20 text-yellow-400 border-yellow-700/30' :
                                                    'bg-red-700/20 text-red-700 border-red-700/30'
                                                }`}>
                                                    {recipe.difficulty}
                                                </span>
                                            </div>

                                            {/* View overlay */}
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <Button className="bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 border border-red-700/20 backdrop-blur-sm">
                                                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                        View Recipe
                                                    </span>
                                                </Button>
                                            </div>
                                        </div>
                                        <CardContent className="p-6 bg-black/20 backdrop-blur-sm">
                                            <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-red-700 transition-colors duration-300">
                                                {recipe.title}
                                            </h3>
                                            <p className="text-gray-300 text-sm mb-4">
                                                {recipe.description}
                                            </p>
                                            
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between text-sm text-gray-300">
                                                    <span>Servings: <span className="text-white">{recipe.servings}</span></span>
                                                    <span>Calories: <span className="text-red-400">{recipe.calories}</span></span>
                                                </div>
                                                
                                                <div className="grid grid-cols-3 gap-2 text-sm">
                                                    <div className="text-center p-2 bg-red-700/10 rounded border border-red-700/30">
                                                        <span className="text-red-400 font-semibold">{recipe.protein}g</span>
                                                        <p className="text-gray-400 text-xs">Protein</p>
                                                    </div>
                                                    <div className="text-center p-2 bg-blue-700/10 rounded border border-blue-700/30">
                                                        <span className="text-blue-400 font-semibold">{recipe.carbs}g</span>
                                                        <p className="text-gray-400 text-xs">Carbs</p>
                                                    </div>
                                                    <div className="text-center p-2 bg-yellow-700/10 rounded border border-yellow-700/30">
                                                        <span className="text-yellow-400 font-semibold">{recipe.fat}g</span>
                                                        <p className="text-gray-400 text-xs">Fat</p>
                                                    </div>
                                                </div>
                                                
                                                <div className="text-sm text-gray-300">
                                                    <span>Category: </span>
                                                    <span className="text-white">{recipe.category}</span>
                                                </div>
                                            </div>
                                            
                                            <div className="mt-4 pt-4 border-t border-white/10">
                                                <Button className="w-full bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 transition-all duration-300 group">
                                                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                        Get Recipe
                                                    </span>
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Nutrition Stats */}
                    <section className="py-16">
                        <div className="container mx-auto px-6">
                            <h2 className="text-3xl font-bold text-white text-center mb-12">Your Nutrition Journey</h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {nutritionStats.map((stat, index) => (
                                    <Card key={index} className="p-6 text-center bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-700/30 transition-all duration-300 group">
                                        <div className={`w-16 h-16 ${stat.color} backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-red-700/30 group-hover:scale-110 transition-transform duration-300`}>
                                            <span className={`${stat.textColor} text-xl font-bold`}>
                                                {stat.label.charAt(0)}
                                            </span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                                        <p className="text-gray-300 text-sm">{stat.label}</p>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Meal Planning CTA */}
                    <section className="py-16 bg-black/20 backdrop-blur-md">
                        <div className="container mx-auto px-6">
                            <div className="max-w-4xl mx-auto text-center">
                                <h2 className="text-3xl font-bold text-white mb-6">Ready to Plan Your Meals?</h2>
                                <p className="text-xl text-gray-300 mb-8">
                                    Get personalized meal plans designed specifically for your fitness goals
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button className="bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 transition-all duration-300 px-8 py-3 group">
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                                            Create Meal Plan
                                        </span>
                                    </Button>
                                    <Button variant="outline" className="border-white/50 bg-white/90 text-black hover:text-red-700 hover:bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group backdrop-blur-sm px-8 py-3">
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                                            Browse All Recipes
                                        </span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </AppLayout>
    );
}