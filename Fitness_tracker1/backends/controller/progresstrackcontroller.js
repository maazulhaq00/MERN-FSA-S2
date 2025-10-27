
import Progress from "../model/progresstracking.js";


const createprogresstracker = async (req, res)=>{

    let {BodyWeight,Runtime,Chest,Waist,Hip,Liftingweights,Shoulderwidth,Sleevelength,Neck,bodyfat,Date,userId} = req.body;

    const tracking = await Progress.create({
      BodyWeight,Runtime,Chest,Waist,Hip,Liftingweights,Shoulderwidth,Sleevelength,Neck,bodyfat,Date,userId
    })

    res.json({tracking})
}

const fetchprogresstracker = async (req, res)=> {

    const tracking = await Progress.find();

    res.json({tracking})
}

const fetchprogresstrackerById = async (req, res)=> {

    const ptid = req.params.ptid;

    const tracking = await Progress.findById(ptid)

    res.json({tracking})
}


const fetchprogresstrackerByUserId = async (req, res)=> {

    const uid = req.params.uid;

    const tracking = await Progress.find({userId: uid})

    res.json({tracking})
}


 const updateprogresstracker = async (req, res) => {
  try {
    const updated = await Progress.findByIdAndUpdate(req.params.ptid, req.body, {
      new: true,
      runValidators: true
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteprogresstracker = async (req, res) => {
    
    const ptid = req.params.ptid

    await Progress.findByIdAndDelete(ptid);

    res.json({messgae: "Record deleted succcessfully"})

}

export {
    createprogresstracker, fetchprogresstracker, fetchprogresstrackerById, updateprogresstracker, deleteprogresstracker, fetchprogresstrackerByUserId
}