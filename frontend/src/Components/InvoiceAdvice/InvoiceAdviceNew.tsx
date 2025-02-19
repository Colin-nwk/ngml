
// import { useState } from 'react'
// import { Pencil, Save } from 'lucide-react'

// export default function InvoiceAdviceNew() {
//     const [price, setPrice] = useState<number>(0)
//     const [editingPrice, setEditingPrice] = useState<boolean>(false)
//     const [includeVat, setIncludeVat] = useState<boolean>(false)
//     const [remark, setRemark] = useState<string>('')
//     const [remarks, setRemarks] = useState<string[]>([])
//     const [volume, setVolume] = useState<number>(0)

//     const VAT_RATE = 0.075
//     const CONVERSION_RATE = 1700

//     const addRemark = () => {
//         if (remark.trim()) {
//             setRemarks([...remarks, remark])
//             setRemark('')
//         }
//     }

//     const calculateVat = (amount: number): number => {
//         return includeVat ? amount * VAT_RATE : 0
//     }

//     const calculateTotal = (): number => {
//         const vat = calculateVat(price)
//         return price + vat
//     }

//     return (
//         <div className="w-full max-w-md mx-auto bg-white shadow-sm border border-[#004225]/20 rounded-lg overflow-hidden">
//             <div className="bg-[#006B3F] border-b border-[#]/20 p-4">
//                 <h2 className="text-lg font-medium text-white">Create Invoice Advice</h2>
//             </div>
//             <div className="p-6 space-y-6">
//                 <div className="flex items-center justify-between">
//                     <div className="flex items-center space-x-2">
//                         <label htmlFor="vat-toggle" className="text-sm text-gray-600">With VAT</label>
//                         <div className="relative inline-block w-10 mr-2 align-middle select-none">
//                             <input
//                                 type="checkbox"
//                                 id="vat-toggle"
//                                 checked={includeVat}
//                                 onChange={() => setIncludeVat(prev => !prev)}
//                                 className="sr-only"
//                             />
//                             <div
//                                 className={`block w-10 h-6 rounded-full transition-colors cursor-pointer ${includeVat ? 'bg-[#004225]' : 'bg-gray-300'}`}
//                                 onClick={() => setIncludeVat(prev => !prev)}
//                             ></div>
//                             <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform transform ${includeVat ? 'translate-x-4' : 'translate-x-0'}`}></div>
//                         </div>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                         <label htmlFor="price" className="text-sm text-gray-600">Price:</label>
//                         {editingPrice ? (
//                             <div className="flex items-center">
//                                 <span className="mr-1">$</span>
//                                 <input
//                                     id="price"
//                                     type="number"
//                                     value={price}
//                                     onChange={(e) => setPrice(Number(e.target.value))}
//                                     className="w-24 text-right border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#004225]"
//                                 />
//                                 <button
//                                     onClick={() => setEditingPrice(false)}
//                                     className="ml-2 text-[#006B3F] hover:text-[#004225]"
//                                 >
//                                     <Save size={18} />
//                                 </button>
//                             </div>
//                         ) : (
//                             <div className="flex items-center">
//                                 <span className="mr-1">$</span>
//                                 <span className="text-gray-900">{price.toFixed(2)}</span>
//                                 <button
//                                     onClick={() => setEditingPrice(true)}
//                                     className="ml-2 text-[#006B3F] hover:text-[#004225]"
//                                 >
//                                     <Pencil size={18} />
//                                 </button>
//                             </div>
//                         )}
//                     </div>
//                 </div>

//                 <div className="flex items-center justify-between">
//                     <div className="text-sm text-gray-600">
//                         Conversion Rate: 1 USD = {CONVERSION_RATE} NGN
//                     </div>
//                     <div className="flex items-center space-x-2">
//                         <label htmlFor="volume" className="text-sm text-gray-600">Volume:</label>
//                         <input
//                             id="volume"
//                             type="number"
//                             value={volume}
//                             onChange={(e) => setVolume(Number(e.target.value))}
//                             className="w-24 text-right border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#004225]"
//                         />
//                     </div>
//                 </div>

//                 <div className="space-y-2">
//                     <div className="flex space-x-2">
//                         <input
//                             type="text"
//                             placeholder="Add Remark"
//                             value={remark}
//                             onChange={(e) => setRemark(e.target.value)}
//                             className="flex-grow border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#004225]"
//                         />
//                         <button
//                             onClick={addRemark}
//                             className="bg-[#006B3F] text-white px-4 py-1 rounded hover:bg-[#004225]/90 transition-colors"
//                         >
//                             Add
//                         </button>
//                     </div>

//                     {remarks.length > 0 && (
//                         <div className="mt-2 space-y-2">
//                             <label className="text-sm text-gray-600">Remarks:</label>
//                             <div className="space-y-2">
//                                 {remarks.map((r, index) => (
//                                     <div key={index} className="bg-[#004225]/5 p-3 rounded-md text-sm text-gray-600 border border-red-500">
//                                         {r}
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     )}
//                 </div>

//                 <div className="space-y-2 pt-4 border-t border-[#004225]/20">
//                     <div className="flex justify-between text-sm">
//                         <span className="text-gray-600">Subtotal:</span>
//                         <span className="text-gray-900">${price.toFixed(2)} (₦{(price * CONVERSION_RATE).toFixed(2)})</span>
//                     </div>
//                     {includeVat && (
//                         <div className="flex justify-between text-sm">
//                             <span className="text-gray-600">VAT (7.5%):</span>
//                             <span className="text-gray-900">${calculateVat(price).toFixed(2)} (₦{(calculateVat(price) * CONVERSION_RATE).toFixed(2)})</span>
//                         </div>
//                     )}
//                     <div className="flex justify-between font-medium">
//                         <span className="text-[#004225]">Total:</span>
//                         <span className="text-[#004225]">${calculateTotal().toFixed(2)} (₦{(calculateTotal() * CONVERSION_RATE).toFixed(2)})</span>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

















'use client'

import { useState } from 'react'
import { Pencil, Save } from 'lucide-react'

const backendData = {
    volume: 520000,
    conversionRate: 1700
}

export default function InvoiceAdviceNew() {
    const [price, setPrice] = useState<number>(0)
    const [editingPrice, setEditingPrice] = useState<boolean>(false)
    const [includeVat, setIncludeVat] = useState<boolean>(false)
    const [remark, setRemark] = useState<string>('')
    const [remarks, setRemarks] = useState<string[]>([])

    const VAT_RATE = 0.075
    const { volume, conversionRate } = backendData

    const addRemark = () => {
        if (remark.trim()) {
            setRemarks([...remarks, remark])
            setRemark('')
        }
    }

    const calculateVat = (amount: number): number => {
        return includeVat ? amount * VAT_RATE : 0
    }

    const calculateTotal = (): number => {
        const vat = calculateVat(price)
        return price + vat
    }

    return (
        <div className="w-full max-w-md mx-auto bg-white shadow-lg border border-[#004225]/20 rounded-lg overflow-hidden">
            <div className="bg-[#53B052] border-b border-[#]/20 p-4">
                <h2 className="text-xl font-semibold text-white">Create Invoice Advice</h2>
            </div>
            <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="price" className="text-sm font-medium text-gray-700">Price</label>
                        {editingPrice ? (
                            <div className="flex items-center">
                                <span className="mr-1 text-gray-600">$</span>
                                <input
                                    id="price"
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(Number(e.target.value))}
                                    className="w-full text-right border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#004225]"
                                />
                                <button
                                    onClick={() => setEditingPrice(false)}
                                    className="ml-2 text-[#53B052] hover:text-[#004225]"
                                >
                                    <Save size={18} />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center justify-between">
                                <span className="text-lg font-semibold text-gray-900">${price.toFixed(2)}</span>
                                <button
                                    onClick={() => setEditingPrice(true)}
                                    className="text-[#006B3F] hover:text-[#004225]"
                                >
                                    <Pencil size={18} />
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label className="text-sm font-medium text-gray-700">Volume</label>
                        <div className="text-lg font-semibold text-gray-900">{volume.toLocaleString()}</div>
                    </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-600">Conversion Rate: 1 USD = {conversionRate} NGN</span>
                    <div className="flex items-center space-x-2">
                        <label htmlFor="vat-toggle" className="text-sm font-medium text-gray-700">Include VAT</label>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                            <input
                                type="checkbox"
                                id="vat-toggle"
                                checked={includeVat}
                                onChange={() => setIncludeVat(prev => !prev)}
                                className="sr-only"
                            />
                            <div
                                className={`block w-10 h-6 rounded-full transition-colors cursor-pointer ${includeVat ? 'bg-[#004225]' : 'bg-gray-300'}`}
                                onClick={() => setIncludeVat(prev => !prev)}
                            ></div>
                            <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform transform ${includeVat ? 'translate-x-4' : 'translate-x-0'}`}></div>
                        </div>
                    </div>
                </div>
                <div className="space-y-4 mb-6">
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            placeholder="Add Remark"
                            value={remark}
                            onChange={(e) => setRemark(e.target.value)}
                            className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#004225]"
                        />
                        <button
                            onClick={addRemark}
                            className="bg-[#53B052] text-white px-4 py-2 rounded hover:bg-[#004225]/90 transition-colors"
                        >
                            Add
                        </button>
                    </div>

                    {remarks.length > 0 && (
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Remarks:</label>
                            <div className="space-y-2">
                                {remarks.map((r, index) => (
                                    <div key={index} className="bg-[#004225]/5 p-3 rounded-md text-sm text-gray-600 border ">
                                        {r}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <div className="space-y-2 pt-4 border-t border-[#004225]/20">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Subtotal:</span>
                        <span className="text-gray-900 font-medium">${price.toFixed(2)} (₦{(price * conversionRate).toFixed(2)})</span>
                    </div>
                    {includeVat && (
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">VAT (7.5%):</span>
                            <span className="text-gray-900 font-medium">${calculateVat(price).toFixed(2)} (₦{(calculateVat(price) * conversionRate).toFixed(2)})</span>
                        </div>
                    )}
                    <div className="flex justify-between font-semibold text-lg mt-2">
                        <span className="text-[#004225] font-[700]">Total:</span>
                        <span className="text-[#004225] font-[700]">${calculateTotal().toFixed(2)} (₦{(calculateTotal() * conversionRate).toFixed(2)})</span>
                    </div>
                </div>
            </div>
        </div>
    )
}





