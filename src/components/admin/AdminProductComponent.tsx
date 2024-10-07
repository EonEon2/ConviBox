import { useNavigate } from "react-router-dom";
import { startTransition, useState } from "react";
import {useSelector} from "react-redux";

function AdminProductComponent() {

    const navigate = useNavigate();
    const productDesc = useSelector((state) => state.product.productDesc);


    const handleClickMoveAdd = () => {
        startTransition(() => {
            navigate("/admin/add");
        });
    };

    const [recipeName, setRecipeName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [keywords, setKeywords] = useState("");
    const [image, setImage] = useState<File | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0]);
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
    };

    return (

        <div className="w-2/3 p-4 h-full">
            {/* 상단 버튼 */}
            <div className="flex justify-between items-center mb-4">
                <h2 className='font-bold text-xl'>Product Manager</h2>
                <button
                    className="bg-green-600 text-white hover:bg-blue-600 transition duration-300 py-2 px-4 rounded-md"
                    onClick={handleClickMoveAdd}>
                    ADD
                </button>
            </div>

            {/* 제품 정보 입력 */}
            <aside className="h-full p-6 bg-[#f8c300] rounded-lg shadow-lg flex flex-col items-center justify-center">
                <p className='font-bold text-lg mb-4 text-gray-800'>Recipe Details</p>

                <ul className="flex flex-col space-y-4 w-full">
                    {/* 레시피 이름 */}
                    <li className="w-full">
                        <label className="font-semibold text-gray-800">Recipe Name:</label>
                        <input
                            type="text"
                            value={recipeName}
                            onChange={(e) => setRecipeName(e.target.value)}
                            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-4 focus:ring-yellow-400 transition-all"
                            placeholder="Enter recipe name"
                        />
                    </li>

                    {/* 설명 */}
                    <li className="w-full">
                        <label className="font-semibold text-gray-800">Description:</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-4 focus:ring-yellow-400 transition-all"
                            placeholder="Enter recipe description"
                            rows={4}
                        />
                    </li>

                    {/* 가격 */}
                    <li className="w-full">
                        <label className="font-semibold text-gray-800">Price:</label>
                        <input
                            type="text" // type을 text로 변경
                            value={price}
                            onChange={(e) => {
                                // 입력값이 숫자일 경우만 상태를 업데이트
                                const value = e.target.value;
                                if (/^\d*$/.test(value)) {
                                    setPrice(value);
                                }
                            }}
                            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-4 focus:ring-yellow-400 transition-all"
                            placeholder="Enter price"
                        />
                    </li>

                    {/* 키워드 */}
                    <li className="w-full">
                        <label className="font-semibold text-gray-800">Keywords:</label>
                        <input
                            type="text"
                            value={keywords}
                            onChange={(e) => setKeywords(e.target.value)}
                            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-4 focus:ring-yellow-400 transition-all"
                            placeholder="Enter keywords (comma separated)"
                        />
                    </li>

                    {/* 이미지 업로드 */}
                    <li className="w-full">
                        <label className="font-semibold text-gray-800">Upload Image:</label>
                        <input
                            type="file"
                            onChange={handleImageChange}
                            className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-yellow-400 transition-all"
                            accept="image/*"
                        />
                        {image && (
                            <div className="mt-2">
                                <p className="text-sm text-gray-600">Selected file: {image.name}</p>
                                <button
                                    onClick={handleRemoveImage}
                                    className="mt-2 bg-red-600 text-white px-3 py-2 rounded-md transition duration-300 hover:bg-red-700"
                                >
                                    Clear Image
                                </button>
                            </div>
                        )}
                    </li>
                </ul>
            </aside>

            {/* 하단 버튼 */}
            <div className="flex justify-end mt-4">
                <button
                    className="bg-blue-600 text-white hover:bg-blue-700 transition duration-300 py-2 px-4 rounded-md mr-2">
                    Modify
                </button>
                <button className="bg-red-600 text-white hover:bg-red-700 transition duration-300 py-2 px-4 rounded-md">
                    Delete
                </button>
            </div>
        </div>
    );
}

export default AdminProductComponent;