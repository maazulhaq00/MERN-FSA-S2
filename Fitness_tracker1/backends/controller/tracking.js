
import WorkTracker from "../model/modeltracker.js";


const createtracker = async (req, res)=>{

    let {exercisename,sets,reps,weights,notes,workcategoryID, userId} = req.body;

    const tracking = await WorkTracker.create({
        exercisename,sets,reps,weights,notes,workcategoryID, userId
    })

    res.json({tracking})
}

const fetchtracker = async (req, res)=> {

    const tracking = await WorkTracker.find().populate("workcategoryID");

    res.json({tracking})
}

const fetchtrackerById = async (req, res)=> {

    const tid = req.params.tid;

    const tracking = await WorkTracker.findById(tid).populate("workcategoryID")

    res.json({tracking})
}


const fetchtrackerByUserId = async (req, res)=> {

    const uid = req.params.uid;

    const tracking = await WorkTracker.find({userId: uid}).populate("workcategoryID")

    res.json({tracking})
}


const updatetracker = async (req, res) => {

    const tid = req.params.tid;

    const {exercisename,sets,reps,weights,notes, workcategoryID, userId} = req.body;

    await WorkTracker.findByIdAndUpdate(tid, {
        exercisename,sets,reps,weights,notes, workcategoryID, userId
    })

    const tracking = await WorkTracker.findById(tid);

    res.json({ tracking})
}

const deletetracker = async (req, res) => {
    
    const tid = req.params.tid

    await WorkTracker.findByIdAndDelete(tid);

    res.json({messgae: "Record deleted succcessfully"})

}

export {
    createtracker, fetchtracker, fetchtrackerById, updatetracker, deletetracker, fetchtrackerByUserId
}