
import types from '../model/category.js'


const createMealtype = async (req, res)=>{

    let {Mealtype} = req.body;

    const category = await types.create({
        Mealtype
    })

    res.json({category})
}

const fetchMealtype = async (req, res)=> {

    const categories = await types.find();

    res.json({categories})
}

const fetchMealtypeById = async (req, res)=> {

    const id = req.params.id;

    const category = await types.findById(id);

    res.json({category})
}

const updateMealtype = async (req, res) => {

    const id = req.params.id;

    const {Mealtype} = req.body;

    await types.findByIdAndUpdate(id, {
        Mealtype
    })

    const category = await types.findById(id);

    res.json({ category})
}

const deleteMealtype = async (req, res) => {
    
    const id = req.params.id

    await Category.findByIdAndDelete(id);

    res.json({messgae: "Record deleted succcessfully"})

}

export {
    createMealtype, fetchMealtype, fetchMealtypeById, updateMealtype, deleteMealtype
}