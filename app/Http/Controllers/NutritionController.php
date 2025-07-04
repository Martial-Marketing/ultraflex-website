<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class NutritionController extends Controller
{
    public function index()
    {
        // Real nutrition plans based on UltraFlex programs
        $nutritionPlans = [
            [
                'id' => 1,
                'title' => 'DIET PLANNER',
                'description' => 'Personalized meal planning system designed to meet your specific fitness goals and dietary preferences',
                'image' => 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&h=400&fit=crop&crop=center',
                'difficulty' => 'Beginner',
                'type' => 'Planning',
                'duration' => 'Ongoing',
                'features' => ['Custom Meal Plans', 'Grocery Lists', 'Macro Tracking', 'Recipe Database'],
                'externalUrl' => 'https://dietplannerapp.com/?_ga=2.75428690.1192713700.1751560052-465528838.1750903171'
            ],
            [
                'id' => 2,
                'title' => 'CALCULATOR',
                'description' => 'Advanced nutrition calculator to determine your daily caloric needs and optimal macro distribution',
                'image' => 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=400&fit=crop&crop=center',
                'difficulty' => 'Beginner',
                'type' => 'Tool',
                'duration' => 'Instant',
                'features' => ['BMR Calculator', 'TDEE Calculator', 'Macro Calculator', 'Goal Setting']
            ],
            [
                'id' => 3,
                'title' => 'BULKING',
                'description' => 'Comprehensive nutrition plan focused on lean muscle gain and strength development',
                'image' => '/Images/nutritionn/Bulking-1-768x432.jpg',
                'difficulty' => 'Intermediate',
                'type' => 'Muscle Gain',
                'duration' => '12-16 weeks',
                'features' => ['High Calorie Meals', 'Protein Focus', 'Pre/Post Workout', 'Mass Gaining']
            ],
            [
                'id' => 4,
                'title' => 'CUTTING',
                'description' => 'Strategic fat loss nutrition plan designed to preserve muscle while achieving a lean physique',
                'image' => 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500&h=400&fit=crop&crop=center',
                'difficulty' => 'Advanced',
                'type' => 'Fat Loss',
                'duration' => '8-12 weeks',
                'features' => ['Caloric Deficit', 'Muscle Preservation', 'Carb Cycling', 'Fat Burning']
            ],
            [
                'id' => 5,
                'title' => 'SUPPLEMENTS',
                'description' => 'Expert guidance on supplement selection and timing to optimize your fitness results',
                'image' => 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=400&fit=crop&crop=center',
                'difficulty' => 'Intermediate',
                'type' => 'Enhancement',
                'duration' => 'Ongoing',
                'features' => ['Supplement Stack', 'Timing Guide', 'Quality Brands', 'Goal-Specific']
            ],
            [
                'id' => 6,
                'title' => 'IMMUNE BOOSTER',
                'description' => 'Nutrition plan focused on strengthening your immune system and overall health',
                'image' => 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=500&h=400&fit=crop&crop=center',
                'difficulty' => 'Beginner',
                'type' => 'Health',
                'duration' => '4-6 weeks',
                'features' => ['Antioxidant Rich', 'Vitamin Focus', 'Anti-Inflammatory', 'Recovery Support']
            ]
        ];

        // Sample recipe data for reference
        $recipes = [
            [
                'id' => 1,
                'title' => 'Protein Power Bowl',
                'description' => 'A nutrient-dense bowl packed with lean protein and fresh vegetables',
                'image' => 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&h=400&fit=crop&crop=center',
                'prepTime' => '15 min',
                'cookTime' => '10 min',
                'servings' => 2,
                'calories' => 450,
                'protein' => 35,
                'carbs' => 40,
                'fat' => 18,
                'category' => 'Muscle Gain',
                'difficulty' => 'Easy',
                'ingredients' => ['Grilled chicken breast', 'Quinoa', 'Black beans', 'Avocado', 'Cherry tomatoes'],
                'instructions' => ['Cook quinoa according to package instructions', 'Grill chicken breast', 'Assemble bowl with ingredients']
            ],
            [
                'id' => 2,
                'title' => 'Green Smoothie Energy',
                'description' => 'Refreshing smoothie perfect for pre-workout fuel',
                'image' => 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=500&h=400&fit=crop&crop=center',
                'prepTime' => '5 min',
                'cookTime' => '0 min',
                'servings' => 1,
                'calories' => 250,
                'protein' => 15,
                'carbs' => 35,
                'fat' => 8,
                'category' => 'Pre-Workout',
                'difficulty' => 'Easy',
                'ingredients' => ['Spinach', 'Banana', 'Protein powder', 'Almond milk', 'Chia seeds'],
                'instructions' => ['Blend all ingredients until smooth', 'Add ice if desired', 'Serve immediately']
            ],
            [
                'id' => 3,
                'title' => 'Salmon & Sweet Potato',
                'description' => 'Perfectly balanced meal with omega-3s and complex carbs',
                'image' => 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&h=400&fit=crop&crop=center',
                'prepTime' => '10 min',
                'cookTime' => '25 min',
                'servings' => 2,
                'calories' => 520,
                'protein' => 40,
                'carbs' => 45,
                'fat' => 22,
                'category' => 'Post-Workout',
                'difficulty' => 'Medium',
                'ingredients' => ['Salmon fillet', 'Sweet potato', 'Broccoli', 'Olive oil', 'Herbs'],
                'instructions' => ['Bake sweet potato at 400°F', 'Pan-sear salmon', 'Steam broccoli', 'Serve together']
            ],
            [
                'id' => 4,
                'title' => 'Greek Yogurt Parfait',
                'description' => 'High-protein snack with probiotics and antioxidants',
                'image' => 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500&h=400&fit=crop&crop=center',
                'prepTime' => '5 min',
                'cookTime' => '0 min',
                'servings' => 1,
                'calories' => 320,
                'protein' => 25,
                'carbs' => 30,
                'fat' => 12,
                'category' => 'Healthy Snacks',
                'difficulty' => 'Easy',
                'ingredients' => ['Greek yogurt', 'Mixed berries', 'Granola', 'Honey', 'Almonds'],
                'instructions' => ['Layer yogurt in glass', 'Add berries and granola', 'Drizzle with honey', 'Top with almonds']
            ],
            [
                'id' => 5,
                'title' => 'Chicken Meal Prep',
                'description' => 'Weekly meal prep with balanced macronutrients',
                'image' => 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=500&h=400&fit=crop&crop=center',
                'prepTime' => '20 min',
                'cookTime' => '45 min',
                'servings' => 5,
                'calories' => 400,
                'protein' => 35,
                'carbs' => 35,
                'fat' => 15,
                'category' => 'Meal Prep',
                'difficulty' => 'Medium',
                'ingredients' => ['Chicken thighs', 'Brown rice', 'Mixed vegetables', 'Seasonings'],
                'instructions' => ['Season and bake chicken', 'Cook rice in bulk', 'Roast vegetables', 'Portion into containers']
            ],
            [
                'id' => 6,
                'title' => 'Veggie Buddha Bowl',
                'description' => 'Plant-based bowl loaded with nutrients and fiber',
                'image' => 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500&h=400&fit=crop&crop=center',
                'prepTime' => '15 min',
                'cookTime' => '20 min',
                'servings' => 2,
                'calories' => 380,
                'protein' => 18,
                'carbs' => 55,
                'fat' => 14,
                'category' => 'Weight Loss',
                'difficulty' => 'Easy',
                'ingredients' => ['Quinoa', 'Chickpeas', 'Kale', 'Tahini', 'Colorful vegetables'],
                'instructions' => ['Cook quinoa and chickpeas', 'Massage kale with dressing', 'Arrange in bowl', 'Drizzle with tahini']
            ]
        ];

        return Inertia::render('Members/Nutrition-Index', [
            'nutritionPlans' => $nutritionPlans,
            'recipes' => $recipes,
        ]);
    }

    public function show($id)
    {
        // Handle special case for CALCULATOR - redirect to calculator hub
        if ((int)$id === 2) {
            return redirect()->route('members.nutrition.calculator');
        }

        // Real nutrition plans data for details view
        $nutritionPlans = [
            [
                'id' => 1,
                'title' => 'DIET PLANNER',
                'description' => 'Personalized meal planning system designed to meet your specific fitness goals and dietary preferences',
                'image' => 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&h=400&fit=crop&crop=center',
                'difficulty' => 'Beginner',
                'type' => 'Planning',
                'duration' => 'Ongoing',
                'features' => ['Custom Meal Plans', 'Grocery Lists', 'Macro Tracking', 'Recipe Database'],
                'externalUrl' => 'https://dietplannerapp.com/?_ga=2.75428690.1192713700.1751560052-465528838.1750903171',
                'detailedDescription' => 'Our comprehensive Diet Planner takes the guesswork out of meal planning. This intelligent system creates personalized meal plans based on your specific goals, dietary preferences, allergies, and lifestyle. Whether you\'re looking to lose weight, gain muscle, or maintain your current physique, our diet planner provides the roadmap to success.

The system considers your daily schedule, cooking preferences, and budget constraints to create realistic and sustainable meal plans. Each plan includes detailed nutritional information, shopping lists, and meal prep instructions to make your nutrition journey as smooth as possible.

With our extensive recipe database and smart substitution features, you\'ll never get bored with your meals. The planner adapts to your progress and feedback, continuously optimizing your nutrition for better results.'
            ],
            [
                'id' => 2,
                'title' => 'CALCULATOR',
                'description' => 'Advanced nutrition calculator to determine your daily caloric needs and optimal macro distribution',
                'image' => 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=400&fit=crop&crop=center',
                'difficulty' => 'Beginner',
                'type' => 'Tool',
                'duration' => 'Instant',
                'features' => ['BMR Calculator', 'TDEE Calculator', 'Macro Calculator', 'Goal Setting'],
                'detailedDescription' => 'Our advanced nutrition calculator suite provides precise calculations for all your nutritional needs. Using scientifically-backed formulas, we determine your Basal Metabolic Rate (BMR), Total Daily Energy Expenditure (TDEE), and optimal macronutrient distribution.

The calculator takes into account your age, gender, height, weight, activity level, and specific goals to provide personalized recommendations. Whether you\'re cutting, bulking, or maintaining, you\'ll get exact calorie and macro targets.

Additional features include body fat percentage calculations, water intake recommendations, and meal timing suggestions. The calculator also provides alternative formulas (Harris-Benedict, Mifflin-St Jeor, Katch-McArdle) for cross-verification and accuracy.'
            ],
            [
                'id' => 3,
                'title' => 'BULKING',
                'description' => 'Comprehensive nutrition plan focused on lean muscle gain and strength development',
                'image' => '/Images/nutritionn/Bulking-1-768x432.jpg',
                'difficulty' => 'Intermediate',
                'type' => 'Muscle Gain',
                'duration' => '12-16 weeks',
                'features' => ['High Calorie Meals', 'Protein Focus', 'Pre/Post Workout', 'Mass Gaining'],
                'detailedDescription' => 'Our comprehensive Bulking nutrition plan is designed for serious muscle gain while minimizing fat accumulation. This plan provides a strategic caloric surplus with optimal macronutrient timing to maximize muscle protein synthesis and support intense training sessions.

**How long is bulking?**

This is difficult to say as everyone is different with how they add on fat or muscle tissue. It is usually 3 – 6 months but it all depends on whether you are doing a lean bulk, so eating whole foods, grains and not going off a structured diet plan too much to be having \'cheat meals\' or drinking alcohol.

The best way to do a bulk is to find out your BMR which determines how many calories someone needs to live (breathe, pump blood around body etc) and then increase calories from there depending on how active you are. You need to slowly increase calories bit by bit so there isn\'t a massive weight gain, as sometimes when this happens it is usually water weight or fat straight away.

**How do I know when to start bulking?**

The best ways to determine whether it is time for a bulk is:
• How long have you been dieting for?
• How high is your body fat percentage?
• What\'s your digestion and energy like?

The reason you need to ask these questions is because our bodies are very clever and usually know when enough is enough. If you have been dieting on low calories and are lean, then your body will respond better to going into a bulk as it has built a better foundation for you to increase calories. Metabolism is quicker and the body is more responsive in how it will use the food for energy.

**Does bulking make you fat?**

Of course, you\'re not going to stay at 10% body fat in a bulk. It\'s just not possible. To build muscle and grow you must push calories high so that you can train harder in the gym, which in turn will help build muscle. With pushing calories high you will become slightly softer than when you are lean, but this doesn\'t mean that you should put on 4-7 stone and become too big. That would defeat the object of a slow weight gain to produce decent muscle tissue and not fat.

**Can you lean bulk?**

The best way to do a bulk is by using whole grain foods along with good quality meat sources like 5% mince, steak, chicken, turkey. This way you will be able to ensure that no extra calories are being added with fat that the body doesn\'t need to consume. You will also see that extra weight isn\'t being piled on as you are not adding sugars that aren\'t beneficial.

**Is bulking necessary to gain muscle?**

The first thing I must emphasize is that without hardcore training, you are not going to get huge. Yes, eating more food will help you in the gym but if you are not training to your fullest potential you may not even be using the extra calories in the right way. The difference in a bulk is that you are consuming more calories which will help with energy, recovery and muscle growth. You are not going to grow muscle eating fewer calories (in deficit) because your body is using those calories for vital organs, not to assist in growth.

**Does my training need to change?**

It doesn\'t have to, but with higher calories you will find that you have better energy levels and recover quicker. This way you can add in different tempos for training or added extras as I like to call them, such as; supersets, muscle rounds, drop sets etc. these extras will add more volume into your training sessions, which will help the muscle grow as it is introduced to different stimuli.

**How do I work out my calories for a bulk?**

First you need to find out your BMR to know what your maintenance calories are.

Your basal metabolic rate is produced through the following basal metabolic rate formula:

Men:
BMR = 88.362 + (13.397 x weight in kg) + (4.799 x height in cm) – (5.677 x age in years)

Women:
BMR = 447.593 + (9.247 x weight in kg) + (3.098 x height in cm) – (4.330 x age in years)

Or you can use the UltraFlex Calories Calculator.

As you have your maintenance calories, now you need to find your calorie requirement to gain lean muscle mass. To gain muscle mass you have to consume more calories than the requirement. Yet eating too many extra calories (more than 500 calories) may be bad for you. Since your body has a limit to the rate of muscle growth, the rest of the excess calories would be stored as fat in your body. Once you establish the number of calories you need for bulking, you can determine your macronutrient ratios.

Macronutrients – carbs, fats, and proteins – are the nutrients that are needed in larger quantities within your diet. Carbs and protein each contain 4 calories per gram, while fat packs 9.

This is a basic recommendation:
• 45 – 60% of your calories from carbs
• 15 – 30% of your calories from fat
• 30 – 35% of your calories from protein

For example, if you decide you need to eat 3,300 calories per day, your diet would contain:
• 371 – 495 grams of carbs
• 55 – 110 grams of fat
• 248 – 289 grams of protein

While you can adjust these based on your dietary needs, the proportion of calories from protein should remain at 30 – 35% to support optimal muscle growth.'
            ],
            [
                'id' => 4,
                'title' => 'CUTTING',
                'description' => 'Strategic fat loss nutrition plan designed to preserve muscle while achieving a lean physique',
                'image' => '/Images/nutritionn/Cutting.jpg',
                'difficulty' => 'Advanced',
                'type' => 'Fat Loss',
                'duration' => '8-12 weeks',
                'features' => ['Caloric Deficit', 'Muscle Preservation', 'Carb Cycling', 'Fat Burning'],
                'detailedDescription' => 'The Cutting nutrition plan is a sophisticated approach to fat loss that preserves hard-earned muscle mass while creating a sustainable caloric deficit. This plan utilizes advanced strategies like carb cycling, intermittent fasting, and strategic refeeds to optimize fat burning.

**When do I get into a cutting phase?**

A cutting phase is when you\'re wanting to start shaping/toning up your body for either; holidays, contest prep, a photoshoot or maybe just for yourself. To determine when you need to start you need to be looking at a few things:

• How much fat you\'re holding – If you have done a bulking stage beforehand and you\'ve held onto fat while growing, or even just not been on a plan before and want to grow muscle, if you have excess fat then it\'s time to cut
• How long you have for the cut – Make sure you have enough time to do a decent cut down because that will determine how the next stage goes in terms of growing muscle or toning up
• How digestion is – Are you getting indigestion/heartburn? This can be a sign that your body isn\'t coping with the amount of food you\'re eating at the moment
• Energy levels – Are you sluggish and tired? This can be because your body is telling you it needs to lose the excess weight

All these aspects can determine if your body is ready for a cut and it\'s really important to listen to your body. It\'s very clever and knows exactly what it needs.

**How do I work out my calorie deficit?**

How to Calculate a Calorie Deficit | 3 Steps

Men: BMR* = 10 x weight (kg) + 6.25 x height (cm) – 5 x age (years) + 5
Women: BMR = 10 x weight (kg) + 6.25 x height (cm) – 5 x age (years) – 161

500 calorie deficit per day = 3,500 calorie deficit per week
700 calorie deficit per day = 4,900 calorie deficit per week
(*BMR: Basal Metabolic Rate)

Or use the UltraFlex Calorie Calculator.

**What foods are best?**

If you\'re wanting to do a clean/lean bulk and put the least amount of fat on as possible, then you want to be eating lean meats (5% mince, steak, fish, chicken, turkey), vegetables and whole grain foods (pasta, rice, potatoes). At the same time you want to be able to enjoy the food that you\'re eating. So, make sure that when you are planning your meals, that you consider the foods you enjoy as when calories get high you want to be able to enjoy eating them still.

**How do I workout my macros?**

Each macronutrient corresponds to a specific calorie amount per gram:

• Carbohydrates have 4 calories per gram
• Fats have 9 calories per gram
• Proteins have 4 calories per gram

Then you need to know the ratio in which you need each macronutrient:

• 45 – 60% carbohydrate
• 20 – 35% fats
• Remainder from protein

Now you know what macros are and how many calories they have. Next, you\'ll need to do some maths. That\'s because your intake ratio is written in percentages, but nutritional information is provided in grams. I\'ll use my macro intake as an example:

First, you need to know how many calories you eat (or want to eat) each day. I eat roughly 2,300 calories per day
Next, determine your ideal ratio. I like to eat about 50% carbs, 25% fat and 25% protein
Then, multiply your total daily calories by your percentages
Finally, divide your calorie amounts by its calorie-per-gram number

Here\'s how I would calculate my calories for each macronutrient:

• Carbs: 2,300 x 0.50 = 1,150. I eat 1,150 calories worth of carbs each day
• Fats: 2,300 x 0.25 = 575. I get 575 calories from dietary fat
• Protein: 2,300 x 0.25 = 575, so I also get 575 calories worth of protein

To calculate the actual gram amounts:

• Carbs (4 calories per gram): 1,150 divided by 4 = 287.5 grams of carbs
• Fat (9 calories per gram): 575 divided by 9 = 63.8 grams of fat
• Protein (4 calories per gram): 575 divided by 4 = 143.75 grams of protein

**How much water do I need to drink?**

The recommended amount of water to drink a day is 2 litres. Personally I think you need more, especially if you\'re training, as you\'re sweating out your fluids and you need to retain that water back. I drink 5-6 litres a day. Basically the more water you drink (you can over drink – so no more than 7-8 litres) the more water you get rid of. Drinking water helps get rid of the toxins in your body and helps hydrate your body so that blood can flow better through the veins and arteries. It also helps to keep your skin clear and helps reduce a bloated stomach.

**Do I need to do cardio?**

This is person dependent. Ideally you need to get yourself a coach or someone who knows about either dieting or contest prep just so you don\'t over do it on cardio, as this can lead to muscle loss, tiredness and mentally struggling. Yet in the same breath, make sure you\'re doing it enough. You need to figure out a timeline of how much you want to lose. If you have dropped your daily calories to start with by 500 and the weight is coming off at 2-3lbs a week, then I\'d say no, cardio isn\'t essential. However, when you get further into the cutting phase your body starts to become stubborn and this is when you need to think about reducing calories or adding in cardio.

On the other hand if you enjoy cardio, then you need to bring it in because you need to be able to enjoy what you\'re doing. At the end of the day you can\'t hate what you do, as you will stop and not carry on.

**Do I need to eat before training?**

YES!!!!!!!!

I\'ve been there, done that, by getting up in the morning and going straight to the gym without eating. No benefit has come from this. If you have ever done this then you burn out quickly on exercises, don\'t get a pump, ache more after training and there\'s no personal bests are there?

Eating before training helps fuel your body. If you eat carbohydrate food before, this is your main energy source. Glucose (sugar) is rushed into the bloodstream giving you energy to train/workout.

**What should I eat before training?**

You need to definitely eat before doing weights (usually giving at least 40-60 mins for the food to digest), this way you\'ll have more energy to actually train. If you are doing cardio on the other hand I wouldn\'t eat beforehand as it will benefit weight loss doing this fasted (so before food).

Here are some examples:

• Bananas – These are a great source of natural sugars, simple carbohydrates, and potassium
• Chicken, Rice & Vegetables – The stereotypical healthy meal: chicken, rice and vegetables. This is a classic pre-workout meal
• Protein Bar – If you\'re on the go and looking for a quick top-up before the gym, then a protein bar is a great option
• Porridge and Oatmeal – This makes the ultimate pre-workout breakfast. This pre-workout food contains complex carbohydrates and is also a great source of the soluble fibre, beta-glucan.

**What shall I eat afterwards?**

After training you need to refuel your body as you\'ve just killed it off (or should have). When you do a workout you\'ve basically torn the muscle fibres, this is why you get DOMS. The best thing to do after training is making sure you fuel your body with carbs and protein, ideally straight away but at least no longer than 2 hours afterwards.

**Does my weight training need to be different?**

This is a bit controversial. If you\'ve got cardio within your cutting phase, ideally you need to be doing this away from your weight sessions as this can impact on how well you lift. Weights during a cutting phase are crucial; this is where you can really start to tone and shape the muscle that you have underneath. Again, ideally you want to be getting a personal trainer/coach to help you design your plan, that\'s their job. They can then give you different techniques to use like drop sets, muscle rounds… I could go on forever. These techniques can help you tighten, tone and shape your muscle during a cutting phase, depending on your level and years of training.

High protein intake is maintained to preserve muscle tissue, while carbohydrates and fats are carefully manipulated to enhance fat oxidation. The plan includes detailed guidance on nutrient timing, meal frequency, and hydration strategies.

Advanced techniques include refeed days to reset hormones, carb cycling to maintain training intensity, and flexible dieting principles to ensure adherence. The plan adapts as you get leaner, adjusting macros and calories to continue progress through metabolic adaptation.'
            ],
            [
                'id' => 5,
                'title' => 'SUPPLEMENTS',
                'description' => 'Expert guidance on supplement selection and timing to optimize your fitness results',
                'image' => '/Images/nutritionn/Supplements.jpg',
                'difficulty' => 'Intermediate',
                'type' => 'Enhancement',
                'duration' => 'Ongoing',
                'features' => ['Supplement Stack', 'Timing Guide', 'Quality Brands', 'Goal-Specific'],
                'detailedDescription' => 'Now there\'s a lot of different supplements out there, not all of them are needed, but I will give you an idea of which are the best ones for training and general health. If you do need more in-depth information, please feel free to contact Jade Kelsie Wolfenden (jadekelsie_ifbbpro – on Instagram).

**Supplements**

Dietary supplements are substances you might use to add nutrients to your diet or to lower your risk of health problems, such as osteoporosis or arthritis. They can also aid with muscle gain/loss or strength. Dietary supplements come in the form of pills, capsules, powders, gel capsules and tablets, extracts, or liquids.

**What are the best supplements for health?**

**Vitamin C – Best taken on a morning**
• This is great for cell growth and tissue development
• Benefits heart health including reducing blood pressure
• Lowers risk of heart disease
• Prevents iron deficiency
• Boosts immune system (can keep you from getting unwell)
• Helps with memory

**Magnesium – Best taken on an evening**
• Helps strengthen bones
• Helps the feeling of depression and anxiety
• Perfect for helping you drift off into a deep sleep
• Ladies – can help PMS symptoms

**Vitamin D – (we don\'t get enough sunlight in the U.K so I\'d say this is essential) Best taken on a morning**
• Helps regulate calcium in our bodies (we need this to have strong bones)
• Keeps up our immune system
• Boosts mood
• Helps in skin regrowth and metabolism, so could help with clearing skin and helping the metabolism work more efficiently

**Omega 3 fish oil – Best taken on a morning**
• Perfect for brain function, heart health and overall health
• Reduces the risks of blood clotting
• Anti-inflammatory so will help after training with DOMS (Delayed Onset Muscle Soreness)

**Iron – Best taken on a morning**
• Improves energy
• May improve muscle strength
• Helps with sleep
• Helps fight infection

**Vitamin B complex – Best taken on a morning**
• Cell health
• Growth of red blood cells
• Energy levels
• Good eyesight
• Healthy brain function
• Aids good digestion
• Healthy appetite
• Proper nerve function

**What supplements are best during training?**

There are a few supplements that would be good to use during training, as these will help recovery and can aid in avoiding muscle wastage. This can be more apparent whilst training for long periods of time or at a high intensity.

**EAAs – during training**
These help increase protein synthesis, which creates a positive protein balance and results in a muscle building (anabolic) state that allows you to recover and build muscle more easily. They also help in muscle recovery, so those DOMS don\'t kill you too much.

**Glutamine – during training**
Enhances muscle protein synthesis. Lots of micro-tears in the fibres of your muscle occur while working out. Taking glutamine can be beneficial by repairing the torn muscles and preventing further muscle damage. It also helps with water retention during training by aiding in hydration.

**Creatine – during training**
It is thought that creatine improves strength, increases lean muscle mass, helps the muscles recover quickly and helps with energy, especially in high intensity workouts.

**Is it good to take supplements for weight loss?**

Personally, NO! These supplements that are being sold on Amazon, eBay etc. are not healthy at all; they can ruin your metabolism for LIFE. Your metabolism helps your body burn calories by converting what you eat and drink into energy.

If you\'re sticking to a good healthy diet (in deficit) so, eating less than you\'re burning out, then you will lose weight regardless of what supplements you take.

**Benefits of intra workouts?**

Intra-workout supplements benefit the body and health during workouts in a variety of ways. They help increase energy, increase endurance, improve hydration and reduce muscle breakdown. This ensures that you are able to carry on training harder for longer without needing to rest.

**Why would you use a protein supplement? (use of protein shakes etc.)**

A protein supplement like protein powder will aid in making sure that you\'re able to get your average daily intake of protein. It is very hard to do without the use of a supplement because you would have to eat a high amount of meat to hit this target. Protein itself is one of 3 major nutrients that you need to survive. Proteins are made up of chemical \'building blocks\' called amino acids. Your body uses amino acids to build and repair muscles and bones and to make hormones and enzymes. They can also be used as an energy source.

Using protein powder will help build muscle, repair tissue and help make the hormones and enzymes that help carry oxygen around your body. So, it\'s essential! If you can\'t get your protein intake from just meat/fish based sources, the use of protein powder will help MASSIVELY. You can use as much as needed. For example you need 1g of protein per pound of bodyweight so that just shows how much you actually need.'
            ],
            [
                'id' => 6,
                'title' => 'IMMUNE BOOSTER',
                'description' => 'Nutrition plan focused on strengthening your immune system and overall health',
                'image' => '/Images/nutritionn/Boost-Your-Immune-System-768x432.jpg',
                'difficulty' => 'Beginner',
                'type' => 'Health',
                'duration' => '4-6 weeks',
                'features' => ['Antioxidant Rich', 'Vitamin Focus', 'Anti-Inflammatory', 'Recovery Support'],
                'detailedDescription' => '**8 Proven Ways to Quickly Boost Your Immune System**

How can you boost your immune system? On its own, the immune system does a fantastic job of protecting you from disease-causing microorganisms.

But it sometimes fails to protect you when you need it the most – a germ or virus invades and wreaks havoc on your body, causing you to fall sick.

Can you intervene in the process and give your immune system a quick boost?

Does improving your diet or taking certain vitamins help?

What are some lifestyle changes that can ensure your immune response is near-perfect?

Let\'s first explore the possibility of boosting your immune system.

**What can you do to boost your immunity?**

As enticing as the idea seems, boosting one\'s immunity is not an easy task. That\'s because the immune system is exactly what the name says – a system. It requires delicate balance and harmony within the system to function properly.

Many different cells make up the immune system and they respond to different microorganisms. This makes any attempt to boost immune cells complicated: which cells should you boost and by what number?

So far, scientists do not know the answers as there\'s still a lot to understand about the interconnectedness of the immune response.

However, certain lifestyle changes help the immune system function effectively and they come with other proven health benefits.

Here are 8 ways to boost your immune system naturally.

**8 Healthy Ways to Quickly Boost Your Immune System**

**1. Work out Religiously**

Maintaining a routine level of physical activity is one of the best ways to boost your immune system and immune response naturally.

One way it does this is by increasing blood circulation around the body. This helps pull out toxins from body cells and makes it easier for immune cells to travel swiftly through the body.

Here are some exercises you can include in your daily routine:

• **Strength training** - Weightlifting and strength training push your body past its physical limit. This leads to increased blood flow, boosts your mood, as well as your immunity.

• **High-Intensity Interval Training (HIIT)** - HIIT is one of the best exercise routines that get your heart pumping. However, HIIT should be done 3 or 4 times weekly, because straining your body too much and too often can backfire. Moderation is key.

• **Rebounding** - Rebounding involves jumping on a mini fitness trampoline. This low-impact exercise helps detox the body, drain your lymphatic system, and it\'s perfect for the cooler months when you\'d rather stay indoors.

• **Walking** - Taking a walk doesn\'t just clear the mind, it\'s often enough physical activity to keep your immune system functioning as it should. Schedule 10-25 minutes of brisk walking into your routine, at least 5 times a week.

**2. Detox Regularly**

Detoxing your body is like cleaning up the house after hosting a party. Sure, you can ignore the trash lying around or the food stains on the couch and go about your business like they don\'t exist.

Some of the consumables we stuff into our bodies end up floating around without being used. Our system does a great job of pushing these toxins out. However, the persistent, low-grade toxins from foods we consume regularly often stall this process.

If you want to boost your immune system faster, then you have to help your system clean up itself with a good detox diet that\'s easy to follow.

**3. Avoid added sugars where possible**

Consuming too much sugar inhibits the efficiency of immune system cells. What\'s worse, the effects of a sugary drink last a couple of hours after digestion.

According to research, added sugars and refined carbs play a huge role in obesity… and, obesity increases the likelihood of getting sick.

Controlling or cutting your sugar intake can give your immune system a quick boost, decrease inflammation, and aid weight loss. This reduces your risk of developing chronic health conditions like heart disease and type 2 diabetes.

**4. Diet and your immune system**

The immune system is your body\'s fighting force and how much fight it puts up depends on what\'s in your stomach.

To produce fit and healthy immune system fighters, you need to nourish your body at every opportunity – not just when you feel you\'re coming down with something.

There\'s limited scientific research on the effects of processed food and high sugar intake on human immune function. But, you can\'t go wrong opting for whole, unprocessed foods such as vegetables, fruits, legumes, whole grains, lean protein, and healthy fats.

If you suspect that your diet doesn\'t supply enough micronutrients – for example, zinc, iron, copper, selenium, vitamins A, B6, C and E – maybe because you\'ve been avoiding your veggies, then you should talk with your GP about taking some supplements.

**5. Supplement wisely**

It\'s easy to turn to supplements if you hear claims about their ability to quickly boost your immune system. However, most of the assertions are unproven.

When choosing a supplement, ensure they\'re tested by a third-party organisation. Take your time to properly investigate the ingredients, what they do, how they work, and possible side effects before putting them into your body.

Having said that, studies indicate that the following supplements may boost your immune system\'s response:

• **Vitamin C** - Taking 1,000–2,000 mg of vitamin C daily reduced the duration of colds in adults and children by 8% and 14% respectively.

• **Vitamin D** - Deficiency in this vitamin makes your body susceptible to all kinds of sickness, especially contagious ones.

• **Zinc** - Your body needs Zinc for DNA synthesis, to stimulate immune cells, and control the effects of oxidative stress. A study of 575 people with the common cold showed that Zinc supplement reduced the duration of the cold by 33%.

• **Raw garlic** - Great at helping the immune system fight off cough and cold infections. It also ensures there\'s a healthy balance between the good and bad bacteria in the gut.

• **Echinacea** - This supplement helps your immune system ward off infections and viruses. Several studies have shown that Echinacea supplements can speed up recovery from illness.

**6. Drink a lot of water**

Dehydration can hinder your performance, cause headaches, affect your focus and mood, disrupt digestion, as well as heart and kidney function. This can make you more susceptible to illness.

Drinking plenty of water doesn\'t boost the immune system directly. However, when there\'s enough water circulating in your system, your body can easily dislodge toxins from cells.

How much water should you drink daily? The consensus is 3.7 litres (for men) and 2.7 litres (for women).

**7. Get enough sleep**

Going to sleep doesn\'t feel like an active process. However, sleep and immunity are closely tied.

Lots of important things happen in your system when your body sleeps. For example, your body creates infection-fighting molecules at a faster rate when you\'re asleep.

Numerous studies show that inadequate or poor quality sleep is linked to a higher susceptibility to sickness.

As an adult, you should aim for 7 or more hours of sleep daily. Good quality sleep will give your immune system the best chance to fight off infection and illness.

**8. Make time to socialise**

Your mental health also plays a huge role in your body\'s immune function. People who feel connected to friends (offline or online) have stronger immunity than those who feel isolated from the world.

Health experts say loneliness and self-isolation in stressful and uncertain times can ultimately send your immune system into overdrive.

**The bottom line**

You can strengthen your immune system by making some lifestyle and dietary changes today.

These changes include working out regularly, controlling your sugar intake, keeping your body hydrated, getting adequate sleep, and staying in touch with friends.

Please note that none of these suggestions can prevent you from catching the COVID-19 virus. However, they will reinforce your body\'s defences and help you beat most disease-causing microorganisms.

**Disclaimer:** No content on this site, regardless of date, should ever be used as a substitute for direct medical advice from your doctor or other qualified clinicians.'
            ]
        ];

        // Find the nutrition plan by ID
        $nutritionPlan = collect($nutritionPlans)->firstWhere('id', (int)$id);

        if (!$nutritionPlan) {
            abort(404, 'Nutrition plan not found');
        }

        return Inertia::render('Members/Nutrition-Show', [
            'nutritionPlan' => $nutritionPlan,
        ]);
    }

    public function calculator()
    {
        return Inertia::render('Members/CalculatorHub');
    }

    public function dietCalculator()
    {
        return Inertia::render('Members/DietCalculator');
    }

    public function bodyFatCalculator()
    {
        return Inertia::render('Members/BodyFatCalculator');
    }
}