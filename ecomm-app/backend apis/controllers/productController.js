
import Product from "../models/productModel.js"

const createProduct = async (req, res) => {
    try {
        if (!('name' in req.body) || !('description' in req.body) || !('price' in req.body) || !('categoryId' in req.body)) {
            return res.status(400).json({ success: false, message: "Required field missing" })
        }
        // Get the data sent from req
        const { name, description, price, categoryId } = req.body

        let image = req.file.filename


        // Create a category
        const product = await Product.create({ name, description, price, image, categoryId })

        // Send response with a new category data
        res.status(201).json({ success: true, product })
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

const fetchProducts = async (req, res) => {
    try {

        // mongodb sa data lao
        const products = await Product.find().populate("categoryId")

        // response mai data bhejo
        res.status(200).json({ success: true, products })
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }

}

const fetchProductById = async (req, res) => {
    try {

        const productId = req.params.id

        // mongodb sa data lao
        const product = await Product.findById(productId).populate("categoryId")

        // response mai data bhejo
        res.status(200).json({ success: true, product })
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }

}

const updateProduct = async (req, res) => {

    try {
        const productId = req.params.id

        if (!('name' in req.body) || !('description' in req.body) || !('price' in req.body) || !('categoryId' in req.body)) {
            return res.status(400).json({ success: false, message: "Required field missing" })
        }
        // Get the data sent from req
        const { name, description, price, categoryId } = req.body
        
        let image = req.file.filename

        await Product.findByIdAndUpdate(productId, {name, description, price, image, categoryId})

        const updatedProduct = await Product.findById(productId)

        res.status(200).json({success: true, product: updateProduct})

    }
    catch (err) {
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

const deleteProduct = async (req, res) => {

    try {
        const productId = req.params.id

        const existProduct = await Product.exists({_id: productId})

        if(existProduct == null){
            return res.status(404).json({success: false, message: "Product doesnot exist"})
        }

        await Product.findByIdAndDelete(productId)

        res.status(200).json({success: true, message: "Product deleted successfully"})

    }
    catch (err) {
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

export {
    createProduct, fetchProducts, fetchProductById, deleteProduct, updateProduct
}