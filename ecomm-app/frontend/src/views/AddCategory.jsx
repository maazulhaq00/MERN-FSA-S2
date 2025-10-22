import { useState } from "react";
import axios from "axios"

function AddCategory() {

    const [category, setCategory] = useState({
        categoryName: "",
        categoryDescription: ""
    })

    const handleInputChange = (e) => {
        let { name, value } = e.target
        setCategory((pre) => {
            return {
                ...pre,
                [name]: value
            }
        })
    }

    const handleAddCategory = async () => {

        try {
            let res = await axios.post("http://localhost:3001/categories", category)
            console.log(res)

            if (res.data.success) {
                alert("Category Added Successfully")

                setCategory({
                    categoryName: "",
                    categoryDescription: ""
                })
            }
            else {
                alert(res.data.message)
            }
        }
        catch (error) {
            console.log(error)
            if (error.response) {
                alert(error.response.data.message)
            }
        }
    }
    return (
        <>
            <h3>Add Category</h3>
            <label>
                Category Name: <br />
                <input type="text" name="categoryName" value={category.categoryName} onChange={handleInputChange} />
            </label><br /><br />
            <label>
                Category Description: <br />
                <input type="text" name="categoryDescription" value={category.categoryDescription} onChange={handleInputChange} />
            </label><br /><br />

            <button onClick={handleAddCategory}>Add Category</button>
        </>
    );
}

export default AddCategory