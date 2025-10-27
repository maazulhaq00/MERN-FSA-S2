
import workcategorys from "../model/workoutcatergory.js";


const createcategory = async (req, res)=>{

    let {workout_name} = req.body;

    const tracking = await workcategorys.create({
        workout_name
    })

    res.json({tracking})
}

const fetchcategory = async (req, res)=> {

    const tracking = await workcategorys.find();

    res.json({tracking})
}

const fetchcategoryById = async (req, res)=> {

    const wcid = req.params.wcid;

    const tracking = await workcategorys.findById(wcid);

    res.json({tracking})
}

const updatecategory = async (req, res) => {

    const wcid = req.params.wcid;

    const {workout_name} = req.body;

    await workcategorys.findByIdAndUpdate(wcid, {
        workout_name
    })

    const tracking = await workcategorys.findById(wcid);

    res.json({ tracking})
}

const deletecategory = async (req, res) => {
    
    const wcid = req.params.wcid

    await workcategorys.findByIdAndDelete(wcid);

    res.json({messgae: "Record deleted succcessfully"})

}

export {
    createcategory, fetchcategory, fetchcategoryById, updatecategory, deletecategory
}