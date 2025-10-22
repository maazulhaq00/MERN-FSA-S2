
import Category from "../models/categoryModel.js"

const createCategory = async (req, res) => {
    try {
        if (!('categoryName' in req.body) || !('categoryDescription' in req.body)) {
            return res.status(400).json({ success: false, message: "categoryName or categoryDescription missing" })
        }
        // Get the data sent from req
        const { categoryName, categoryDescription } = req.body

        const categoryExist = await Category.findOne({ categoryName })

        if (categoryExist) {
            return res.status(409).json({ success: false, message: `${categoryName} already exist` })
        }

        // Create a category
        const category = await Category.create({ categoryName, categoryDescription })

        // Send response with a new category data
        res.status(201).json({ success: true, category })
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

const fetchCategories = async (req, res) => {
    try {

        // mongodb sa data lao
        const categories = await Category.find()

        // response mai data bhejo
        res.status(200).json({ success: true, categories })
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }

}

const fetchCategory = async (req, res) => {
    try {

        const categoryId = req.params.id

        // mongodb sa data lao
        const category = await Category.findById(categoryId)

        // response mai data bhejo
        res.status(200).json({ success: true, category })
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }

}

const updateCategory = async (req, res) => {

    try {
        const categoryId = req.params.id

        if (!('categoryName' in req.body) || !('categoryDescription' in req.body)) {
            return res.status(400).json({ success: false, message: "categoryName or categoryDescription missing" })
        }
        // Get the data sent from req
        const { categoryName, categoryDescription } = req.body

        await Category.findByIdAndUpdate(categoryId, {categoryName, categoryDescription})

        const updatedCategory = await Category.findById(categoryId)

        res.status(200).json({success: true, category: updatedCategory})

    }
    catch (err) {
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

const deleteCategory = async (req, res) => {

    try {
        const categoryId = req.params.id

        const existCategory = await Category.exists({_id: categoryId})

        if(existCategory == null){
            return res.status(404).json({success: false, message: "Category doesnot exist"})
        }

        await Category.findByIdAndDelete(categoryId)

        res.status(200).json({success: true, message: "Category deleted successfully"})

    }
    catch (err) {
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

export {
    createCategory, fetchCategories, fetchCategory, updateCategory, deleteCategory
}