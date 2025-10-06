import axios from "axios";
import { useEffect, useState } from "react";

function DisplayCategory() {

    const [categories, setCategories] = useState([])

    useEffect(() => {
        fetchCategory()
    }, [])

    const fetchCategory = async () => {

        let res = await axios.get("http://localhost:3001/categories")

        console.log(res);

        if (res.data.success) {
            setCategories(res.data.categories)
        }
        else {
            alert("error")
        }

    }

    const d


    return (
        <>
            <h3>Categories</h3>

            <table border={1}>
                <tr>
                    <th>Category Name</th>
                    <th>Category Description</th>
                    <th>Action</th>
                </tr>

                {
                    categories.map((cat) => {
                        return (
                            <>
                                <tr>
                                    <td>{cat.categoryName}</td>
                                    <td>{cat.categoryDescription}</td>
                                    <td>
                                        <button>Edit</button>
                                        <button>Delete</button>
                                    </td>
                                </tr>
                            </>
                        )
                    })
                }
            </table>

        </>
    );
}

export default DisplayCategory;