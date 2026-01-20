import ProductForm from "../../../components/ProductForm";

export default function AddProductPage() {
    return (
        <>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Add New Product</h1>
                    <p className="text-slate-500 mt-1">Create a new product for your store.</p>
                </div>
            </div>

            <ProductForm />
        </>
    );
}
