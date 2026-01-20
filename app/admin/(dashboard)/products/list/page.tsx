import Link from "next/link";
import { Plus } from "lucide-react";
import ProductTable from "../../../components/ProductTable";

export default function ListProductsPage() {
    return (
        <>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Products Inventory</h1>
                    <p className="text-slate-500 mt-1">Manage your product catalog and stocks.</p>
                </div>
                <Link
                    href="/admin/products/add"
                    className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30 active:scale-95 font-medium"
                >
                    <Plus size={20} />
                    Add Product
                </Link>
            </div>

            <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <p className="text-slate-500 text-sm font-medium uppercase">Total Products</p>
                    <p className="text-3xl font-bold text-slate-900 mt-2">1,234</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <p className="text-slate-500 text-sm font-medium uppercase">Active Products</p>
                    <p className="text-3xl font-bold text-green-600 mt-2">1,180</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <p className="text-slate-500 text-sm font-medium uppercase">Out of Stock</p>
                    <p className="text-3xl font-bold text-red-500 mt-2">54</p>
                </div>
            </div>

            <ProductTable />
        </>
    );
}
