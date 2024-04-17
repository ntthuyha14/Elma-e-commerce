import React from 'react'
import CustomInput from '../components/CustomInput'

const AddBlogCategory = () => {
    return (
        <div>
            <h3 className="mb-4 title">Add blog category</h3>
            <form action="" method="post">
                <CustomInput type="text" label="Enter Blog Title" />
                <button
                    type="submit"
                    className="border-0 rounded-3 btn btn-success mt-3"
                >
                    Add blog category
                </button>
            </form>
        </div>
    )
}

export default AddBlogCategory
