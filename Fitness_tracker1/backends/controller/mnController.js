import meals from "../model/product.js";


const createMeal = async (req, res)=>{



    let {mealname,mealtypeid,mealcalories,mealprotein,mealfats,mealcarbs,userId} = req.body;



    const Meal = await meals.create({
        mealname,mealtypeid,mealcalories,mealprotein,mealfats,mealcarbs,userId
    })

    res.json({Meal})
}

const fetchMeal = async (req, res)=> {

    const Meal = await meals.find().populate("mealtypeid");

    res.json({Meal})
}

const fetchMealById = async (req, res)=> {

    const mid = req.params.mid;

    const Meal = await meals.findById(mid).populate("mealtypeid");

    res.json({Meal})
}
const fetchMealuserById = async (req, res) => {
    try {
        const uid = req.params.uid;
        const Meal = await meals.find({ userId: uid }).populate("mealtypeid");
        res.json({ Meal });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
const updateMeal = async (req, res) => {

    const mid = req.params.mid;

    const {mealname,mealtypeid,mealcalories,mealprotein,mealfats,mealcarbs,userId} = req.body;



    await meals.findByIdAndUpdate(mid, {
        mealname,mealtypeid,mealcalories,mealprotein,mealfats,mealcarbs,userId
    })

    const Meal = await meals.findById(mid);

    res.json({ Meal})
}

const deleteMeal = async (req, res) => {
    
    const mid = req.params.mid

    await meals.findByIdAndDelete(mid);

    res.json({messgae: "Record deleted succcessfully"})

}

export {
    createMeal, fetchMeal, fetchMealById, updateMeal, deleteMeal,fetchMealuserById
}